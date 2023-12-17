import { expect } from '@esm-bundle/chai';
import Avatar from '.';
import { render } from '@testing-library/react';

describe('<Avatar />', () => {
	it('should render the avatar with the initials of the title', () => {
		const { getByText } = render(<Avatar title='Hello World' />);
		expect(getByText('HW')).toBeDefined();
	});
});
