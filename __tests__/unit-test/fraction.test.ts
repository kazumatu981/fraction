/* eslint-disable max-lines-per-function */
import { describe, test, expect, jest } from '@jest/globals';
import { Fraction } from '../../src/fraction';
import { __mustBeDefinedOnRecord } from '../../src/assert';

// LEARN: CMN002 Fraction.simplify() の単体テストを書こう(モッキングってなんだ？)
/**
 * 最大公約数辞書
 */
const gcdDictionary: Record<string, number> = {
    '1gcd2': 1,
    '2gcd4': 2,
    '5gcd6': 1,
    '5gcd7': 1,
};

const lcmDictionary: Record<string, number> = {
    '2lcm4': 4,
};

/**
 * 最大公約数を求める関数(偽物)
 * @param a 分子
 * @param b 分母
 * @returns 最大公約数
 */
function __mock_ResolveGcd(a: number, b: number): number {
    __mustBeDefinedOnRecord(gcdDictionary, `${a}gcd${b}`, `${a}と${b}の最大公約数が未定義です`);
    return gcdDictionary[`${a}gcd${b}`];
}

/** * 最小公倍数を求める関数(偽物)
 * @param a 分子
 * @param b 分母
 * @returns 最小公倍数
 */
function __mock_ResolveLcm(a: number, b: number): number {
    __mustBeDefinedOnRecord(lcmDictionary, `${a}lcm${b}`, `${a}と${b}の最小公倍数が未定義です`);
    return lcmDictionary[`${a}lcm${b}`];
}

jest.mock('../../src/numerics', () => {
    // モッキングしない関数はそのまま
    const originalModule = jest.requireActual('../../src/numerics') as object;
    return {
        __esModule: true,
        ...originalModule,
        /** 最大公約数を求めるを偽物に置き換える */
        resolveGcd: __mock_ResolveGcd,
        /** 最小公倍数を求めるを偽物に置き換える */
        resolveLcm: __mock_ResolveLcm,
    };
});

describe('Fraction 単体テスト', () => {
    describe('constructor', () => {
        // LEARN: CMN002 Fraction.simplify() の単体テストを書こう(テストコードの記述)
        test('約分しないケース 1/2', () => {
            const f = new Fraction(1, 2);
            expect(f.numerator).toEqual(1);
            expect(f.denominator).toEqual(2);
        });
        test('約分しないケース 5/7', () => {
            const f = new Fraction(5, 7);
            expect(f.numerator).toEqual(5);
            expect(f.denominator).toEqual(7);
        });
        test('分子がマイナス -5/6', () => {
            const f = new Fraction(-5, 6);
            expect(f.isNegative).toBe(true);
            expect(f.numerator).toEqual(5);
            expect(f.denominator).toEqual(6);
        });
        test('分母がマイナス 5/-6', () => {
            const f = new Fraction(5, -6);
            expect(f.isNegative).toBe(true);
            expect(f.numerator).toEqual(5);
            expect(f.denominator).toEqual(6);
        });
        test('分子が0なら分母は1が設定される', () => {
            const f = new Fraction(0, 7);
            expect(f.isNegative).toBe(false);
            expect(f.numerator).toEqual(0);
            expect(f.denominator).toEqual(1);
        });
        test('分子・分母がマイナス -5/-6', () => {
            const f = new Fraction(-5, -6);
            expect(f.isNegative).toBe(false);
            expect(f.numerator).toEqual(5);
            expect(f.denominator).toEqual(6);
        });
        test('約分するケース', () => {
            const f = new Fraction(2, 4);
            expect(f.numerator).toEqual(1);
            expect(f.denominator).toEqual(2);
        });

        test('分母が0の場合例外が発生する', () => {
            expect(() => {
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                const f = new Fraction(1, 0);
            }).toThrow();
        });
        test('分子が小数点例外が発生する', () => {
            expect(() => {
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                const f = new Fraction(1.23, 1);
            }).toThrow();
        });
        test('分母が小数点例外が発生する', () => {
            expect(() => {
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                const f = new Fraction(1, 1.34);
            }).toThrow();
        });
    });
    // LEARN: [CMN004]: `Fraction.add()`の単体テストと実装をしよう
    describe('add', () => {
        test('1/2 + 1/3 = 5/6', () => {
            const f1 = new Fraction(1, 2);
            const f2 = new Fraction(1, 3);
            const result = f1.add(f2);
            expect(result.numerator).toBe(5);
            expect(result.denominator).toBe(6);
        });

        test('1/2 + - 1/3 = 1/6', () => {
            const f1 = new Fraction(1, 2);
            const f2 = new Fraction(-1, 3);
            const result = f1.add(f2);
            expect(result.numerator).toBe(1);
            expect(result.denominator).toBe(6);
        });

        test('1/4 + 1/6 = 5/12', () => {
            const f1 = new Fraction(1, 4);
            const f2 = new Fraction(1, 6);
            const result = f1.add(f2);
            expect(result.numerator).toBe(5);
            expect(result.denominator).toBe(12);
        });
        test('1/8 + 1/6 = 5/12', () => {
            const f1 = new Fraction(1, 8);
            const f2 = new Fraction(1, 6);
            const result = f1.add(f2);
            expect(result.numerator).toBe(7);
            expect(result.denominator).toBe(24);
        });
    });
    // LEARN: [SPF001] `add`/`subtract`/`multiply`/`divide`のテストを完成させよう
});
