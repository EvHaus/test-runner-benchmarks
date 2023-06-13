import StatusBadge from '.';
import {cleanup, render} from '@testing-library/react';
import {afterEach, describe, expect, it} from "bun:test";
import React from 'react';

describe('<StatusBadge />', () => {
	// Ideally Bun can give us a way to set this globally
	afterEach(cleanup);

  it('should render without failure', () => {
		const {asFragment} = render(<StatusBadge status='DRAFTED' />);
    	// Jasmine doesn't support shapshot testing, so we just check for Object
		expect(asFragment()).toBeInstanceOf(Object);
	});
});
