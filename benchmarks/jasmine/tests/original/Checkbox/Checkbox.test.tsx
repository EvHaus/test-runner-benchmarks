import Checkbox from '.';
import React from 'react';
import {render} from '@testing-library/react';

describe('<Checkbox />', () => {
	it('should render the checkbox', () => {
		const {getByRole} = render(<Checkbox onChange={() => {}} />);
		expect(getByRole('checkbox')).toBeDefined();
	});

	it('should support the indeterminate state', () => {
		const {getByLabelText} = render(
			<Checkbox indeterminate={true} onChange={() => {}} />
		);
		expect(getByLabelText('indeterminate')).toBeDefined();
	});
});
