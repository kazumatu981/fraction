import { describe, test, expect, jest } from '@jest/globals';
import { Fraction } from '../../src/fraction';

// LEARN: CMN002 Fraction.simplify() の単体テストを書こう(モッキングってなんだ？)
/**
 * 最大公約数辞書
 */
const gcdDictionary: Record<string, number> = {
    '2gcd4': 2,
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
    return gcdDictionary[`${a}gcd${b}`];
}

/** * 最小公倍数を求める関数(偽物)
 * @param a 分子
 * @param b 分母
 * @returns 最小公倍数
 */
function __mock_ResolveLcm(a: number, b: number): number {
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
    });
});
