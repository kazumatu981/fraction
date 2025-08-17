import { resolveGcd } from './numerics';

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

    /**
     * 分数を表すクラスのコンストラクタ
     * @param numerator   分子
     * @param denominator 分母
     */
    public constructor(numerator: number, denominator: number) {
        this.setValue(numerator, denominator);
    }

    /**
     * 分子を取得
     * @returns 分子
     */
    public get numerator(): number {
        return this._numerator;
    }

    /**
     * 分母を取得
     * @returns 分母
     */
    public get denominator(): number {
        return this._denominator;
    }

    /**
     * その分数が負かどうかを取得
     * @returns その分数が負の場合はtrue
     */
    public get isNegative(): boolean {
        return this._isNegative;
    }

    public setValue(numerator: number, denominator: number) {
        if (denominator === 0) {
            throw new Error('分母は0にはなりません。');
        }

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
     * @param other 足し合わせる分数
     * @returns 足し合わせた結果
     */
    public add(other: Fraction): Fraction {
        // TODO: 足し算を実装する
        // (a, b) + (c, d) = (a*d + b*c, b*d)
        throw new Error('Method not implemented.');
    }

    /**
     * この分数からotherを引いた結果を返す
     * @param other 引く分数
     * @returns 引いた結果
     */
    public subtract(other: Fraction): Fraction {
        // TODO: 引き算を実装する
        // (a, b) - (c, d) = (a*d-b*c, b*d)
        throw new Error('Method not implemented.');
    }

    /**
     * この分数とotherを掛けた結果を返す
     * @param other 掛ける分数
     * @returns 掛けた結果
     */
    public multiply(other: Fraction): Fraction {
        // TODO: 掛け算を実装する
        // (a, b) * (c, d) = (a*c, b*d)
        throw new Error('Method not implemented.');
    }

    /**
     * 他の分数でこの分数を割った結果を返す
     * @param other 割る分数
     * @returns 割った結果
     */
    public divide(other: Fraction): Fraction {
        // TODO: 割り算を実装する
        // (a,b) / (c,d) = (a*d, b*c)
        // 例: (1,6) / (2,5) = (5, 12)
        throw new Error('Method not implemented.');
    }

    /**
     * 指定された分数がこの分数と等しいかどうかを判定します。
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
        // TODO: 約分を実装する
        // (a, b) = (a/gcd(a, b), b/gcd(a, b))
        // 例: (18, 24) = (18/6 , 24/6) = (3, 4)
        const gcd = resolveGcd(this.numerator, this.denominator);
        this._numerator /= gcd;
        this._denominator /= gcd;
    }
}
