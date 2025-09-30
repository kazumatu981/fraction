import { expect } from '@jest/globals';
import { type PrimeFactor } from '../../src/numerics';

export function expectPrimeFactors(actual: PrimeFactor[]): PrimeFactorValidator {
    return new PrimeFactorValidator(actual);
}

class PrimeFactorValidator {
    private _actual: PrimeFactor[];
    constructor(actual: PrimeFactor[]) {
        this._actual = actual;
    }

    public isValid(): this {
        this._actual.forEach((item, index) => {
            const tail = this._actual.slice(index + 1);
            expect(tail.findIndex((x) => x.base === item.base)).toEqual(-1);
        });
        return this;
    }
    public isEmpty(): this {
        expect(this._actual.length).toEqual(0);
        return this;
    }
    public toEqual(expected: PrimeFactor[]): this {
        expect(this._actual.length).toEqual(expected.length);
        this._actual.forEach((item) => {
            const found = expected.find((x) => x.base === item.base) as PrimeFactor;
            expect(found).toBeDefined();
            expect(item.exponent).toEqual(found.exponent);
        });
        return this;
    }
}
