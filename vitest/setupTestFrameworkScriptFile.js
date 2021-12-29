import Adapter from 'enzyme-adapter-react-16';
import Enzyme from 'enzyme';

Enzyme.configure({adapter: new Adapter()});

// Polyfill unsupport jasmine utilities

global.jasmine = {
    any: expect.any,
    createSpy: vi.fn
};

global.spyOn = vi.spyOn