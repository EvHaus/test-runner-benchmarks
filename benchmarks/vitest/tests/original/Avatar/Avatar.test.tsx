import {describe, expect, it} from 'vitest';
import Avatar from '.';
import React from 'react';
import {render} from '@testing-library/react';

describe('<Avatar />', () => {
	it('should render the avatar with the initials of the title', () => {
		const {getByText} = render(<Avatar title='Hello World' />);
		expect(getByText('HW')).toBeDefined();
	});
});
