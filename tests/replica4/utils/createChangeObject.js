// @flow

/*
 * Creates a nested object with the keys, and an exising object passed in. Optional value can be passed as well.
 */
const createNestedObject = (
	// An initial object to build the nesting upon
	baseObj: {},
	// An array of keys in which to nest
	keys: Array<string>,
	// The final value at the deepest end of the nested object
	value: any
) => {
	// If a value is given, remove the last name and keep it for later to
	// assign the value to.
	const lastKeyInList = value != null ? keys.pop() : undefined;

	// Walk the hierarchy, creating new objects where needed.
	// If the lastKeyInList was removed, then the last object is not set yet:
	for (let i = 0, l = keys.length; i < l; i++) {
		const currentKey = keys[i];
		// eslint-disable-next-line no-multi-assign
		baseObj = baseObj[currentKey] = baseObj[currentKey] || {};
	}

	// If a value was given, set it to the last name:
	// eslint-disable-next-line no-multi-assign
	if (lastKeyInList) baseObj = baseObj[lastKeyInList] = value;
};

/*
 * Creates an object containing the new field value that will be passed up to the
 * parent component. This object will mirror the structure of the corresponding object
 * on the parent component by parsing the name provided to the input component and creating
 * either a flat or nested object.
 *
 * Returns the newly nested object from the input field names and value
 */
export default function (
	// A string of the input field name, names can be seperated in-string by `:`
	fieldName: string,
	// The final value at the deepest end of the nested object
	value: any
): {[key: string]: any} {
	const names = fieldName.split(':');

	// If the name is not a nested representation, we only need to make a single
	// flat object because the data will not be nested in the parent component either.
	if (names.length === 1) return {[names[0]]: value};

	// If the name is a nested representation, we'll nest the change object in the order
	// the name is organized in, so that we can successfully merge the nested change object
	// into the corresponding nested data state in the parent component.
	const changeObj = {};

	// Nesting the change obj with every item in the `names` array
	createNestedObject(changeObj, names, value);

	return changeObj;
}
