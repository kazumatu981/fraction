import { expect } from '@jest/globals';
import { type PrimeFactor } from '../../src/numerics';

interface PrimeFactorArrayCompare {
    toEqual: (expected: PrimeFactor[]) => void;
}

export function isValidPrimeFactors(actual: PrimeFactor[]) {
    actual.forEach((item, index) => {
        const tail = actual.slice(index + 1);
        expect(tail.findIndex((x) => x.base === item.base)).toEqual(-1);
    });
}

export function expectPrimeFactors(actual: PrimeFactor[]): PrimeFactorArrayCompare {
    isValidPrimeFactors(actual);
    return {
        toEqual(expected) {
            expect(actual.length).toEqual(expected.length);
            actual.forEach((item) => {
                const found = expected.find((x) => x.base === item.base) as PrimeFactor;
                expect(found).toBeDefined();
                expect(item.exponent).toEqual(found.exponent);
            });
        },
    };
}
