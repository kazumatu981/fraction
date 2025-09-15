import { describe, test, expect } from '@jest/globals';
import { PrimeNumberTable } from '../../src/prime-number-table';

describe('PrimeNumberTableクラスの単体テスト', () => {
    test('10 までの素数を列挙', () => {
        const test = 10;
        const expected = [1, 2, 3, 5, 7];
        const table = PrimeNumberTable.getInstance(test);
        const actual = table.table;
        expect(actual).toEqual(expected);
    });
    test('11までの素数を列挙', () => {
        const test = 11;
        const expected = [1, 2, 3, 5, 7, 11];
        const table = PrimeNumberTable.getInstance(test);
        const actual = table.table;
        expect(actual).toEqual(expected);
    });
    test('テーブルが再生成されるか', () => {
        PrimeNumberTable.getInstance(10);
        const test = 11;
        const expected = [1, 2, 3, 5, 7, 11];
        const primeNumbers = PrimeNumberTable.getInstance(test);
        const actual = primeNumbers.table;
        expect(actual).toEqual(expected);
    });
    test('テーブルが再利用されるか', () => {
        const primeNumbers1 = PrimeNumberTable.getInstance(23);
        const expectedTable = primeNumbers1.table;
        const primeNumbers2 = PrimeNumberTable.getInstance(10);

        expect(primeNumbers1).toBe(primeNumbers2);
        expect(primeNumbers2.table).toBe(expectedTable);
    });
});
