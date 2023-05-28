import describe from 'tape-describe';
import Card from '.';
import React from 'react';
import {render} from '@testing-library/react';
import withAsyncAndTeardown from '../../../helpers/wrapper';

describe('<Card />', (test) => {
	test('should render the given children', withAsyncAndTeardown((t) => {
		const {getByText} = render(<Card>Hello World</Card>);
		t.ok(getByText('Hello World'));
	}));
});
