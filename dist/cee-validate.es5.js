import { Component, Vue } from 'vue-property-decorator';
import dayjs from 'dayjs-ext';

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

var FieldBag = /** @class */ (function () {
    function FieldBag(items) {
        this._items = items || [];
    }
    Object.defineProperty(FieldBag.prototype, "items", {
        set: function (items) {
            this.push(items);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Returns the corresping Field instance, or undefined if not found.
     *
     * @param {String} field - The name of the field.
     * @param {String} scope? - Optional scope of the field.
     * @returns {Field | undefined} - The Field instance, or undefined if not found.
     */
    FieldBag.prototype.get = function (field, scope) {
        return this._items.find(function (item) { return scope
            ? item.name === field && item.scope === scope
            : item.name === field; });
    };
    /**
     * Returns all fields registered in the FieldBag
     *
     * @param {String} scope? - If present, returns all the fields from that scope
     * @returns {Array<Field>} - Array of field items
     */
    FieldBag.prototype.all = function (scope) {
        return scope
            ? this._items.filter(function (f) { return f.scope === scope; })
            : this._items;
    };
    /**
     * Check to see if a Field is preseint in the FieldBag, or if a Field
     * exists in a given scope.
     *
     * @param {String} field - The name of the field
     * @param {String} scope? - Optional scope of the field
     * @returns {Boolean}
     */
    FieldBag.prototype.has = function (field, scope) {
        return !!this._items.find(function (item) { return scope
            ? item.name === field && item.scope === scope
            : item.name === field; });
    };
    /**
     * Add a new Field or an array of Field instances to the existing _items
     * arrays.
     *
     * @param {Field | Array<Field>} scope? - If present, returns all the fields
     * from that scope.
     * @returns {void}
     */
    FieldBag.prototype.push = function (item) {
        // Check if item is already present in the FieldBag instance
        this._items.push.apply(this._items, Array.isArray(item) ? item : [item]);
    };
    /**
     * Removes an existing field from the FieldBag instance.
     *
     * @param {String} field - The name of the field
     * @param {String} scope? - Optional scope of the field
     * @returns {void}
     */
    FieldBag.prototype.remove = function (field, scope) {
        this._items = this._items.filter(function (item) { return scope && item.scope === scope
            ? item.name !== field
            : item.name !== field; });
    };
    return FieldBag;
}());

var RULES = {};
var RuleContainer = /** @class */ (function () {
    function RuleContainer() {
    }
    Object.defineProperty(RuleContainer, "rules", {
        get: function () {
            return RULES;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Get a specific rule from the container.
     *
     * @param  {String} ruleName - The name of the rule.
     * @returns {ValidationRule} - the respective ValidationRule object.
     */
    RuleContainer.getRule = function (ruleName) {
        return RULES[ruleName];
    };
    /**
     * Adds a new rule to the container.
     *
     * @param ruleName - The name of the rule to be added.
     * @param rule - The ValidationRule object.
     * @returns {Void}
     */
    RuleContainer.add = function (ruleName, rule) {
        RULES[ruleName] = rule;
    };
    /**
     * Removes a rule from the container.
     *
     * @param ruleName - The name of the rule to be removed.
     * @returns {Void}
     */
    RuleContainer.remove = function (ruleName) {
        delete RULES[ruleName];
    };
    /**
     * Checks if a rule exists in the container
     *
     * @param ruleName - The name of the rule.
     * @returns {Boolean}
     */
    RuleContainer.has = function (ruleName) {
        return !!RULES[ruleName];
    };
    return RuleContainer;
}());

/**
 * Check value's constructor name.
 * @param {*} value
 * @param {String} constructor
 * @returns {Boolean}
 *
 * @author Vitor Luiz Cavalcanti (https://github.com/VitorLuizC)
 */
var is = function (value, constructor) {
    return Object.prototype.toString.call(value) === "[object " + constructor + "]";
};

var Field = /** @class */ (function () {
    function Field(options) {
        this._flags = {
            pristine: false,
            dirty: false,
            changed: false,
            touched: false,
            valid: false,
            errors: []
        };
        this.el = options.el;
        this._vm = options.vm;
        this.name = options.name;
        this.value = options.value;
        this.scope = options.scope;
        this.rules = this.mapRules(options.rules);
        this.initialValue = options.value;
        this.init(options);
    }
    Object.defineProperty(Field.prototype, "validate", {
        get: function () {
            if (!this._vm || !this._vm.$validator)
                return function () { return []; };
            var validate = this._vm.$validator.validate;
            return validate.bind(this._vm.$validator, this.name, this.scope);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Field.prototype, "watch", {
        get: function () {
            if (!this._vm || !this._vm.$validator)
                return;
            return this._vm.$watch.bind(this._vm);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Field.prototype, "options", {
        get: function () {
            if (!this._vm || !this._vm.$validator)
                return;
            return this._vm.$validator.options;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Field.prototype, "flags", {
        get: function () { return this._flags; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Field.prototype, "errors", {
        get: function () { return this._flags.errors; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Field.prototype, "error", {
        get: function () { return this._flags.errors[0] || ''; },
        enumerable: true,
        configurable: true
    });
    /**
     * Sets a new value to one of the instance's FieldFlags.
     *
     * @param {Keyof FieldFlags} flag - The flag name
     * @param {Boolean | Array<String>} value - the new value to assigned to the flag
     * @returns {void}
     * @author Erik Isidore
     */
    Field.prototype.setFlag = function (flag, value) {
        if (!Object.keys(this._flags).includes(flag))
            return;
        this._flags[flag] = value;
    };
    /**
     * Initializes the Field instance.
     *
     * @param {FieldItem} options
     * @returns {void}
     * @author Erik Isidore
     */
    Field.prototype.init = function (options) {
        if (process.env.NODE_ENV !== 'production' && !this.name)
            console.warn('CeeValidate: A field declaration is missing a "name" attribute');
        this.initFlags();
        this.addValueListeners();
    };
    /**
     * Initializes or resets the Field flags to their default values.
     *
     * @returns {void}
     * @author Erik Isidore
     */
    Field.prototype.initFlags = function () {
        var _this = this;
        var flagNames = Object.keys(this._flags);
        var defaultFlags = {
            pristine: !this.value,
            dirty: !!this.value,
            touched: false,
            changed: false,
            valid: false,
            errors: []
        };
        flagNames.forEach(function (flag) {
            _this._flags[flag] = defaultFlags[flag];
        });
    };
    /**
     * Adds event listener for the blur event on the input, so that we can
     * tell when the input has been `touched` by the user, and attaches a
     * watcher to the input value, validating it's value whenever it changes.
     *
     * @returns {void}
     * @author Erik Isidore
     */
    Field.prototype.addValueListeners = function () {
        var _this = this;
        if (!this.watch || !this.el)
            return;
        var onBlur = function () {
            if (!_this._flags.touched)
                _this._flags.touched = true;
            if (!_this.options.noListeners)
                _this.validate();
        };
        var onInput = function (value) {
            _this.value = value;
            _this._flags.changed = _this.value !== _this.initialValue;
            if (!_this.options.noListeners)
                _this.validate();
            if (!_this._flags.dirty) {
                _this._flags.dirty = true;
                _this._flags.pristine = false;
            }
        };
        this.el.addEventListener('focusout', onBlur.bind(this));
        this.watch(this.scope ? this.scope + "." + this.name : this.name, onInput.bind(this));
    };
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
    Field.prototype.mapRules = function (rules) {
        var stringToRules = function (ruleDef) { return ({
            ruleName: ruleDef.split(':')[0],
            args: ruleDef.split(':')[1] && ruleDef.split(':')[1].split(',')
        }); };
        var objToRules = function (rulesObj) {
            return Object.keys(rulesObj).map(function (ruleName) { return ({
                ruleName: ruleName,
                args: !Array.isArray(rulesObj[ruleName])
                    ? [rulesObj[ruleName]]
                    : rulesObj[ruleName]
            }); });
        };
        return typeof rules === 'string' && rules.length
            ? rules.split('|').map(stringToRules)
            : Array.isArray(rules) ? rules.map(stringToRules)
                : rules && is(rules, 'Object') ? objToRules(rules)
                    : [];
    };
    /**
     * Resets the field flags and it's value.
     *
     * @returns {void}
     * @author Erik Isidore
     */
    Field.prototype.reset = function () {
        this.value = this.initialValue;
        this.initFlags();
    };
    /**
     * Dynamically updates the field's rules and remaps them.
     *
     * @param {FieldValidation} rule - The new rules to be applied
     * @returns {void}
     *
     * @author Erik Isidore
     */
    Field.prototype.setRule = function (rule) {
        this.rules = this.mapRules(rule);
    };
    return Field;
}());

/**
 * Checks if all characters in a given value are alphanumeric (letters
 * and numbers), ignores whitespace.
 *
 * @param {String} value - the input value to be tested.
 * @returns {boolean}
 *
 * @author Viniazvd, Erik Isidore
 * @version 0.1
 */
var rule = {
    validate: function (value) {
        if (!value)
            return true;
        return !!value.trim() && /^([0-9a-zA-Z\s]*)?$/.test(value.trim());
    },
    message: 'Deve conter apenas letras e números'
};
RuleContainer.add('alphanumeric', rule);

/**
 * Executes a callback or an array of callbacks with `value` as an argument
 * and returns true if every callback passes
 *
 * @param {Any} value - the input value to be validated.
 * @param {Function | Array<Function>} - The callback or array of callbacks
 * to be called on the value.
 * @returns {boolean} - Returns true if every callback passes, false otherwise.
 *
 * @author Viniazvd, Erik Isidore
 * @version 0.1
 */
var rule$1 = {
    validate: function (value) {
        var callbacks = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            callbacks[_i - 1] = arguments[_i];
        }
        return callbacks.every(function (f) { return f(value); });
    },
    message: 'Campo inválido'
};
RuleContainer.add('custom', rule$1);

var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var customParseFormat = createCommonjsModule(function (module, exports) {
!function(n,t){module.exports=t();}(commonjsGlobal,function(){var i=/(\[[^[]*\])|([-:/.()\s]+)|(A|a|YYYY|YY?|MM?|DD?|hh?|HH?|mm?|ss?|S{1,3}|z|ZZ?)/g,n=/\d\d/,t=/\d\d?/,r=/[+-]\d\d:?\d\d/,a={},f={},y={},m=[31,0,31,30,31,30,31,31,30,31,30,31];function w(n){var c=n.match(i);if(!c)throw new Error('Invalid format: "'+n+'".');for(var d=c.length,t=0;t<d;t+=1){var r=c[t],e=a[r],o=f[r];c[t]=o?{regex:e,parser:o}:r.replace(/^\[|\]$/g,"");}return function(n){for(var t={},r=0,e=0;r<d;r+=1){var o=c[r];if("string"==typeof o){if(n.indexOf(o,e)!==e){var i=n.substr(e,o.length);throw new Error('Expected "'+o+'" at character '+e+', found "'+i+'".')}e+=o.length;}else{var a=o.regex,f=o.parser,s=n.substr(e),u=a.exec(s);if(!u||0!==u.index)throw new Error('Matching "'+a+'" at character '+e+' failed with "'+s+'".');var h=u[0];f.call(t,h),e+=h.length;}}return function(n){var t,r,e=n.day,o=n.month;if(t=2===o?(r=n.year)%4==0&&r%100!=0||r%400==0?29:28:m[o-1],!(1<=e&&e<=t))throw new Error('Invalid day: "'+e+'".')}(t),function(n){var t=n.afternoon;if(void 0!==t){var r=n.hours;t?r<12&&(n.hours+=12):12===r&&(n.hours=0),delete n.afternoon;}}(t),t}}function e(n,t){a[n]=t;}function o(n,r,e){var t;"string"==typeof n&&(n=[n]),t="string"==typeof r?e?function(n){var t=+n;if(!e(t))throw new Error("Invalid "+r+': "'+n+'".');this[r]=t;}:function(n){this[r]=+n;}:r;for(var o=0,i=n.length;o<i;o+=1)f[n[o]]=t;}e("A",/[AP]M/),o(["A"],function(n){this.afternoon="PM"===n;}),e("a",/[ap]m/),o(["a"],function(n){this.afternoon="pm"===n;}),e("S",/\d/),e("SS",n),e("SSS",/\d{3}/);for(var s=function(n,t){o(n,function(n){this.milliseconds=+n*t;});},u="S",h=100;1<=h;u+="S",h/=10)s(u,h);e("s",t),e("ss",n),o(["s","ss"],"seconds",function(n){return n<=59}),e("m",t),e("mm",n),o(["m","mm"],"minutes",function(n){return n<=59}),e("H",t),e("h",t),e("HH",n),e("hh",n),o(["H","HH"],"hours",function(n){return n<=23}),o(["h","hh"],"hours",function(n){return 1<=n&&n<=12}),e("D",t),e("DD",n),o(["D","DD"],"day"),e("M",t),e("MM",n),o(["M","MM"],"month",function(n){return 1<=n&&n<=12}),e("Y",/[+-]?\d+/),e("YY",n),e("YYYY",/\d{4}/),o(["Y","YYYY"],"year"),o("YY",function(n){n=+n,this.year=n+(68<n?1900:2e3);}),e("z",/[A-Z]{3,4}/),o("z",function(n){(this.zone||(this.zone={})).abbreviation=n;}),e("Z",r),e("ZZ",r),o(["Z","ZZ"],function(n){(this.zone||(this.zone={})).offset=function(n){var t=n.match(/([+-]|\d\d)/g),r=60*t[1]+ +t[2],e=0===r?0:"+"===t[0]?-r:r;if(!(e%15==0&&Math.abs(e)<=765))throw new Error('Invalid time zone offset: "'+n+'".');return e}(n);});return function(n,t){var r=t.prototype,p=r.parse;r.parse=function(n){var t,r,e,o=n.date,i=n.format;if(i){try{var a,f=(t=o,(e=y[r=i])||(e=w(r),y[r]=e),e(t)),s=f.year,u=f.month,h=f.day,c=f.hours,d=f.minutes,m=f.seconds,v=f.milliseconds,l=f.zone;if(l){var Y=Date.UTC(s,u-1,h,c||0,d||0,m||0,v||0)+60*l.offset*1e3;a=new Date(Y);}else a=new Date(s,u-1,h,c||0,d||0,m||0,v||0);this.$d=a;}catch(n){this.$d=new Date(Number.NaN);}this.init(n);}else p.call(this,n);};}});

});

dayjs.extend(customParseFormat);
/**
 * Validate if the input value produces a valid date and optionally if
 * it follows a given date format.
 *
 * @param {String | Number} value - The value of the input to be validated,
 * if `value` is a String, the validator may also receive a format param to
 * check if the string has the correct format.
 * @param {String} format? - Optional parameter to validate whether the the
 * given input value has the correct format. If given, the value must be a
 * string, otherwise this parameter is completely ignored.
 * @returns {boolean} True if the given value is valid or empty, false otherwise.
 * If you want to check for empty value, use the 'required' rule.
 *
 * @author Erik Isidore
 * @version 0.1
 */
var rule$2 = {
    validate: function (value, format) {
        if (format === void 0) { format = 'DD/MM/YYYY'; }
        if (!value)
            return true;
        var options = is(value, 'String') ? { format: format } : {};
        var date = dayjs(value, options);
        return date.isValid();
    },
    message: 'Data inválida.'
};
RuleContainer.add('dateFormat', rule$2);

/**
 * Checks if all characters in a given value are numeric, ignores whitespace.
 *
 * @param {String} value - The input value to be validated.
 * @returns {Boolean}
 *
 * @author Viniazvd, Erik Isidore
 * @version 0.1
 */
var rule$3 = {
    validate: function (value) {
        if (!value)
            return true;
        return !!value.trim() && /^(\d+(\.\d+)?$)/.test(value.trim());
    },
    message: 'Deve conter apenas números.'
};
RuleContainer.add('numeric', rule$3);

/**
 * Receives a value and a regular expression and returns the result of
 * executing the regex on the value.
 *
 * @param {String} value - Input value.
 * @param {Regex} regex - Regular expression object.
 * @returns {boolean}
 *
 * @author Erik Isidore
 * @version 0.1
 */
var rule$4 = {
    validate: function (value, regex) {
        if (!value)
            return true;
        if (!is(value, 'String') || !is(regex, 'RegExp'))
            return false;
        return !!value && regex.test(value);
    },
    message: 'Formato inválido.'
};
RuleContainer.add('regex', rule$4);

/**
 * Validate if the given value is not empty
 *
 * @param {Any} value - The value of the input to be validated.
 * @returns {boolean} - True if the given value is not empty, false otherwise.
 *
 * @author Viniazvd, Erik Isidore
 * @version 0.1
 */
var rule$5 = {
    validate: function (value) {
        if (Array.isArray(value))
            return !!value.length;
        if (typeof value === 'object')
            return !!Object.keys(value || {}).length;
        if (typeof value === 'string')
            return !!value.trim().length;
        if (typeof value === 'number')
            return !!value;
        if (typeof value === 'boolean')
            return true;
        return !!value;
    },
    message: 'Campo obrigatório.'
};
RuleContainer.add('required', rule$5);

/**
 * Checks to see if a given value is bigger than max length, if value
 * is string/array, checks the string length, if it is a number,
 * checks the value itself.
 *
 * @param {Array<any> | String | Number} value - Then given value
 * @param {Number | String} maxLength - the max length.
 * @returns {Boolean} - False if value exceeds max length.
 *
 * @author Erik Isidore
 * @version 0.1
 */
var rule$6 = {
    validate: function (value, maxLength) {
        if (typeof value !== 'number' && !value)
            return true;
        if (Array.isArray(value) || typeof value === 'string')
            return (value || []).length <= maxLength;
        return maxLength >= value;
    },
    message: 'Valor acima do limite.'
};
RuleContainer.add('maxLength', rule$6);

/**
 * Checks to see if a given value is bigger than min length, if value
 * is string/array, checks the string length, if it is a number,
 * checks the value itself.
 *
 * @param {Array<any> | String | Number} value - Then given value
 * @param {Number | String} minLength - the min length.
 * @returns {Boolean} - False if value is smaller than min length.
 *
 * @author Erik Isidore
 * @version 0.1
 */
var rule$7 = {
    validate: function (value, minLength) {
        if (typeof value !== 'number' && !value)
            return true;
        if (Array.isArray(value) || typeof value === 'string')
            return (value || []).length >= minLength;
        return value >= minLength;
    },
    message: 'Valor abaixo do limite.'
};
RuleContainer.add('minLength', rule$7);

var invalidCpfs = Array.from({ length: 10 }, function (_, n) { return n.toString().repeat(11); });
/**
 * Checks if given value is a valid CPF number.
 *
 * @param {String} value - The CPF number to be validated, with or without mask.
 * @returns {Boolean} - wheter it is valid or not
 *
 * @author Vitor Luiz Cavalcanti (https://github.com/VitorLuizC)
 */
var rule$8 = {
    validate: function (value) {
        if (!value)
            return true;
        var isInvalid = function (cpf, rest, pos) {
            return rest !== parseInt(cpf.substring(pos, pos + 1));
        };
        var getRest = function (sum) { return sum > 9 ? 0 : sum; };
        var sumDigit = function (cpf, digit) {
            return 11 - (cpf.substring(0, digit).split('')
                .reduce(function (acc, curr, index) { return acc += parseInt(curr) * ((digit + 1) - index); }, 0) % 11);
        };
        if (!is(value, 'String'))
            return false;
        value = value.replace(/[\D]/gi, '');
        if (!value.match(/^\d+$/))
            return false;
        if (value.length !== 11)
            return false;
        if (invalidCpfs.includes(value))
            return false;
        if (isInvalid(value, getRest(sumDigit(value, 9)), 9))
            return false;
        if (isInvalid(value, getRest(sumDigit(value, 10)), 10))
            return false;
        return true;
    },
    message: 'CPF inválido.'
};
RuleContainer.add('cpf', rule$8);

var rule$9 = {
    validate: function (value) {
        if (!value)
            return true;
        var FTAP = '3298765432';
        var numPis = (value + '').replace(/[^\d]+/g, '');
        var total = FTAP
            .split('')
            .reduce(function (total, digit, index) { return total + (+numPis[index] * +digit); }, 0);
        var rest = (total % 11);
        if (rest !== 0)
            rest = 11 - rest;
        if (rest === 10 || rest === 11)
            rest = (rest + '').slice(1, 2);
        if (+rest !== +(numPis.slice(10, 11)))
            return false;
        return true;
    },
    message: 'Número de PIS inválido'
};
RuleContainer.add('pis', rule$9);

/**
 * Uses a regex defined by the RFC to validate email (http://emailregex.com/)
 *
 * @param {String} value - The input to be validated
 * @return {Boolean}
 *
 * @author Erik Isidore
 */
var rule$a = {
    validate: function (value) {
        if (!value)
            return true;
        var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return regex.test((value || '').trim());
    },
    message: 'E-mail inválido.'
};
RuleContainer.add('email', rule$a);

/**
 * Uses a regex defined to validate hour
 *
 * ex: https://repl.it/@viniazvd/isValidHour
 *
 * @param {String} value
 * @return {Boolean}
 *
 * @author viniazvd
 * @version 0.1
 */
var rule$b = {
    validate: function (value) {
        if (!value)
            return true;
        var regex = /^([0-1]?[0-9]|2[0-4]):([0-5][0-9])(:[0-5][0-9])?$/;
        return regex.test(value);
    },
    message: 'Hora inválida'
};
RuleContainer.add('hour', rule$b);

var unitMultipliers = { 'B': 1,
    'KB': 1000,
    'MB': 1000000,
    'GB': 1000000000
};
/**
 * @param {File} value - The file
 * @param {Array<string>} multiple - Whether or not it is an Array of Files
 * @param {Array<string>} accept - The file types that are accepted
 * @param {Number|String} sizeLimit - Optional size limit for the file (s)
 * @param {SizeUnit} sizeUnit - Determines the unit used for the sizeLimit,
 * one of <'B', 'KB', 'MB' or 'GB'>
 *
 * @author Erik Isidore
 */
var fileValidator = (function (file, accept, sizeLimit, sizeUnit) {
    if (sizeUnit === void 0) { sizeUnit = 'KB'; }
    var limitInBytes = sizeLimit && (+sizeLimit * unitMultipliers[sizeUnit]) || 0;
    var fileExt = file.name
        .substring(file.name.lastIndexOf('.'))
        .toLowerCase();
    return sizeLimit != null
        ? accept.includes(fileExt) && file.size <= limitInBytes
        : accept.includes(fileExt);
});

var defaultArgs = { multiple: false,
    accept: [],
    sizeLimit: null,
    sizeUnit: 'KB'
};
/**
 * @param {File|FileList} value - The file or Array of files (FileList)
 * @param {FileValidatorOpts} options - An object with FileValidatorOptions
 *
 * @author Erik Isidore
 */
var rule$c = {
    validate: function (value, options) {
        if (!value)
            return true;
        var _a = __assign({}, defaultArgs, options), multiple = _a.multiple, accept = _a.accept, sizeLimit = _a.sizeLimit, sizeUnit = _a.sizeUnit;
        if (multiple)
            return Array
                .from(value)
                .every(function (file) { return fileValidator(file, accept, sizeLimit, sizeUnit); });
        return fileValidator(value, accept, sizeLimit, sizeUnit);
    },
    message: 'Arquivo(s) inválido(s)'
};
RuleContainer.add('file', rule$c);

var ScopedValidator = /** @class */ (function () {
    function ScopedValidator(vm) {
        var _this = this;
        this.scopes = [];
        this._options = {};
        this.validations = {};
        this._vm = vm;
        this.fields = new FieldBag();
        vm.$nextTick(function () {
            if (_this._vm.$options.validatorOptions)
                _this.options = _this._vm.$options.validatorOptions;
            if (_this._vm.$options.validations)
                _this.init(_this._vm.$options.validations);
        });
    }
    Object.defineProperty(ScopedValidator.prototype, "options", {
        get: function () {
            return this._options;
        },
        set: function (options) {
            this._options = is(options, 'Function')
                ? options(this._vm)
                : __assign({}, options);
        },
        enumerable: true,
        configurable: true
    });
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
    ScopedValidator.prototype.init = function (template) {
        this._vm.$nextTick(this.__init.bind(this, template));
    };
    ScopedValidator.prototype.__init = function (template) {
        this.scopes = Object.keys(template);
        this.fields.items = this.initFields(template);
        this.validations = this.mapValidations();
    };
    /**
     * Receives a FormTemplate object and maps the fields validation rules
     * in it to populate the `fields` instance property with Field instances.
     *
     * @param {FormTemplate} template - The form or forms validation object.
     * @returns {void}
     *
     * @author Erik Isidore
     */
    ScopedValidator.prototype.initFields = function (template) {
        var _this = this;
        var _a;
        var mapField = function (name, rules, scope) {
            var fieldOptions = {
                name: name,
                rules: rules,
                scope: scope,
                vm: _this._vm,
                el: _this.getFieldEl(name, scope),
                value: scope ? _this._vm[scope][name] : _this._vm[name],
            };
            return new Field(fieldOptions);
        };
        // This will map each form scope name to an array of Field instances,
        // producing an Array of Field arrays, crazy rite? Each field will
        // have its respective scope assigned to it.
        var scopes = this.scopes.map(function (scope) {
            var formScope = template[scope];
            return Object.keys(formScope)
                .map(function (fieldName) { return mapField(fieldName, formScope[fieldName], scope); });
        });
        return (_a = Array.prototype).concat.apply(_a, [[]].concat(scopes));
    };
    /**
     * Generetes the validation flags object based on the form scopes.
     *
     * @returns {FormValidationFlags}
     *
     * @author Erik Isidore
     */
    ScopedValidator.prototype.mapValidations = function () {
        var _this = this;
        var mapFlags = function (scope) { return _this.fields.all(scope)
            .reduce(function (acc, field) {
            var _a;
            return (__assign({}, acc, (_a = {}, _a[field.name] = field.flags, _a)));
        }, {}); };
        var mapFormScopes = function (acc, scope) {
            var _a;
            return (__assign({}, acc, (_a = {}, _a[scope] = mapFlags(scope), _a)));
        };
        return this.scopes.length > 1
            ? this.scopes.reduce(mapFormScopes, {})
            : mapFlags();
    };
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
    ScopedValidator.prototype.getFieldEl = function (fieldName, scope) {
        var fieldQuery = scope
            ? "form[name=\"" + scope + "\"] [name=\"" + fieldName + "\"]"
            : "[name=\"" + fieldName + "\"]";
        var fields = this._vm.$el.querySelectorAll(fieldQuery);
        if (process.env.NODE_ENV !== 'production' && !fields.length)
            console.warn("CeeValidate: Field \"" + fieldName + "\" could not be found in the DOM");
        return fields[0];
    };
    /**
     * @param {String} fieldName -
     * @param {String} scope? -
     * @returns {void}
     *
     * @author Erik Isidore
     */
    ScopedValidator.prototype.validate = function (fieldName, scope) {
        var field = this.fields.get(fieldName, scope);
        // Field doesn't exist, return false (invalid field)
        if (!field)
            return false;
        var mapErrors = function (_a) {
            var ruleName = _a.ruleName, args = _a.args;
            var rule = RuleContainer.getRule(ruleName);
            var hasError = !rule.validate.apply(null, [field.value].concat((args || [])));
            var errorMessage = rule.message;
            return hasError ? errorMessage : '';
        };
        var fieldErrors = field.rules
            .map(mapErrors)
            .filter(function (message) { return !!message; });
        field.setFlag('errors', fieldErrors);
        field.setFlag('valid', !fieldErrors.length);
        return !fieldErrors.length;
    };
    /**
     * Executes the validate() method on all Field instances.
     *
     * @param {String} scope? -
     * @returns {void}
     *
     * @author Erik Isidore
     */
    ScopedValidator.prototype.validateAll = function (scope) {
        var fieldFlags = this.fields.all(scope)
            .map(function (field) { return field.validate(); });
        var isValid = fieldFlags.every(function (isValid) { return !!isValid; });
        this.options = __assign({}, (this.options || {}), { noListeners: false });
        return isValid;
    };
    /**
     * Resets all of the fields validation flags.
     *
     * @param {String} scope? -
     * @returns {void}
     *
     * @author Erik Isidore
     */
    ScopedValidator.prototype.reset = function (scope) {
        this.fields.all(scope).forEach(function (field) { return field.reset(); });
    };
    /**
     * Attaches a new field to the validator.
     *
     * @param {}
     * @returns {void}
     *
     * @author Erik Isidore
     */
    ScopedValidator.prototype.attach = function (field) {
        var newField = new Field({
            vm: this._vm,
            name: field.name,
            rules: field.rules,
            scope: field.scope,
            el: this.getFieldEl(field.name, field.scope),
            value: field.scope ? this._vm[field.scope][field.name] : this._vm[field.name]
        });
        this.fields.push(newField);
        this.validations = this.mapValidations();
    };
    /**
     * Detaches an existing field from the validator.
     *
     * @param {String} field - The name of the field
     * @param {String} scope? - Optional scope of the field
     * @returns {void}
     *
     * @author Erik Isidore
     */
    ScopedValidator.prototype.detach = function (field, scope) {
        this.fields.remove(field, scope);
        this.validations = this.mapValidations();
    };
    /**
     * Sets the rule of a field and validate it if it has changed.
     *
     * @param {Object<name: string, scope: string>} field - Object with name
     * and scope of the field.
     * @param {FieldValidation} rules - The rules to be set in the field
     * @returns {void}
     */
    ScopedValidator.prototype.setFieldRule = function (field, rules) {
        var fieldInstance = this.fields.get(field.name, field.scope);
        if (!fieldInstance)
            return;
        fieldInstance.setRule(rules);
        if (fieldInstance.flags.changed)
            fieldInstance.validate();
    };
    return ScopedValidator;
}());

// eslint-disable
var FormValidator = /** @class */ (function (_super) {
    __extends(FormValidator, _super);
    function FormValidator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // In the future we'll use this function to pass mixin options
    // and make some checkings before instantiating the ScopedValidator
    FormValidator.prototype.beforeCreate = function () {
        var _this = this;
        // Get Vue constructor
        var Vue$$1 = this.$options._base;
        this.$validator = new ScopedValidator(this);
        // Setup computed properties on the component
        if (!this.$options.computed)
            this.$options.computed = {};
        Vue$$1.util.defineReactive(this.$validator, 'validations', this.$validator.validations);
        this.$options.computed['$validations'] = function () { return _this.$validator.validations; };
    };
    FormValidator = __decorate([
        Component
    ], FormValidator);
    return FormValidator;
}(Vue));

export default FormValidator;
//# sourceMappingURL=cee-validate.es5.js.map
