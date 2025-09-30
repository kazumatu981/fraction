import { expect, test } from '@jest/globals';
import { Fraction } from '../../src';

test('Fraction の組み合わせテスト: 分数の足し算', () => {
    const a = new Fraction(1, 2);
    const b = new Fraction(1, 3);
    const result = a.add(b);
    expect(result.numerator).toBe(5);
    expect(result.denominator).toBe(6);
});
test('Fraction の組み合わせテスト: 分数の引き算', () => {
    const a = new Fraction(1, 2);
    const b = new Fraction(1, 3);
    const result = a.subtract(b);
    expect(result.numerator).toBe(1);
    expect(result.denominator).toBe(6);
});

// ...
