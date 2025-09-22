import { describe, test, expect, jest } from '@jest/globals';
import { Fraction } from '../../src/fraction';

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
        test('約分するケース', () => {
            const f = new Fraction(2, 4);
            expect(f.numerator).toEqual(1);
            expect(f.denominator).toEqual(2);
        });
    });
});
