// @vitest-environment happy-dom

import {describe, expect, it} from 'vitest';
import React from 'react';
import {render} from '@testing-library/react';
import WithTooltip from '.';

describe('<WithTooltip />', () => {
	it('should render render nothing if no tooltip was given', () => {
		const {asFragment} = render(
			<WithTooltip><span>Howdy</span></WithTooltip>
		);
		expect(asFragment()).toMatchInlineSnapshot(`
			<DocumentFragment>
			  <span>
			    Howdy
			  </span>
			</DocumentFragment>
		`);
	});
});
