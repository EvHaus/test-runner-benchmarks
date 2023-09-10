import Collapsible from '.';
import {render, waitForElementToBeRemoved} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {describe, expect, it} from "bun:test";
import React from 'react';

describe('<Collapsible />', () => {
	it('should render the children for the element', () => {
		const {getByText} = render(
			<Collapsible title='My Title'>
				Hello World
			</Collapsible>
		);
		expect(getByText('Hello World')).toBeDefined();
	});

	it('should be able to toggle the collapsible content', async () => {
		const user = userEvent.setup();
		const {getByText, queryByText} = render(
			<Collapsible title='My Title'>
				Hello World
			</Collapsible>
		);
		expect(getByText('Hello World')).toBeDefined();

		await user.click(getByText('My Title'))

		await waitForElementToBeRemoved(queryByText('Hello World'));
	});
});
