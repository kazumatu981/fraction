import { describe, expect, test } from '@jest/globals';
import { Fraction, gcd } from '../src/fraction';

describe('gcd: 最大公約数を求める', () => {
    const testCases = [
        [0, 0, 0],
        [0, 1, 1],
        [1, 0, 1],
        [1, 1, 1],
        [1, 2, 1],
        [2, 1, 1],
        [6, 4, 2],
        [4, 6, 2],
        [3, 5, 1],
        [5, 3, 1],
        [6, 8, 2],
        [8, 6, 2],
        [6, 9, 3],
        [9, 6, 3],
        [9, 8, 1],
        [8, 9, 1],
        [8, 7, 1],
        [7, 8, 1],
        [7, 6, 1],
        [6, 7, 1],
        [6, 5, 1],
        [5, 6, 1],
        [5, 4, 1],
        [12, 8, 4],
        [12, 9, 3],
        [18, 12, 6],
    ];
    testCases.forEach((testCase) => {
        test(`gcd(${testCase[0]}, ${testCase[1]}) = ${testCase[2]}`, () => {
            expect(gcd(testCase[0], testCase[1])).toBe(testCase[2]);
        });
    });
});

describe('Fraction', () => {
    describe('普通の四則演算ができるか？', () => {
        describe('加算', () => {
            test('1/2 + 1/3 = 5/6', () => {
                const f1 = new Fraction(1, 2);
                const f2 = new Fraction(1, 3);
                const f3 = f1.add(f2);
                expect(f3.numerator).toBe(5);
                expect(f3.denominator).toBe(6);
            });

            test('-1/2 + 1/3 = 1/6', () => {
                const f1 = new Fraction(-1, 2);
                const f2 = new Fraction(1, 3);
                const f3 = f1.add(f2);
                expect(f3.numerator).toBe(1);
                expect(f3.denominator).toBe(6);
            });

            test('-1/2 + -1/3 = -5/6', () => {
                const f1 = new Fraction(-1, 2);
                const f2 = new Fraction(-1, 3);
                const f3 = f1.add(f2);
                expect(f3.numerator).toBe(-5);
                expect(f3.denominator).toBe(6);
            });

            test('1/2 + -1/3 = -1/6', () => {
                const f1 = new Fraction(1, 2);
                const f2 = new Fraction(-1, 3);
                const f3 = f1.add(f2);
                expect(f3.numerator).toBe(-1);
                expect(f3.denominator).toBe(6);
            });
        });
        describe('減算', () => {
            test('1/2 - 1/3 = -1/6', () => {
                const f1 = new Fraction(1, 2);
                const f2 = new Fraction(1, 3);
                const f3 = f1.subtract(f2);
                expect(f3.numerator).toBe(-1);
                expect(f3.denominator).toBe(6);
            });

            test('-1/2 - 1/3 = -5/6', () => {
                const f1 = new Fraction(-1, 2); // -1/2
                const f2 = new Fraction(1, 3); // 1/3
                const f3 = f1.subtract(f2);
                expect(f3.numerator).toBe(-5); // -5/6
                expect(f3.denominator).toBe(6); // 6
            });

            test('-1/2 - -1/3 = 1/6', () => {
                const f1 = new Fraction(-1, 2);
                const f2 = new Fraction(-1, 3);
                const f3 = f1.subtract(f2);
                expect(f3.numerator).toBe(1);
                expect(f3.denominator).toBe(6);
            });

            test('1/2 - -1/3 = 5/6', () => {
                const f1 = new Fraction(1, 2);
                const f2 = new Fraction(-1, 3);
                const f3 = f1.subtract(f2);
                expect(f3.numerator).toBe(5);
                expect(f3.denominator).toBe(6);
            });

            // TODO: 掛け算のテスト

            // TODO: 割り算のテスト
        });
    });
});
