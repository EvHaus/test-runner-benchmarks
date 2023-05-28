import describe from 'tape-describe';
import Checkbox from '.';
import React from 'react';
import {render} from '@testing-library/react';
import withAsyncAndTeardown from '../../../helpers/wrapper';

describe('<Checkbox />', (test) => {
	test('should render the checkbox', withAsyncAndTeardown((t) => {
		const {getByRole} = render(<Checkbox onChange={() => {}} />);
		t.ok(getByRole('checkbox'));
	}));

	test('should support the indeterminate state', withAsyncAndTeardown((t) => {
		const {getByLabelText} = render(
			<Checkbox indeterminate={true} onChange={() => {}} />
		);
		t.ok(getByLabelText('indeterminate'));
	}));
});
