/* eslint-disable max-lines-per-function */

import { expect, test } from '@jest/globals';
import { Fraction } from '../../src';

// TODO skipを外すとテストが実行されますが、無限ループになります。

test.skip('Fraction の組み合わせテスト: 分数の足し算', () => {
    const a = new Fraction(1, 2);
    const b = new Fraction(1, 3);
    const result = a.add(b);
    expect(result.numerator).toBe(5);
    expect(result.denominator).toBe(6);
});
test.skip('Fraction の組み合わせテスト: 分数の引き算', () => {
    const a = new Fraction(1, 2);
    const b = new Fraction(1, 3);
    const result = a.subtract(b);
    expect(result.numerator).toBe(1);
    expect(result.denominator).toBe(6);
});

// ...
