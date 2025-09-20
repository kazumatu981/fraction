import { describe, test, expect } from '@jest/globals';
import {
    findPrimeNumbers,
    extractPrimeFactors,
    resolveGcd,
    type PrimeFactor,
} from '../../src/numerics';

import { isValidPrimeFactors, expectPrimeFactors } from './numerics_test-util';

describe('findPrimeNumbers', () => {
    describe('素数を返却できることを確認する', () => {
        test('10までの素数を返却する', () => {
            expect(findPrimeNumbers(10)).toEqual([2, 3, 5, 7]);
        });
        // TODO テストを追加する！！！！
    });
    describe('例外を発生させるケース', () => {
        test('負の数を与える', () => {
            expect(() => {
                findPrimeNumbers(-5);
            }).toThrow();
        });
        test('0を与える', () => {
            expect(() => {
                findPrimeNumbers(0);
            }).toThrow();
        });
        test('小数を与える', () => {
            expect(() => {
                findPrimeNumbers(1.5);
            }).toThrow();
        });
        // TODO ほかに意地悪な例外ケースはない？
    });
});

describe('extractPrimeFactors', () => {
    describe('素因数分解ができることを確認する', () => {
        test('素数2を素因数分解する', () => {
            const expected: PrimeFactor[] = [
                {
                    base: 2,
                    exponent: 1,
                },
            ];
            const actual = extractPrimeFactors(2);

            expectPrimeFactors(actual).toEqual(expected);
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

            expectPrimeFactors(actual).toEqual(expected);
        });
        // TODO テストを追加する

        test('1を素因数分解する', () => {
            const expected: PrimeFactor[] = [
                {
                    base: 1,
                    exponent: 1,
                },
            ];
            const actual = extractPrimeFactors(1);

            expectPrimeFactors(actual).toEqual(expected);
        });
    });

    describe('エラーケース', () => {
        test('マイナスはエラー', () => {
            expect(() => extractPrimeFactors(-10)).toThrow();
        });
        // TODO ほかのケースは??負の数や小数は??
    });
});

describe('resolveGcd', () => {
    describe('最大公約数を求めることができる', () => {
        test('8と6の最大公約数は2', () => {
            const expected = 2;
            const actual = resolveGcd(8, 6);
            expect(actual).toEqual(expected);
        });
        // TODO テストケースを追加する
    });
    describe('エラーケース', () => {
        test('マイナスはエラー', () => {
            expect(() => {
                resolveGcd(-1, 2);
            }).toThrow();
        });
        // TODO その他のエラーケースは？？
    });
});
