/* eslint-disable max-lines-per-function */
import { describe, test, expect, afterEach } from '@jest/globals';
import { PrimeNumberTable } from '../../src/prime-number-table';

describe('[Unit][PrimeNumberTable]:static until() シングルトンになっていることを確認', () => {
    afterEach(() => {
        PrimeNumberTable.dispose();
    });
    test('インスタンスが生成される', () => {
        const prime = PrimeNumberTable.getTable(50);
        expect(prime).not.toBeNull();
    });
    test('インスタンスが再利用されるか', () => {
        const primes1 = PrimeNumberTable.getTable(11);
        const primes2 = PrimeNumberTable.getTable(10);
        expect(primes2).toBe(primes1);
    });
});

describe('[Unit][PrimeNumberTable]: 基本機能 素数テーブルの生成', () => {
    afterEach(() => {
        PrimeNumberTable.dispose();
    });
    test('10 までの素数を列挙', () => {
        const test = 10;
        const expected = [1, 2, 3, 5, 7];
        const actual = PrimeNumberTable.until(test);
        expect(actual).toEqual(expected);
    });
    test('11までの素数を列挙', () => {
        const test = 11;
        const expected = [1, 2, 3, 5, 7, 11];
        const actual = PrimeNumberTable.until(test);
        expect(actual).toEqual(expected);
    });
    test('12までの素数を列挙', () => {
        const test = 12;
        const expected = [1, 2, 3, 5, 7, 11];
        const actual = PrimeNumberTable.until(test);
        expect(actual).toEqual(expected);
    });
    test('13までの素数を列挙', () => {
        const test = 13;
        const expected = [1, 2, 3, 5, 7, 11, 13];
        const actual = PrimeNumberTable.until(test);
        expect(actual).toEqual(expected);
    });
    test('14までの素数を列挙', () => {
        const test = 14;
        const expected = [1, 2, 3, 5, 7, 11, 13];
        const actual = PrimeNumberTable.until(test);
        expect(actual).toEqual(expected);
    });
    test('0はエラーになることを確認', () => {
        const test = 0;
        expect(() => {
            PrimeNumberTable.until(test);
        }).toThrow();
    });
    test('負の数はエラーになることの確認', () => {
        const test = -1;
        expect(() => {
            PrimeNumberTable.until(test);
        }).toThrow();
    });
    test('小数はエラーになることの確認', () => {
        const test = 1.5;
        expect(() => {
            PrimeNumberTable.until(test);
        }).toThrow();
    });
});

describe('[Unit][PrimeNumberTable]: 基本機能 素数判定', () => {
    beforeEach(() => {
        PrimeNumberTable.getTable(100);
    });
    afterEach(() => {
        PrimeNumberTable.dispose();
    });
    test('素数であることの確認', () => {
        const test = 7;
        const actual = PrimeNumberTable.isPrime(test);
        expect(actual).toBe(true);
    });
    test('素数でないことの確認', () => {
        const test = 8;
        const actual = PrimeNumberTable.isPrime(test);
        expect(actual).toBe(false);
    });
    test('1は素数であることの確認', () => {
        const test = 1;
        const actual = PrimeNumberTable.isPrime(test);
        expect(actual).toBe(true);
    });
    test('0は素数でないことの確認', () => {
        const test = 0;
        const actual = PrimeNumberTable.isPrime(test);
        expect(actual).toBe(false);
    });
    test('負の数はエラーになることの確認', () => {
        const test = -1;
        expect(() => {
            PrimeNumberTable.isPrime(test);
        }).toThrow();
    });
    test('小数はエラーになることの確認', () => {
        const test = 1.5;
        expect(() => {
            PrimeNumberTable.isPrime(test);
        }).toThrow();
    });
});
