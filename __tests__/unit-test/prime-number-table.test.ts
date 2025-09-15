import { describe, test, expect, afterEach } from '@jest/globals';
import { PrimeNumberTable } from '../../src/prime-number-table';

describe('PrimeNumberTableクラスの単体テスト: static until()', () => {
    afterEach(() => {
        PrimeNumberTable.dispose();
    });
    test('10 までの素数を列挙', () => {
        const test = 10;
        const expected = [1, 2, 3, 5, 7];
        const primes = PrimeNumberTable.until(test);
        const actual = primes.table;
        expect(actual).toEqual(expected);
    });
    test('11までの素数を列挙', () => {
        const test = 11;
        const expected = [1, 2, 3, 5, 7, 11];
        const primes = PrimeNumberTable.until(test);
        const actual = primes.table;
        expect(actual).toEqual(expected);
    });
    test('12までの素数を列挙', () => {
        const test = 12;
        const expected = [1, 2, 3, 5, 7, 11];
        const primes = PrimeNumberTable.until(test);
        const actual = primes.table;
        expect(actual).toEqual(expected);
    });
    test('13までの素数を列挙', () => {
        const test = 13;
        const expected = [1, 2, 3, 5, 7, 11, 13];
        const primes = PrimeNumberTable.until(test);
        const actual = primes.table;
        expect(actual).toEqual(expected);
    });
    test('14までの素数を列挙', () => {
        const test = 14;
        const expected = [1, 2, 3, 5, 7, 11, 13];
        const primes = PrimeNumberTable.until(test);
        const actual = primes.table;
        expect(actual).toEqual(expected);
    });
    test('二回目のほうがが小さい場合、インスタンスが再利用されるか', () => {
        const primes1 = PrimeNumberTable.until(11);
        const primes2 = PrimeNumberTable.until(10);
        expect(primes2).toBe(primes1);
    });
    test('二回目のほうが大きい場合、インスタンスが再生成されるか', () => {
        const primes1 = PrimeNumberTable.until(11);
        const primes2 = PrimeNumberTable.until(12);
        expect(primes2).not.toBe(primes1);
    });
});
