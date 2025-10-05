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

// LEARN [SPN005][チャレンジ課題]: コードのリファクタリング
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

    const primes = getPrimeNumberUntil(sourceNumber);
    const result: PrimeFactor[] = [];
    let remainder = sourceNumber;
    for (const prime of primes) {
        if (prime > sourceNumber) {
            break;
        }
        let exponent = 0;
        while (remainder % prime === 0) {
            exponent++;
            remainder = remainder / prime;
        }
        if (exponent > 0) {
            result.push({ base: prime, exponent: exponent });
        }
        if (remainder === 1) {
            break;
        }
    }
    return result;
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
    // LEARN [SPN004] `resolveGcd()`/`resolveLcm()` を実装しよう
    const extractedA = extractPrimeFactors(a);
    const extractedB = extractPrimeFactors(b);
    const commonFactors: PrimeFactor[] = [];

    for (const factorA of extractedA) {
        const factorB = extractedB.find((f) => f.base === factorA.base);
        if (factorB) {
            commonFactors.push({
                base: factorA.base,
                exponent: Math.min(factorA.exponent, factorB.exponent),
            });
        }
    }
    let gcd = 1;
    for (const factor of commonFactors) {
        for (let i = 0; i < factor.exponent; i++) {
            gcd *= factor.base;
        }
    }

    return gcd;
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
    // LEARN [SPN004] `resolveGcd()`/`resolveLcm()` を実装しよう

    throw new Error('Not Implemented');
}
