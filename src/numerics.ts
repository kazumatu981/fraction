import { __mustBeInteger, __mustNotBeNegative, __mustNotBeZero } from './assert';
import { getPrimeNumberUntil, isPrimeNumber } from './prime-number-table';

export { getPrimeNumberUntil, isPrimeNumber };

/**
 * 素因数分解の要素
 */
export interface PrimeFactor {
    /**
     * 素因数 (素数)
     */
    base: number;
    /**
     * 指数 (その素数が何回掛けられているか)
     */
    exponent: number;
}

function _findOrderOfPrime(sourceNumber: number, prime: number): number {
    let exponent = 0;
    for (let remainder = sourceNumber; remainder % prime === 0; remainder = remainder / prime) {
        exponent++;
    }
    return exponent;
}
/**
 * 与えられた数を素因数分解をします。
 * @param sourceNumber 分解対象の数
 * @returns 素因数分解結果
 * @throws 負の数であった場合
 */
export function extractPrimeFactors(sourceNumber: number): PrimeFactor[] {
    __mustBeInteger(sourceNumber);
    __mustNotBeNegative(sourceNumber);
    __mustNotBeZero(sourceNumber);

    const result = getPrimeNumberUntil(sourceNumber)
        .map((prime) => {
            return {
                base: prime,
                exponent: _findOrderOfPrime(sourceNumber, prime),
            };
        })
        .filter((element) => element.exponent > 0);
    return result;
}

/**
 * べき乗計算する
 * @param base 基数
 * @param exponent 素数
 * @returns べき乗結果
 */
function _pow(base: number, exponent: number): number {
    __mustBeInteger(base);
    __mustBeInteger(exponent);
    __mustNotBeNegative(base);
    __mustNotBeNegative(exponent);

    return Array.from({ length: exponent })
        .map((_) => base)
        .reduce((prev, next) => next * prev, 1);
}

/**
 * 素因数分解の結果を合成する
 * @param factors 素因数分解の結果
 * @returns 合成結果
 */
export function combinePrimeFactors(factors: PrimeFactor[]): number {
    return factors.map((f) => _pow(f.base, f.exponent)).reduce((prev, next) => prev * next, 1);
}

/**
 * 2つの整数a, bの最大公約数を求める
 * @param a 1つ目の整数
 * @param b 2つ目の整数
 * @returns 2つの整数a, bの最大公約数
 */
export function resolveGcd(a: number, b: number): number {
    [a, b].forEach((x) => {
        __mustBeInteger(x);
        __mustNotBeNegative(x);
        __mustNotBeZero(x);
    });
    const extractedA = extractPrimeFactors(a);
    const extractedB = extractPrimeFactors(b);

    const commonFactors = extractedA
        .map((factorA) => {
            const exponentB = extractedB.find((f) => f.base === factorA.base)?.exponent ?? 0;
            return {
                base: factorA.base,
                exponent: Math.min(factorA.exponent, exponentB),
            };
        })
        .filter((f) => f.exponent != 0);

    return combinePrimeFactors(commonFactors);
}

/**
 * 2つの整数a, bの最小公倍数
 * @param a 1つ目の整数
 * @param b 2つ目の整数
 * @returns 2つの整数a, bの最小公倍数
 */
export function resolveLcm(a: number, b: number): number {
    [a, b].forEach((x) => {
        __mustBeInteger(x);
        __mustNotBeNegative(x);
        __mustNotBeZero(x);
    });
    const gcd = resolveGcd(a, b);
    return (a * b) / gcd;
}
