import {describe, expect, it} from '@jest/globals';
import Badge from '.';
import React from 'react';
import {render} from '@testing-library/react';

describe('<Badge />', () => {
	it('should render the given badge', () => {
		const {getByText} = render(<Badge>Hello World</Badge>);
		expect(getByText('Hello World')).toBeDefined();
	});
});
