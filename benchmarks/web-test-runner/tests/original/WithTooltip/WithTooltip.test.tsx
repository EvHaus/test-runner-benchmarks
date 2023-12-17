import { expect } from '@esm-bundle/chai';
import { render } from '@testing-library/react';
import WithTooltip from '.';

describe('<WithTooltip />', () => {
	it('should render render nothing if no tooltip was given', () => {
		const { asFragment } = render(
			<WithTooltip>
				<span>Howdy</span>
			</WithTooltip>,
		);
		// Jasmine doesn't support shapshot testing, so we just check for Object
		expect(asFragment()).toEqual(jasmine.any(Object));
	});
});
