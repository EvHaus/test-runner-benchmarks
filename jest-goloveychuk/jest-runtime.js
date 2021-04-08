const JestRuntime = require('jest-runtime');
const vm = require('vm');
const {handlePotentialSyntaxError} = require('@jest/transform');
const v8 = require('v8')
//TODO SAFER BUFFER! request/request inherits stream
const PROXY_WHITE_LIST = new Set(['process', 'module',
// 'buffer', 'stream',
// 'constants',
'fs'
]);
v8.setFlagsFromString('--expose-gc');
//TODO freeze console????????????
const gcClean = vm.runInNewContext('gc')
let RUN_COUNT_FOR_GC = 1
const CLEAN_EVERY_TIME = 1;
const detectLeaks = (() => {
  const weak = require('weak-napi');
  let references = 0;
  return (obj) => {
    references += 1;
    // console.log('references count ++', references)
    weak(obj, () => {
      references -= 1;
      // console.log('references count --', references)
    })
  }
})()
function makeReadonlyProxy(obj) {
    if (
      !((typeof obj === 'object' && obj !== null) || typeof obj === 'function')
    ) {
      return obj;
    }
    return new Proxy(obj, {
      get: (target, prop, receiver) => {
        return makeReadonlyProxy(Reflect.get(target, prop, receiver), );
      },
      set: (target, property, value, receiver) => {
        if (typeof value !== 'function') {
          return Reflect.set(target, property, value, receiver);
        }
        // console.log(`trying to set! ${path.join(', ')} ${property}, ${typeof value}`);
        // throw new Error(`trying to set! ${filename}, ${property as any}, ${typeof value}`);
        return true;
      },
    });
  }
const __scriptCache = new Map();
const __transformCache = new Map();
module.exports = class MyJestRuntime extends JestRuntime {
    constructor(...args) {
        super(...args);
        this.__coreModulesCache = new Map();
        // Object.freeze(this._environment.global.console);
        if (++RUN_COUNT_FOR_GC % CLEAN_EVERY_TIME === 0) {
            // console.log('running gc')
          gcClean();
        }
        detectLeaks(this)
        // console.log('memory: ', Math.floor(process.memoryUsage().heapUsed/1000/1000));
    }
    transformFile(filename, options) {
      //TODO IS WATCH
        let result = __transformCache.get(filename);
        if (!result) {
            result = super.transformFile(filename, options);
            __transformCache.set(filename, result); //DO NOT COMMIT IT
        }
        return result
    }
    _requireCoreModule(moduleName) {
        let mod = this.__coreModulesCache.get(moduleName);
        if (!mod) {
            mod = super._requireCoreModule(moduleName);
            if (!PROXY_WHITE_LIST.has(moduleName)) { //TODO!!!!!
                mod = makeReadonlyProxy(mod)
            }
            this.__coreModulesCache.set(moduleName, mod)
        }
        return mod
    }
    createScriptFromCode(scriptSource, filename) {
        const scriptFromCache = __scriptCache.get(filename);
        if (scriptFromCache) {
            return scriptFromCache
        }
        try {
          const scriptFilename = this._resolver.isCoreModule(filename)
            ? `jest-nodejs-core-${filename}`
            : filename;
          const script =  new vm.Script(this.wrapCodeInModuleWrapper(scriptSource), {
            displayErrors: true,
            filename: scriptFilename,
            //is leaking
            // @ts-expect-error: Experimental ESM API
            // importModuleDynamically: async (specifier) => {
            //   invariant(
            //     runtimeSupportsVmModules,
            //     'You need to run with a version of node that supports ES Modules in the VM API. See https://jestjs.io/docs/en/ecmascript-modules',
            //   );
            //   const context = this._environment.getVmContext?.();
            //   invariant(context, 'Test environment has been torn down');
            //   const module = await this.resolveModule(
            //     specifier,
            //     scriptFilename,
            //     context,
            //   );
            //   return this.linkAndEvaluateModule(module);
            // },
          });
          __scriptCache.set(filename, script); //TODO is cache
          return script
        } catch (e) {
          throw handlePotentialSyntaxError(e);
        }
      }
}
