import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import Enzyme from 'enzyme';

Enzyme.configure({adapter: new Adapter()});

// Polyfill unsupport jasmine utilities

global.jasmine = {
    any: expect.any,
    createSpy: () => vi.fn(),
    objectContaining: expect.objectContaining
};

global.spyOn = vi.spyOn