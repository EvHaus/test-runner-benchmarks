import Card from '.';
import React from 'react';
import {render} from '@testing-library/react';

describe('<Card />', () => {
	it('should render the given children', () => {
		const {getByText} = render(<Card>Hello World</Card>);
		expect(getByText('Hello World')).toBeDefined();
	});
});
