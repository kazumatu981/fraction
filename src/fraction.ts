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
    }
}