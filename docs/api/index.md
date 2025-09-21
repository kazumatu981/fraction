# 分数を表すクラスライブラリ

## 概要

### このプロジェクトの目的

このプロジェクトは、TypeScriptの基本的な文法や仕組み（例えばJavaScriptへトランスパイルして動かす流れ）を学びつつ、コードの整形や静的解析、テストフレームワークといった開発ツールの使い方を実際に体験するために作成しました。

### このプロジェクトの機能概要

#### `fraction.ts` は分数を表すクラスを宣言する(メイン機能)

このプロジェクトは、分数（たとえば 3/4 や -1/2）の扱いを簡単にするための小さなライブラリです。想定される使い方を以下に示します。

```ts
// １つ目の分数
const fraction1 = new Fraction(1, 3);
// ２つ目の分数
const fraction2 = new Fraction(1, 2);

// 足し算をする
const result = fraction1.add(fraction2);

console.log(`分子: ${result.numerator}`); // 分子: 5
console.log(`分母: ${result.denominator}`); // 分母: 6
```

このように、`Fraction` クラス( `fraction.ts` )は分子・分母・符号を管理し、分数の足し算・引き算・掛け算・割り算や、分数を簡単にする（約分する）機能があります。

#### `numerics.ts` は正の整数を取り扱うためのライブラリ(補助機能)

分数の四則演算は想像以上に大変で、通分や約分ができるようになる必要があって、そのためには、最大公約数や最大公倍数を計算できるようになる必要があります。
このれらの機能を実現するために、`numerics.ts`があります。 には、約分で使う最大公約数を求める関数や、素数を見つける・数を素因数に分けるといった補助的な処理が含まれいます。

`numerics.ts`の主な使い方を以下に示します。

```ts
// 10までの素数を列挙します
const primes = findPrimeNumbers(10);
console.log(primes); // [1, 2, 3, 5, 7]

// 28を素因数分解します
const fragments = extractPrimeFactors(28);
console.log(fragments);
// [
//    { base: 2, exponent: 2 },
//    { base: 7, exponent: 1 }
// ]

// 最大公約数を求める
const gcd = resolveGcd(28, 6);
console.log(gcd); // 2

// 最小公倍数を求める
const lcm = resolveGcd(28, 6);
console.log(lcm); // 84
```

#### 最もディープな素数判定ライブラリ `prime-number-table.ts`

素数に関する機能を集約したのが、`pri`
与えられた数が素数であるかどうか、

## ファイル一覧

| ファイル名                   | 概要                           |
| ---------------------------- | ------------------------------ |
| [numerics.ts](./numerics.md) | 正の整数を取り扱うライブラリ   |
| [fraction.ts](./fraction.md) | 分数を表すライブラリ           |
| prime-number-table.ts        | 素数判定テーブル管理ライブラリ |

## コールグラフ

```mermaid
graph
  %% Fraction クラス側
  subgraph Fraction
    F_Constructor["Fraction.constructor<br/>分数オブジェクトのインスタンス生成"]
    F_setValue["Fraction.setValue<br/>分子と分母を設定し正規化する"]
    F_simplify["Fraction.simplify<br/>分数を約分する"]
    F_add["Fraction.add<br/>他の分数と加算する"]
    F_subtract["Fraction.subtract<br/>他の分数を引く"]
    F_multiply["Fraction.multiply<br/>他の分数と掛ける"]
    F_divide["Fraction.divide<br/>他の分数で割る（逆数を掛ける）"]
    F_equals["Fraction.equals<br/>等価性を判定する"]
    F_toString["Fraction.toString<br/>文字列に変換する"]
    F_getters["getters (numerator / denominator / isNegative)<br/>分子・分母・符号を取得する"]
  end

  %% numerics.ts 側
  subgraph Numerics
    N_findPrimeNumbers["findPrimeNumbers<br/>指定範囲の素数を列挙する"]
    N_extractPrimeFactors["extractPrimeFactors<br/>数を素因数分解する"]
    N_resolveGcd["resolveGcd<br/>最大公約数を求める"]
    N_resolveLcm["resolveLcm<br />最小公倍数を求める"]
  end

  %% PrimeNumberTable クラス側
  subgraph PrimeNumberTable
    PNT_getTable["PrimeNumberTable.getTable<br/>インスタンスを取得する"]
    PNT_isPrime["PrimeNumberTable.isPrime<br/>素数かどうかを判定する(static)"]
    PNT_until["PrimeNumberTable.until<br/>指定された数までの素数を列挙する(static)"]
    PNT_dispose["PrimeNumberTable.dispose<br/>インスタンスを破棄する"]
    PNT_until_instance["PrimeNumberTable.until<br/>指定された数までの素数を列挙する"]
    PNT_isPrime_instance["PrimeNumberTable.isPrime<br/>素数かどうかを判定する"]
  end

  %% 想定される呼び出し関係（JSDoc/関数名から推定）
  F_Constructor --> F_setValue
  F_setValue --> F_simplify
  F_simplify --> N_resolveGcd
  F_add --> N_resolveLcm
  F_subtract --> N_resolveLcm

  F_add --> F_Constructor
  F_subtract --> F_Constructor
  F_multiply --> F_Constructor
  F_divide --> F_Constructor

  N_resolveGcd --> N_extractPrimeFactors
  N_resolveLcm --> N_extractPrimeFactors
  N_extractPrimeFactors --> N_findPrimeNumbers
  N_findPrimeNumbers --> PNT_until
  F_equals --> F_getters
  F_toString --> F_getters

  PNT_getTable --> PNT_until_instance
  PNT_getTable --> PNT_isPrime_instance
  PNT_isPrime --> PNT_getTable
  PNT_until --> PNT_getTable

```
