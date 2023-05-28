import describe from 'tape-describe';
import Alert from '.';
import React from 'react';
import {render} from '@testing-library/react';
import withAsyncAndTeardown from '../../../helpers/wrapper';

describe('<Alert />', (test) => {
	test('should render the given message', withAsyncAndTeardown((t) => {
		const {getByText} = render(<Alert>Hello World</Alert>);
		t.ok(getByText('Hello World'));
	}));

	test('should render with only a title', withAsyncAndTeardown((t) => {
		const {getByText} = render(<Alert title='Hello World' />);
		t.ok(getByText('Hello World'));
	}));

	test('should support all the different icons', withAsyncAndTeardown((t) => {
		const {getByLabelText, rerender} = render(<Alert intent='warning' />);
		t.ok(getByLabelText('warning-sign'));

		rerender(<Alert intent='info' />)
		t.ok(getByLabelText('info-sign'));

		rerender(<Alert intent='success' />)
		t.ok(getByLabelText('tick-circle'));
	}));
});