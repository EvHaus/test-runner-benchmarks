import { expect } from '@esm-bundle/chai';
import Card from '.';
import { render } from '@testing-library/react';

describe('<Card />', () => {
	it('should render the given children', () => {
		const { getByText } = render(<Card>Hello World</Card>);
		expect(getByText('Hello World')).toBeDefined();
	});
});
