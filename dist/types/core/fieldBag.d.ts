import Field from './field';
export default class FieldBag {
    private _items;
    constructor(items?: Field[]);
    items: Field | Field[];
    /**
     * Returns the corresping Field instance, or undefined if not found.
     *
     * @param {String} field - The name of the field.
     * @param {String} scope? - Optional scope of the field.
     * @returns {Field | undefined} - The Field instance, or undefined if not found.
     */
    get(field: string, scope?: string): Field | undefined;
    /**
     * Returns all fields registered in the FieldBag
     *
     * @param {String} scope? - If present, returns all the fields from that scope
     * @returns {Array<Field>} - Array of field items
     */
    all(scope?: string): Array<Field>;
    /**
     * Check to see if a Field is preseint in the FieldBag, or if a Field
     * exists in a given scope.
     *
     * @param {String} field - The name of the field
     * @param {String} scope? - Optional scope of the field
     * @returns {Boolean}
     */
    has(field: string, scope?: string): boolean;
    /**
     * Add a new Field or an array of Field instances to the existing _items
     * arrays.
     *
     * @param {Field | Array<Field>} scope? - If present, returns all the fields
     * from that scope.
     * @returns {void}
     */
    push(item: Field | Field[]): void;
    /**
     * Removes an existing field from the FieldBag instance.
     *
     * @param {String} field - The name of the field
     * @param {String} scope? - Optional scope of the field
     * @returns {void}
     */
    remove(field: string, scope?: string): void;
}
