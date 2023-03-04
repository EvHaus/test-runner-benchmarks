import Card from '.';
import {render} from '@testing-library/react';
import {describe, expect, it} from "bun:test";
import React from 'react';

describe('<Card />', () => {
	it('should render the given children', () => {
		const {getByText} = render(<Card>Hello World</Card>);
		expect(getByText('Hello World')).toBeDefined();
	});
});
