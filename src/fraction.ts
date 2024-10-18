export class Fraction {
    /**
     * 分子
     */
    private _numerator: number;
    /**
     * 分母
     */
    private _denominator: number;

    /**
     * 分数を表すクラスのコンストラクタ
     * @param numerator   分子
     * @param denominator 分母
     */
    constructor(numerator: number, denominator: number) {
        this._numerator = numerator;
        this._denominator = denominator;

        if (denominator === 0) {
            throw new Error('分母は0にはなりません。');
        }

        // 約分します
        this.normnalize();
    }

    /**
     * この分数とotherを足し合わせた結果を返す
     * @param other 足し合わせる分数
     * @returns 足し合わせた結果
     */
    add(other: Fraction): Fraction {
        throw new Error('Method not implemented.');
    }

    /**
     * この分数からotherを引いた結果を返す
     * @param other 引く分数
     * @returns 引いた結果
     */
    subtract(other: Fraction): Fraction {
        throw new Error('Method not implemented.');
    }

    /**
     * この分数とotherを掛けた結果を返す
     * @param other 掛ける分数
     * @returns 掛けた結果
     */
    multiply(other: Fraction): Fraction {
        throw new Error('Method not implemented.');
    }

    /**
     * 他の分数でこの分数を割った結果を返す
     * @param other 割る分数
     * @returns 割った結果
     */
    divide(other: Fraction): Fraction {
        throw new Error('Method not implemented.');
    }

    /**
     * この分数を約分します。
     */
    normnalize(): void {
        throw new Error('Method not implemented.');
    }

    /**
     * 分子を取得
     * @returns 分子
     */
    get numerator(): number {
        return this._numerator;
    }

    /**
     * 分母を取得
     * @returns 分母
     */
    get denominator(): number {
        return this._denominator;
    }
}
