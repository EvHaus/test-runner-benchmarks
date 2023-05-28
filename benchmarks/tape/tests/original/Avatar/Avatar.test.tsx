import describe from 'tape-describe';
import Avatar from '.';
import React from 'react';
import {render} from '@testing-library/react';
import withAsyncAndTeardown from '../../../helpers/wrapper';

describe('<Avatar />', (test) => {
	test('should render the avatar with the initials of the title', withAsyncAndTeardown((t) => {
		const {getByText} = render(<Avatar title='Hello World' />);
		t.ok(getByText('HW'));
	}));
});
