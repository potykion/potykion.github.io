import {reactive} from './petite-vue.js';

export class Result {
    get isOk() {
        return this instanceof Ok;
    }

    static if_ = boolCallable => boolCallable() ? new Ok() : new Err();

    then = val => this.isOk ? new Ok(val) : this;
    else_ = val => !this.isOk ? new Err(val) : this;

    map = callable => this.isOk ? new Ok(callable(this.val)) : this;

    and = resultCallable => this.isOk ? resultCallable(this.val) : this;

    mapErr = callable => this.isOk ? this : new Err(callable(this.val));

    or = resultCallable => this.isOk ? this : resultCallable(this.val);

}

export class Ok extends Result {
    constructor(val = null) {
        super();
        this.val = val;
    }
}

export class Err extends Result {
    constructor(val = null) {
        super();
        this.val = val;
    }
}

// console.log(new Ok(1).map((i) => i + 1).val);

/**
 * @typedef {('yes'|'no'|'???')} Decision
 */

export const store = reactive({
    /** @type {('init'|'theatre'|'movie'|'coffee')} */
    howCanIHelp: 'init',
    hours: 0,
    /** @type {Decision} */
    smellsLikeCigarettes: '???',

    /** @returns {Decision} */
    decision() {
        switch (this.howCanIHelp) {
            case "init":
                return '???'
            case 'theatre':
            case 'movie':
                return this.hours >= 2.5
                    ? 'no'
                    : this.hours > 0
                        ? 'yes'
                        : '???';
            case 'coffee':
                return this.smellsLikeCigarettes === 'yes'
                    ? 'no'
                    : this.smellsLikeCigarettes === 'no'
                        ? 'yes'
                        : '???';
        }
    }
})

// let hours = 0;
// console.log(
//     Result.if_(() => hours >= 2.5)
//         .then('no')
//         .or((_) => Result.if_(() => hours > 0)
//             .then('yes')
//             .else_('???'))
//         .val
// )