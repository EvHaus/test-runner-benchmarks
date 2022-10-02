import {describe, expect, it} from 'vitest';
import Spinner from '.';
import React from 'react';
import {render} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('<Spinner />', () => {
	it('should render a spinner image', () => {
		const {getByRole} = render(<Spinner />);
		expect(getByRole('img')).toBeDefined();
	});
});
