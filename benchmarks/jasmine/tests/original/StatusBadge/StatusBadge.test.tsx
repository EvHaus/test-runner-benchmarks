import React from 'react';
import {render} from '@testing-library/react';
import StatusBadge from '.';

describe('<StatusBadge />', () => {
  it('should render without failure', () => {
		const {asFragment} = render(<StatusBadge status='DRAFTED' />);
    // Jasmine doesn't support shapshot testing, so we just check for Object
		expect(asFragment()).toEqual(jasmine.any(Object));
	});
});
