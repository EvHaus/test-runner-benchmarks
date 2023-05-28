import describe from 'tape-describe';
import {render, waitForElementToBeRemoved} from '@testing-library/react';
import Collapsible from '.';
import React from 'react';
import userEvent from '@testing-library/user-event';
import withAsyncAndTeardown from '../../../helpers/wrapper';

describe('<Collapsible />', (test) => {
	test('should render the children for the element', withAsyncAndTeardown((t) => {
		const {getByText} = render(
			<Collapsible title='My Title'>
				Hello World
			</Collapsible>
		);
		t.ok(getByText('Hello World'));
	}));

	test('should be able to toggle the collapsible content', withAsyncAndTeardown(async (t) => {
		const user = userEvent.setup();
		const {getByText, queryByText} = render(
			<Collapsible title='My Title'>
				Hello World
			</Collapsible>
		);
		t.ok(getByText('Hello World'));

		await user.click(getByText('My Title'))

		await waitForElementToBeRemoved(queryByText('Hello World'));
	}));
});
