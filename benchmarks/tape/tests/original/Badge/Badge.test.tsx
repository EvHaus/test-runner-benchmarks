import describe from 'tape-describe';
import Badge from '.';
import React from 'react';
import {render} from '@testing-library/react';
import withAsyncAndTeardown from '../../../helpers/wrapper';

describe('<Badge />', (test) => {
	test('should render the given badge', withAsyncAndTeardown((t) => {
		const {getByText} = render(<Badge>Hello World</Badge>);
		t.ok(getByText('Hello World'));
	}));
});
