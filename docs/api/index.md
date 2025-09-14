# 分数を表すクラスライブラリ

## 概要

### このプロジェクトの目的

このプロジェクトは、TypeScriptの基本的な文法や仕組み（例えばJavaScriptへトランスパイルして動かす流れ）を学びつつ、コードの整形や静的解析、テストフレームワークといった開発ツールの使い方を実際に体験するために作成しました。

### このプロジェクトの機能概要

このプロジェクトは、分数（たとえば 3/4 や -1/2）の扱いを簡単にするための小さなライブラリです。
Fraction クラスは分子・分母・符号を管理し、分数の足し算・引き算・掛け算・割り算や、分数を簡単にする（約分する）機能を手軽に使えるようにしています。
numerics.ts には、約分で使う最大公約数を求める関数や、素数を見つける・数を素因数に分けるといった補助的な処理が含まれており、学習やちょっとした計算の実装に役立ちます。

## ファイル一覧

| ファイル名                   | 概要                         |
| ---------------------------- | ---------------------------- |
| [numerics.ts](./numerics.md) | 正の整数を取り扱うライブラリ |
| [fraction.ts](./fraction.md) | 分数を表すライブラリ         |

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
    N_isNonNegativeNumeric["isNonNegativeNumeric<br/>正の整数か確認する"]
    N_findPrimeNumbers["findPrimeNumbers<br/>指定範囲の素数を列挙する"]
    N_extractPrimeFactors["extractPrimeFactors<br/>数を素因数分解する"]
    N_resolveGcd["resolveGcd<br/>最大公約数を求める"]
  end

  %% 想定される呼び出し関係（JSDoc/関数名から推定）
  F_Constructor --> F_setValue
  F_setValue --> F_simplify
  F_setValue --> N_isNonNegativeNumeric
  F_simplify --> N_resolveGcd

  F_add --> F_Constructor
  F_subtract --> F_Constructor
  F_multiply --> F_Constructor
  F_divide --> F_Constructor

  N_resolveGcd --> N_extractPrimeFactors
  N_resolveGcd --> N_isNonNegativeNumeric
  N_extractPrimeFactors --> N_findPrimeNumbers
  N_findPrimeNumbers --> N_isNonNegativeNumeric
  N_extractPrimeFactors --> N_isNonNegativeNumeric

  F_equals --> F_getters
  F_toString --> F_getters
```
