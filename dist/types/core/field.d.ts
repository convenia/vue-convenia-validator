import { FieldItem, FieldFlags, NormalizedRule, FieldValidation } from '../types';
export default class Field {
    private _vm;
    private initialValue;
    private _flags;
    value: any;
    name: string;
    scope?: string;
    el: Element;
    rules: NormalizedRule[];
    constructor(options: FieldItem);
    readonly validate: any;
    readonly watch: any;
    readonly options: any;
    readonly flags: FieldFlags;
    readonly errors: string[];
    readonly error: string;
    /**
     * Sets a new value to one of the instance's FieldFlags.
     *
     * @param {Keyof FieldFlags} flag - The flag name
     * @param {Boolean | Array<String>} value - the new value to assigned to the flag
     * @returns {void}
     * @author Erik Isidore
     */
    setFlag(flag: keyof FieldFlags, value: boolean | string[]): void;
    /**
     * Initializes the Field instance.
     *
     * @param {FieldItem} options
     * @returns {void}
     * @author Erik Isidore
     */
    init(options: FieldItem): void;
    /**
     * Initializes or resets the Field flags to their default values.
     *
     * @returns {void}
     * @author Erik Isidore
     */
    initFlags(): void;
    /**
     * Adds event listener for the blur event on the input, so that we can
     * tell when the input has been `touched` by the user, and attaches a
     * watcher to the input value, validating it's value whenever it changes.
     *
     * @returns {void}
     * @author Erik Isidore
     */
    addValueListeners(): void;
    /**
     * Receives a FieldValidation entity, which can be
     *  A string: 'required|dateFormat:DD/MM/YYYY'
     *  An array of strings: ['required', 'dateFormat:DD/MM/YYYY']
     *  Or an object: { required: true, dateFormat: 'DD/MM/YYYY' }
     *
     * And turns this entity into a array of NormalizedRules, this
     * array will contain an NormalizedRule object for every rule
     * found in FieldValidation. A NormalizedRule is simply an
     * object with the format: { ruleName: <name>, args: [<...>] }
     *
     * @param {FieldValidation} rules - The validation rules defined for the field.
     * @returns {Array<NormalizedRule>} - A array containing a NormalizedRule for
     * every validation rule defined for the field.
     *
     * @author Erik Isidore
     */
    mapRules(rules: FieldValidation): Array<NormalizedRule>;
    /**
     * Resets the field flags and it's value.
     *
     * @returns {void}
     * @author Erik Isidore
     */
    reset(): void;
    /**
     * Dynamically updates the field's rules and remaps them.
     *
     * @param {FieldValidation} rule - The new rules to be applied
     * @returns {void}
     *
     * @author Erik Isidore
     */
    setRule(rule: FieldValidation): void;
}
