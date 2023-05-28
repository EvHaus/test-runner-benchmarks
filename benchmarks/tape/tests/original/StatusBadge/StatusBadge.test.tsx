import describe from 'tape-describe';
import React from 'react';
import {render} from '@testing-library/react';
import StatusBadge from '.';
import withAsyncAndTeardown from '../../../helpers/wrapper';

describe('<StatusBadge />', (test) => {
	test('should render without failure', withAsyncAndTeardown((t) => {
		const {asFragment} = render(<StatusBadge status='DRAFTED' />);
    // Tape doesn't support shapshot testing, so we just check for Object
		t.equal(typeof asFragment(), 'object');
	}));
});
