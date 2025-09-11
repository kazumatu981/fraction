# Functions

- [isNonNegativeNumeric](#isnonnegativenumeric)
- [findPrimeNumbers](#findprimenumbers)
- [extractPrimeFactors](#extractprimefactors)
- [resolveGcd](#resolvegcd)

## isNonNegativeNumeric

正の整数かどうかを返却します。

| Function | Type |
| ---------- | ---------- |
| `isNonNegativeNumeric` | `(sourceNumber: number) => boolean` |

Parameters:

* `sourceNumber`: 対象の数


Returns:

正の整数かどうかを表すブール値

## findPrimeNumbers

maxNumberで指定した数までの素数を求める

| Function | Type |
| ---------- | ---------- |
| `findPrimeNumbers` | `(maxNumber: number) => number[]` |

Parameters:

* `maxNumber`: 素数を求める最大値


Returns:

発見した素数

## extractPrimeFactors

与えられた数を素因数分解をします。

| Function | Type |
| ---------- | ---------- |
| `extractPrimeFactors` | `(sourceNumber: number) => PrimeFactor[]` |

Parameters:

* `sourceNumber`: 分解対象の数


Returns:

素因数分解結果

## resolveGcd

2つの整数a, bの最大公約数を求める

| Function | Type |
| ---------- | ---------- |
| `resolveGcd` | `(a: number, b: number) => number` |

Parameters:

* `a`: 1つ目の整数
* `b`: 2つ目の整数


Returns:

2つの整数a, bの最大公約数


