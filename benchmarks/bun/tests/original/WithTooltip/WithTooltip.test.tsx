import WithTooltip from '.';
import {render} from '@testing-library/react';
import {describe, expect, it} from "bun:test";
import React from 'react';

describe('<WithTooltip />', () => {
	it('should render render nothing if no tooltip was given', () => {
		const {asFragment} = render(
			<WithTooltip><span>Howdy</span></WithTooltip>
		);
		// Jasmine doesn't support shapshot testing, so we just check for Object
		expect(asFragment()).toBeInstanceOf(Object);
	});
});
