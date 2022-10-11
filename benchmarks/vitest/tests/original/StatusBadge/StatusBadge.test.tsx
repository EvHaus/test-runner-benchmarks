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
			    class="_main_499a96 _green_499a96"
			    title="DRAFTED"
			  >
			    DRAFTED
			  </strong>
			</DocumentFragment>
		`);
	});
});
