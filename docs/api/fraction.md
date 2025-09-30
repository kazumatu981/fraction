# Fraction

## Constructors

`public`: 分数を表すクラス:
分子と分母を整数で表します。

Parameters:

* `numerator`: 分子
* `denominator`: 分母


## Methods

- [setValue](#setvalue)
- [add](#add)
- [subtract](#subtract)
- [multiply](#multiply)
- [divide](#divide)
- [equals](#equals)
- [toString](#tostring)

### setValue

分子と分母を設定します。

| Method | Type |
| ---------- | ---------- |
| `setValue` | `(numerator: number, denominator: number) => void` |

Parameters:

* `numerator`: 分子
* `denominator`: 分母


Examples:

```ts
const frac = new Fraction(1, 2);
console.log(frac.toString()); // "1/2"
frac.setValue(3, 4);
console.log(frac.toString()); // "3/4"
frac.setValue(-5, 6);
console.log(frac.toString()); // "-5/6"
```


### add

この分数とotherを足し合わせた結果を返す

| Method | Type |
| ---------- | ---------- |
| `add` | `(other: Fraction) => Fraction` |

Parameters:

* `other`: 足し合わせる分数


Returns:

足し合わせた結果

Examples:

```ts
const frac1 = new Fraction(1, 2);
const frac2 = new Fraction(1, 3);
const result = frac1.add(frac2);
console.log(result.toString()); // "5/6"
```


### subtract

この分数からotherを引いた結果を返す

| Method | Type |
| ---------- | ---------- |
| `subtract` | `(other: Fraction) => Fraction` |

Parameters:

* `other`: 引く分数


Returns:

引いた結果

Examples:

```ts
const frac1 = new Fraction(3, 4);
const frac2 = new Fraction(1, 2);
const result = frac1.subtract(frac2);
console.log(result.toString()); // "1/4"
```


### multiply

この分数とotherを掛けた結果を返す

| Method | Type |
| ---------- | ---------- |
| `multiply` | `(other: Fraction) => Fraction` |

Parameters:

* `other`: 掛ける分数


Returns:

掛けた結果

Examples:

```ts
const frac1 = new Fraction(1, 2);
const frac2 = new Fraction(2, 3);
const result = frac1.multiply(frac2);
console.log(result.toString()); // "1/3"
```


### divide

他の分数でこの分数を割った結果を返す

| Method | Type |
| ---------- | ---------- |
| `divide` | `(other: Fraction) => Fraction` |

Parameters:

* `other`: 割る分数


Returns:

割った結果

Examples:

```ts
const frac1 = new Fraction(1, 2);
const frac2 = new Fraction(2, 5);
const result = frac1.divide(frac2);
console.log(result.toString()); // "5/4"
```


### equals

指定された分数がこの分数と等しいかどうかを判定します。

| Method | Type |
| ---------- | ---------- |
| `equals` | `(other: Fraction) => boolean` |

Parameters:

* `other`: 比較する分数


Returns:

分数が等しい場合はtrue、それ以外の場合はfalse

Examples:

```ts
const frac1 = new Fraction(1, 2);
const frac2 = new Fraction(2, 4);
console.log(frac1.equals(frac2)); // true
const frac3 = new Fraction(3, 4);
console.log(frac1.equals(frac3)); // false
```


### toString

分数を文字列形式で返します。

| Method | Type |
| ---------- | ---------- |
| `toString` | `() => string` |

Returns:

分数の文字列形式
