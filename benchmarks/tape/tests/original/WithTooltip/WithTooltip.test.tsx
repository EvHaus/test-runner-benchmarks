import describe from 'tape-describe';
import React from 'react';
import {render} from '@testing-library/react';
import WithTooltip from '.';
import withAsyncAndTeardown from '../../../helpers/wrapper';

describe('<WithTooltip />', (test) => {
	test('should render render nothing if no tooltip was given', withAsyncAndTeardown((t) => {
		const {asFragment} = render(
			<WithTooltip><span>Howdy</span></WithTooltip>
		);
		// Tape doesn't support shapshot testing, so we just check for Object
		t.equal(typeof asFragment(), 'object');
	}));
});
