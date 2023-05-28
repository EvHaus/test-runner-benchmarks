import {cleanup} from '@testing-library/react';

const withAsyncAndTeardown = (test) => {
    return async (t) => {
        t.teardown(cleanup);
        await test(t);
        t.end();
    };
}

export default withAsyncAndTeardown;