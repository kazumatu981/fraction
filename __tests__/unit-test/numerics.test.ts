/* eslint-disable max-lines-per-function */
import { describe, test, expect, jest } from '@jest/globals';
import { extractPrimeFactors, resolveGcd, resolveLcm, type PrimeFactor } from '../../src/numerics';

import { expectPrimeFactors } from './numerics_test-util';

const PRIME_NUMBERS = [
    2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97,
];

function __mock_getPrimeNumbersUntil(maxValue: number): number[] {
    return PRIME_NUMBERS.filter((x) => x <= maxValue);
}

jest.mock('../../src/prime-number-table', () => {
    // モッキングしない関数はそのまま
    const originalModule = jest.requireActual('../../src/prime-number-table') as object;
    return {
        __esModule: true,
        ...originalModule,
        /** getPrimeNumberUntilを偽物に置き換える */
        getPrimeNumberUntil: __mock_getPrimeNumbersUntil,
    };
});

describe('extractPrimeFactors: 素因数分解ができることを確認する', () => {
    test('1を素因数分解する', () => {
        const actual = extractPrimeFactors(1);

        expectPrimeFactors(actual).isEmpty();
    });

    test('素数2を素因数分解する', () => {
        const expected: PrimeFactor[] = [
            {
                base: 2,
                exponent: 1,
            },
        ];
        const actual = extractPrimeFactors(2);

        expectPrimeFactors(actual).isValid().toEqual(expected);
    });

    test('6を素因数分解する', () => {
        const expected: PrimeFactor[] = [
            {
                base: 2,
                exponent: 1,
            },
            {
                base: 3,
                exponent: 1,
            },
        ];
        const actual = extractPrimeFactors(6);

        expectPrimeFactors(actual).isValid().toEqual(expected);
    });

    test('素数8を素因数分解する', () => {
        const expected: PrimeFactor[] = [
            {
                base: 2,
                exponent: 3,
            },
        ];
        const actual = extractPrimeFactors(8);

        expectPrimeFactors(actual).isValid().toEqual(expected);
    });

    test('24を素因数分解する', () => {
        const expected: PrimeFactor[] = [
            {
                base: 2,
                exponent: 3,
            },
            {
                base: 3,
                exponent: 1,
            },
        ];
        const actual = extractPrimeFactors(24);

        expectPrimeFactors(actual).isValid().toEqual(expected);
    });
    test('1を素因数分解する', () => {
        const expected: PrimeFactor[] = [];
        const actual = extractPrimeFactors(1);

        expectPrimeFactors(actual).isValid().toEqual(expected);
    });
});

describe('extractPrimeFactors: エラーケース', () => {
    test('マイナスはエラー', () => {
        expect(() => extractPrimeFactors(-10)).toThrow();
    });
    test('0はエラー', () => {
        expect(() => extractPrimeFactors(0)).toThrow();
    });
    test('小数はエラー', () => {
        expect(() => extractPrimeFactors(0.5)).toThrow();
    });
});

describe('resolveGcd: 最大公約数を求めることができる', () => {
    test('8と6の最大公約数は2', () => {
        const expected = 2;
        const actual = resolveGcd(8, 6);
        expect(actual).toEqual(expected);
    });
    test('3と5の最大公約数は1', () => {
        const expected = 1;
        const actual = resolveGcd(3, 5);
        expect(actual).toEqual(expected);
    });
    // LEARN [SPN002] `resolveGcd()`/`resolveLcm()` のテストを完成させよう
    // テストケースを追加する
});
describe('resolveGcd: エラーケース', () => {
    test('マイナスはエラー', () => {
        expect(() => {
            resolveGcd(-1, 2);
        }).toThrow();
    });
    test('マイナスはエラー', () => {
        expect(() => {
            resolveGcd(1, -2);
        }).toThrow();
    });
    test('0はエラー', () => {
        expect(() => {
            resolveGcd(0, 2);
        }).toThrow();
    });
    test('0はエラー', () => {
        expect(() => {
            resolveGcd(1, 0);
        }).toThrow();
    });
    test('小数はエラー', () => {
        expect(() => {
            resolveGcd(1, 0.5);
        }).toThrow();
    });
    test('小数はエラー', () => {
        expect(() => {
            resolveGcd(1.2, 1);
        }).toThrow();
    });
});

describe('resolveLcm: 最小公倍数を求めることができる', () => {
    test('8と6の最小公倍数は24', () => {
        const expected = 24;
        const actual = resolveLcm(8, 6);
        expect(actual).toEqual(expected);
    });
    test('8と2の最小公倍数は2', () => {
        const expected = 8;
        const actual = resolveLcm(8, 2);
        expect(actual).toEqual(expected);
    });
    test('20と21の最小公倍数は420', () => {
        const expected = 420;
        const actual = resolveLcm(20, 21);
        expect(actual).toEqual(expected);
    });
});
describe('resolveLcm: エラーケース', () => {
    test('マイナスはエラー', () => {
        expect(() => {
            resolveLcm(-1, 2);
        }).toThrow();
    });
    test('マイナスはエラー', () => {
        expect(() => {
            resolveLcm(1, -2);
        }).toThrow();
    });
    test('0はエラー', () => {
        expect(() => {
            resolveLcm(0, 2);
        }).toThrow();
    });
    test('0はエラー', () => {
        expect(() => {
            resolveLcm(1, 0);
        }).toThrow();
    });
    test('小数はエラー', () => {
        expect(() => {
            resolveLcm(1, 0.5);
        }).toThrow();
    });
    test('小数はエラー', () => {
        expect(() => {
            resolveLcm(1.2, 1);
        }).toThrow();
    });
});
