import { ValidationRule } from '../types';
export default class RuleContainer {
    static readonly rules: {
        [ruleName: string]: ValidationRule;
    };
    /**
     * Get a specific rule from the container.
     *
     * @param  {String} ruleName - The name of the rule.
     * @returns {ValidationRule} - the respective ValidationRule object.
     */
    static getRule(ruleName: string): ValidationRule;
    /**
     * Adds a new rule to the container.
     *
     * @param ruleName - The name of the rule to be added.
     * @param rule - The ValidationRule object.
     * @returns {Void}
     */
    static add(ruleName: string, rule: ValidationRule): void;
    /**
     * Removes a rule from the container.
     *
     * @param ruleName - The name of the rule to be removed.
     * @returns {Void}
     */
    static remove(ruleName: string): void;
    /**
     * Checks if a rule exists in the container
     *
     * @param ruleName - The name of the rule.
     * @returns {Boolean}
     */
    static has(ruleName: string): boolean;
}
