import Spinner from '.';
import {render} from '@testing-library/react';
import {describe, expect, it} from "bun:test";
import React from 'react';

describe('<Spinner />', () => {
	it('should render a spinner image', () => {
		const {getByRole} = render(<Spinner />);
		expect(getByRole('img')).toBeDefined();
	});
});
