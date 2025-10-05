import { __mustBeInteger, __mustNotBeNegative, __mustNotBeZero } from './assert';
import { resolveGcd, resolveLcm } from './numerics';

export class Fraction {
    // #region プライベート変数
    /**
     * 分子
     */
    private _numerator: number = 0;
    /**
     * 分母
     */
    private _denominator: number = 1;
    /**
     * その分数が負かどうかを表すフラグ
     */
    private _isNegative: boolean = false;
    // #endregion

    // LEARN [SPF004][チャレンジ課題]: 小数→分数をできるようにしよう
    /**
     * 分数を表すクラス:
     * 分子と分母を整数で表します。
     *
     * @example
     * ```ts
     * const frac1 = new Fraction(1, 2); // 1/2
     * const frac2 = new Fraction(-3, 4); // -3/4
     * const frac3 = new Fraction(5, -6); // -5/6
     * const frac4 = new Fraction(-7, -8); // 7/8
     * console.log(frac1.toString()); // "1/2"
     * ```
     *
     * @param numerator   分子
     * @param denominator 分母
     */
    public constructor(numerator: number, denominator: number) {
        this.setValue(numerator, denominator);
    }

    /**
     * 分子を取得
     *
     * @example
     * ```ts
     * const frac = new Fraction(3, 4);
     * console.log(frac.numerator); // 3
     * console.log(frac.denominator); // 4
     * ```
     *
     * @returns 分子
     */
    public get numerator(): number {
        return this._numerator;
    }

    /**
     * 分母を取得
     *
     * @example
     * ```ts
     * const frac = new Fraction(3, 4);
     * console.log(frac.numerator); // 3
     * console.log(frac.denominator); // 4
     * ```
     *
     * @returns 分母
     */
    public get denominator(): number {
        return this._denominator;
    }

    /**
     * その分数が負かどうかを取得
     *
     * @example
     * ```ts
     * const frac1 = new Fraction(1, 2);
     * console.log(frac1.isNegative); // false
     * const frac2 = new Fraction(-3, 4);
     * console.log(frac2.isNegative); // true
     * const frac3 = new Fraction(5, -6);
     * console.log(frac3.isNegative); // true
     * const frac4 = new Fraction(-7, -8);
     * console.log(frac4.isNegative); // false
     * ```
     *
     * @returns その分数が負の場合はtrue
     */
    public get isNegative(): boolean {
        return this._isNegative;
    }

    /**
     * 分子と分母を設定します。
     *
     * @param numerator 分子
     * @param denominator 分母
     *
     *  @example
     * ```ts
     * const frac = new Fraction(1, 2);
     * console.log(frac.toString()); // "1/2"
     * frac.setValue(3, 4);
     * console.log(frac.toString()); // "3/4"
     * frac.setValue(-5, 6);
     * console.log(frac.toString()); // "-5/6"
     * ```
     *
     * @throws numeratorまたはdenominatorが整数でない場合、またはdenominatorが0の場合はエラーを投げる。
     *
     * @remarks
     * numeratorは整数でなければならない。
     * denominatorは0であってはならない。
     */
    public setValue(numerator: number, denominator: number) {
        __mustBeInteger(numerator, 'numerator');
        __mustBeInteger(denominator, 'denominator');
        __mustNotBeZero(denominator, 'denominator');

        if (numerator === 0) {
            this._isNegative = false;
            this._numerator = 0;
            this._denominator = 1;
            return;
        }

        this._isNegative = numerator * denominator < 0;

        this._numerator = numerator < 0 ? -numerator : numerator;
        this._denominator = denominator < 0 ? -denominator : denominator;
        this.simplify();
    }

    /**
     * この分数とotherを足し合わせた結果を返す
     *
     * @example
     * ```ts
     * const frac1 = new Fraction(1, 2);
     * const frac2 = new Fraction(1, 3);
     * const result = frac1.add(frac2);
     * console.log(result.toString()); // "5/6"
     * ```
     *
     * @param other 足し合わせる分数
     * @returns 足し合わせた結果
     */
    public add(other: Fraction): Fraction {
        // LEARN [SPF003][チャレンジ課題]: 関数のオーバライド

        // (a, b) + (c, d) = (a*d + b*c, b*d)

        const lcm = resolveLcm(this.denominator, other.denominator);
        const a = (lcm / this.denominator) * this.numerator * (this.isNegative ? -1 : 1);
        const b = (lcm / other.denominator) * other.numerator * (other.isNegative ? -1 : 1);
        const numerator = a + b;
        const denominator = lcm;
        return new Fraction(numerator, denominator);
    }

    /**
     * この分数からotherを引いた結果を返す
     *
     * @example
     * ```ts
     * const frac1 = new Fraction(3, 4);
     * const frac2 = new Fraction(1, 2);
     * const result = frac1.subtract(frac2);
     * console.log(result.toString()); // "1/4"
     * ```
     *
     * @param other 引く分数
     * @returns 引いた結果
     */
    public subtract(other: Fraction): Fraction {
        // LEARN [SPF003][チャレンジ課題]: 関数のオーバライド
        // (a, b) - (c, d) = (a*d-b*c, b*d)
        const lcm = resolveLcm(this.denominator, other.denominator);
        const a = (lcm / this.denominator) * this.numerator * (this.isNegative ? -1 : 1);
        const b = (lcm / other.denominator) * other.numerator * (other.isNegative ? -1 : 1);
        const numerator = a - b;
        const denominator = lcm;
        return new Fraction(numerator, denominator);
    }

    /**
     * この分数とotherを掛けた結果を返す
     *
     * @example
     * ```ts
     * const frac1 = new Fraction(1, 2);
     * const frac2 = new Fraction(2, 3);
     * const result = frac1.multiply(frac2);
     * console.log(result.toString()); // "1/3"
     * ```
     *
     * @param other 掛ける分数
     * @returns 掛けた結果
     */
    public multiply(other: Fraction): Fraction {
        // LEARN [SPF002] `add`/`subtract`/`multiply`/`divide`の実装を完成させよう
        // (a, b) * (c, d) = (a*c, b*d)
        const numerator =
            this.numerator * other.numerator * (this.isNegative !== other.isNegative ? -1 : 1);
        const denominator = this.denominator * other.denominator;
        return new Fraction(numerator, denominator);
    }

    /**
     * 他の分数でこの分数を割った結果を返す
     *
     * @example
     * ```ts
     * const frac1 = new Fraction(1, 2);
     * const frac2 = new Fraction(2, 5);
     * const result = frac1.divide(frac2);
     * console.log(result.toString()); // "5/4"
     * ```
     *
     * @param other 割る分数
     * @returns 割った結果
     *
     * @throws otherが0の場合はエラーが発生する。
     */
    public divide(other: Fraction): Fraction {
        // LEARN [SPF003][チャレンジ課題]: 関数のオーバライド
        // (a,b) / (c,d) = (a*d, b*c)
        __mustNotBeZero(other.numerator, '0で割ることはできません');

        const numerator =
            this.numerator * other.denominator * (this.isNegative !== other.isNegative ? -1 : 1);
        const denominator = this.denominator * other.numerator;
        return new Fraction(numerator, denominator);
    }

    /**
     * 指定された分数がこの分数と等しいかどうかを判定します。
     *
     * @example
     * ```ts
     * const frac1 = new Fraction(1, 2);
     * const frac2 = new Fraction(2, 4);
     * console.log(frac1.equals(frac2)); // true
     * const frac3 = new Fraction(3, 4);
     * console.log(frac1.equals(frac3)); // false
     * ```
     *
     * @param other 比較する分数
     * @returns 分数が等しい場合はtrue、それ以外の場合はfalse
     */
    public equals(other: Fraction): boolean {
        return (
            this.isNegative === other.isNegative &&
            this.numerator === other.numerator &&
            this.denominator === other.denominator
        );
    }
    /**
     * 分数を文字列形式で返します。
     * @returns 分数の文字列形式
     */
    public toString(): string {
        return `${this.isNegative ? '-' : ''}${this.numerator}/${this.denominator}`;
    }

    /**
     * この分数を約分します。
     */
    protected simplify(): void {
        const gcd = resolveGcd(this.numerator, this.denominator);
        this._numerator = this.numerator / gcd;
        this._denominator = this.denominator / gcd;
    }
}
