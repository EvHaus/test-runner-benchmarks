// @vitest-environment happy-dom

import {describe, expect, it} from 'vitest';
import React from 'react';
import {render} from '@testing-library/react';
import StatusBadge from '.';

describe('<StatusBadge />', () => {
	it('should render without failure', () => {
		const {asFragment} = render(<StatusBadge status='DRAFTED' />);
		expect(asFragment()).toMatchInlineSnapshot(`
			<DocumentFragment>
			  <strong
			    class="main green"
			    title="DRAFTED"
			  >
			    DRAFTED
			  </strong>
			</DocumentFragment>
		`);
	});
});
