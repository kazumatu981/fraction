# PrimeNumberTable

素数表を管理するクラス:
エラトステネスのふるい法を使って素数テーブルの管理クラス。

Examples:

```ts
const primeTable = PrimeNumberTable.getTable();
console.log(primeTable.until(30)); // [1, 2, 3, 5, 7, 11, 13, 17, 19, 23, 29]
console.log(primeTable.isPrime(29)); // true
console.log(primeTable.isPrime(30)); // false
```


## Static Methods

- [getTable](#gettable)
- [isPrime](#isprime)
- [until](#until)
- [dispose](#dispose)

### getTable

素数テーブルのインスタンスを取得する。
すでにインスタンスが存在する場合は、そのインスタンスを返す。
存在しない場合は、新たにインスタンスを生成して返す。

| Method | Type |
| ---------- | ---------- |
| `getTable` | `(maxValue?: number or undefined) => PrimeNumberTable` |

Parameters:

* `maxValue`: 最大値。省略した場合は100が指定されたものとみなす。


### isPrime

指定された数が素数かどうかを判定する。

| Method | Type |
| ---------- | ---------- |
| `isPrime` | `(target: number) => boolean` |

Parameters:

* `target`: 判定対象の数


Returns:

素数であればtrue、そうでなければfalse

### until

maxValue以下の素数を列挙する。

| Method | Type |
| ---------- | ---------- |
| `until` | `(maxValue: number) => number[]` |

Parameters:

* `maxValue`: 最大値


Returns:

maxValue以下の素数の配列

### dispose

素数テーブルを破棄する。

| Method | Type |
| ---------- | ---------- |
| `dispose` | `() => void` |

## Methods

- [until](#until)
- [isPrime](#isprime)

### until

指定された値までの素数を配列で返す。

| Method | Type |
| ---------- | ---------- |
| `until` | `(maxValue: number) => number[]` |

Parameters:

* `maxValue`: 最大値


Returns:

素数の配列

### isPrime

素数かどうかを判定する。

| Method | Type |
| ---------- | ---------- |
| `isPrime` | `(target: number) => boolean` |

Parameters:

* `target`: 判定対象の数


Returns:

素数であればtrue、そうでなければfalse
