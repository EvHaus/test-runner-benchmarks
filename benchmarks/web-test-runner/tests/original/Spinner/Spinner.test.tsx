import { expect } from '@esm-bundle/chai';
import Spinner from '.';
import { render } from '@testing-library/react';

describe('<Spinner />', () => {
	it('should render a spinner image', () => {
		const { getByRole } = render(<Spinner />);
		expect(getByRole('img')).toBeDefined();
	});
});
