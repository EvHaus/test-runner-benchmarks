import Badge from '.';
import {render} from '@testing-library/react';
import {describe, expect, it} from "bun:test";
import React from 'react';

describe('<Badge />', () => {
	it('should render the given badge', () => {
		const {getByText} = render(<Badge>Hello World</Badge>);
		expect(getByText('Hello World')).toBeDefined();
	});
});
