# Functions

- [findPrimeNumbers](#findprimenumbers)
- [extractPrimeFactors](#extractprimefactors)
- [resolveGcd](#resolvegcd)
- [resolveLcm](#resolvelcm)

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

## resolveLcm

2つの整数a, bの最小公倍数

| Function | Type |
| ---------- | ---------- |
| `resolveLcm` | `(a: number, b: number) => number` |

Parameters:

* `a`: 1つ目の整数
* `b`: 2つ目の整数


Returns:

2つの整数a, bの最小公倍数


