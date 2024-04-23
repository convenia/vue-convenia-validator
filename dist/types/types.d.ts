export declare type FieldValidation = string | Array<string> | {
    [rule: string]: any;
};
export declare type FormValidation = {
    [fieldName: string]: FieldValidation;
};
export declare type NormalizedRule = {
    ruleName: string;
    args?: any;
};
export declare type ValidationRule = {
    validate: (value: any, ...args: any) => boolean;
    message: string;
};
export interface FieldItem {
    vm: any;
    value: any;
    name: string;
    scope?: string;
    el: Element;
    rules: FieldValidation;
}
export declare type FieldFlags = {
    pristine: boolean;
    dirty: boolean;
    touched: boolean;
    changed: boolean;
    valid: boolean;
    errors: string[];
};
export declare type ValidatorOptions = ValidatorOptionsObject | ValidatorOptionsFn;
export declare type ValidatorOptionsFn = (vm: any) => ValidatorOptionsObject;
export declare type ValidatorOptionsObject = {
    noListeners?: boolean;
};
