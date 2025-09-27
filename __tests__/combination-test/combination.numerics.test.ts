import { expect, test } from '@jest/globals';
import {
    isPrimeNumber,
    getPrimeNumberUntil,
    extractPrimeFactors,
    resolveGcd,
    resolveLcm,
} from '../../src';

test('Numerics の組み合わせテスト: 素数判定', () => {
    expect(isPrimeNumber(1)).toBe(false);
    expect(isPrimeNumber(2)).toBe(true);
    expect(isPrimeNumber(3)).toBe(true);
    expect(isPrimeNumber(4)).toBe(false);
    expect(isPrimeNumber(29)).toBe(true);
    expect(isPrimeNumber(30)).toBe(false);
});
test('Numerics の組み合わせテスト: 指定値以下の素数リスト取得', () => {
    expect(getPrimeNumberUntil(1)).toEqual([]);
    expect(getPrimeNumberUntil(2)).toEqual([2]);
    expect(getPrimeNumberUntil(10)).toEqual([2, 3, 5, 7]);
    expect(getPrimeNumberUntil(30)).toEqual([2, 3, 5, 7, 11, 13, 17, 19, 23, 29]);
});

// ...
