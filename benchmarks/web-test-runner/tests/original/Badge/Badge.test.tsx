import { expect } from '@esm-bundle/chai';
import Badge from '.';
import { render } from '@testing-library/react';

describe('<Badge />', () => {
	it('should render the given badge', () => {
		const { getByText } = render(<Badge>Hello World</Badge>);
		expect(getByText('Hello World')).toBeDefined();
	});
});
