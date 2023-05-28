import describe from 'tape-describe';
import Spinner from '.';
import React from 'react';
import {render} from '@testing-library/react';
import withAsyncAndTeardown from '../../../helpers/wrapper';

describe('<Spinner />', (test) => {
	test('should render a spinner image', withAsyncAndTeardown((t) => {
		const {getByRole} = render(<Spinner />);
		t.ok(getByRole('img'));
	}));
});
