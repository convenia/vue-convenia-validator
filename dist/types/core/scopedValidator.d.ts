import { Vue as VueComponent } from 'vue-property-decorator';
import FieldBag from './fieldBag';
import Field from './field';
import '../rules';
import { FormValidation, FieldValidation, FieldFlags } from '../types';
export interface VM extends VueComponent {
    [dataName: string]: any;
}
export declare type ScopedFormValidation = {
    [scope: string]: FormValidation;
};
export declare type FormTemplate = ScopedFormValidation | FormValidation;
export declare type FormValidationFlags = {
    [scope: string]: {
        [fieldName: string]: FieldFlags;
    };
} | {
    [fieldName: string]: FieldFlags;
};
export default class ScopedValidator {
    private _vm;
    fields: FieldBag;
    scopes: string[];
    private _options;
    validations: FormValidationFlags;
    constructor(vm: VueComponent);
    options: any;
    /**
     * This two following functions are responsible for bootstraping
     * the ScopedValidation class with the given validation options.
     * The public init function exists to ensure that whenever we're
     * bootstraping the ScopedValidator class, the DOM will be accessible
     * through the _vm.
     *
     * @param template - The form validations template object.
     * @returns {void}
     *
     * @author Erik Isidore
     */
    init(template: FormTemplate): void;
    private __init;
    /**
     * Receives a FormTemplate object and maps the fields validation rules
     * in it to populate the `fields` instance property with Field instances.
     *
     * @param {FormTemplate} template - The form or forms validation object.
     * @returns {void}
     *
     * @author Erik Isidore
     */
    initFields(template: FormTemplate): Field[];
    /**
     * Generetes the validation flags object based on the form scopes.
     *
     * @returns {FormValidationFlags}
     *
     * @author Erik Isidore
     */
    mapValidations(): FormValidationFlags;
    /**
     * Receives a fieldName and optionally it's scope and returns the HTML
     * Element corresponding to that field in the DOM.
     *
     * @param {String} fieldName - The name of the field
     * @param {String} scope? - Optional form scope.
     * @returns {Element} - The first matching element found in the component DOM.
     *
     * @author Erik Isidore
     */
    getFieldEl(fieldName: string, scope?: string): Element;
    /**
     * @param {String} fieldName -
     * @param {String} scope? -
     * @returns {void}
     *
     * @author Erik Isidore
     */
    validate(fieldName: string, scope?: string): boolean;
    /**
     * Executes the validate() method on all Field instances.
     *
     * @param {String} scope? -
     * @returns {void}
     *
     * @author Erik Isidore
     */
    validateAll(scope?: string): boolean;
    /**
     * Resets all of the fields validation flags.
     *
     * @param {String} scope? -
     * @returns {void}
     *
     * @author Erik Isidore
     */
    reset(scope?: string): void;
    /**
     * Attaches a new field to the validator.
     *
     * @param {}
     * @returns {void}
     *
     * @author Erik Isidore
     */
    attach(field: {
        name: string;
        rules: string;
        scope: string;
    }): void;
    /**
     * Detaches an existing field from the validator.
     *
     * @param {String} field - The name of the field
     * @param {String} scope? - Optional scope of the field
     * @returns {void}
     *
     * @author Erik Isidore
     */
    detach(field: string, scope?: string): void;
    /**
     * Sets the rule of a field and validate it if it has changed.
     *
     * @param {Object<name: string, scope: string>} field - Object with name
     * and scope of the field.
     * @param {FieldValidation} rules - The rules to be set in the field
     * @returns {void}
     */
    setFieldRule(field: {
        name: string;
        scope: string;
    }, rules: FieldValidation): void;
}
