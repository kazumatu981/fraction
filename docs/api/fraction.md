# Fraction

## Constructors

`public`: 分数を表すクラスのコンストラクタ

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

| Method | Type |
| ---------- | ---------- |
| `setValue` | `(numerator: number, denominator: number) => void` |

### add

この分数とotherを足し合わせた結果を返す

| Method | Type |
| ---------- | ---------- |
| `add` | `(other: Fraction) => Fraction` |

Parameters:

* `other`: 足し合わせる分数


Returns:

足し合わせた結果

### subtract

この分数からotherを引いた結果を返す

| Method | Type |
| ---------- | ---------- |
| `subtract` | `(other: Fraction) => Fraction` |

Parameters:

* `other`: 引く分数


Returns:

引いた結果

### multiply

この分数とotherを掛けた結果を返す

| Method | Type |
| ---------- | ---------- |
| `multiply` | `(other: Fraction) => Fraction` |

Parameters:

* `other`: 掛ける分数


Returns:

掛けた結果

### divide

他の分数でこの分数を割った結果を返す

| Method | Type |
| ---------- | ---------- |
| `divide` | `(other: Fraction) => Fraction` |

Parameters:

* `other`: 割る分数


Returns:

割った結果

### equals

指定された分数がこの分数と等しいかどうかを判定します。

| Method | Type |
| ---------- | ---------- |
| `equals` | `(other: Fraction) => boolean` |

Parameters:

* `other`: 比較する分数


Returns:

分数が等しい場合はtrue、それ以外の場合はfalse

### toString

分数を文字列形式で返します。

| Method | Type |
| ---------- | ---------- |
| `toString` | `() => string` |

Returns:

分数の文字列形式
