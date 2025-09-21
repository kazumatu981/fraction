import { __mustNotBeNegative, __mustBeInteger, __mustNotBeZero } from './assert';
let __theInstance: PrimeNumberTable | null = null;

type PrimeTableItem = {
    number: number;
    isPrime: boolean;
};

/**
 * 素数表を管理するクラス:
 * エラトステネスのふるい法を使って素数テーブルの管理クラス。
 * @example
 * ```ts
 * const primeTable = PrimeNumberTable.getTable();
 * console.log(primeTable.until(30)); // [1, 2, 3, 5, 7, 11, 13, 17, 19, 23, 29]
 * console.log(primeTable.isPrime(29)); // true
 * console.log(primeTable.isPrime(30)); // false
 * ```
 */
export class PrimeNumberTable {
    // #region Local Fields
    private _table: PrimeTableItem[] = [];
    // #endregion Local Fields

    // #region Constructors
    private constructor(maxValue: number) {
        this._resetTable(maxValue);
    }
    // #endregion Constructors

    // #region Public Methods
    /**
     * 指定された値までの素数を配列で返す。
     * @param maxValue 最大値
     * @returns 素数の配列
     * @throws maxValueが負の数または整数でない場合、または0の場合はエラーを投げる。
     * @remarks
     * maxValueは1以上の整数でなければならない。
     * maxValueが現在のテーブルの最大値より大きい場合は、テーブルを拡張する。
     */
    public until(maxValue: number): number[] {
        __mustNotBeNegative(maxValue);
        __mustBeInteger(maxValue);
        __mustNotBeZero(maxValue);

        return this._resetTable(maxValue)
            ._table.filter((item) => item.isPrime && item.number <= maxValue)
            .map((item) => item.number);
    }

    /**
     * 素数かどうかを判定する。
     * @param target 判定対象の数
     * @returns 素数であればtrue、そうでなければfalse
     * @throws targetが負の数または整数でない場合はエラーを投げる。
     * @remarks
     * targetが現在のテーブルの最大値より大きい場合は、テーブルを拡張する。
     */
    public isPrime(target: number) {
        __mustNotBeNegative(target);
        __mustBeInteger(target);
        return this._resetTable(target)._table[target].isPrime;
    }
    // #endregion Public Methods

    // #region Public Static Methods
    /**
     * 素数テーブルのインスタンスを取得する。
     * すでにインスタンスが存在する場合は、そのインスタンスを返す。
     * 存在しない場合は、新たにインスタンスを生成して返す。
     * @param maxValue 最大値。省略した場合は100が指定されたものとみなす。
     * @return 素数テーブルのインスタンス
     * @throws maxValueが0以下の場合はエラーを投げる。
     * @remarks
     * maxValueは1以上の整数でなければならない。
     * maxValueが現在のテーブルの最大値より大きい場合は、テーブルを拡張する。
     */
    public static getTable(maxValue?: number): PrimeNumberTable {
        maxValue = maxValue ?? 100;
        __mustNotBeNegative(maxValue);
        __mustBeInteger(maxValue);
        __mustNotBeZero(maxValue);

        return (__theInstance = __theInstance
            ? __theInstance._resetTable(maxValue)
            : new PrimeNumberTable(maxValue));
    }

    /**
     * 指定された数が素数かどうかを判定する。
     * @param target 判定対象の数
     * @returns 素数であればtrue、そうでなければfalse
     */
    public static isPrime(target: number): boolean {
        __mustNotBeNegative(target);
        __mustBeInteger(target);

        return PrimeNumberTable.getTable().isPrime(target);
    }

    /**
     * maxValue以下の素数を列挙する。
     * @param maxValue 最大値
     * @returns maxValue以下の素数の配列
     */
    public static until(maxValue: number): number[] {
        __mustNotBeNegative(maxValue);
        __mustBeInteger(maxValue);
        __mustNotBeZero(maxValue);

        return PrimeNumberTable.getTable().until(maxValue);
    }

    /**
     * 素数テーブルを破棄する。
     */
    public static dispose() {
        __theInstance = null;
    }
    // #endregion Public Static Methods

    // #region Private Properties
    private get _currentMaxValue(): number {
        return this._table.length - 1;
    }
    // #endregion Private Properties

    // #region Private Methods
    private _resetTable(maxValue: number): this {
        if (this._currentMaxValue < maxValue) {
            this._table = _generateTable(maxValue);
        }
        return this;
    }
    // #endregion Private Methods
}

/**
 * 素数テーブルを生成する。
 * エラトステネスのふるい法を使って素数テーブルを構築します。
 * @param maxValue 最大値
 * @returns 素数の配列
 */
function _generateTable(maxValue: number): PrimeTableItem[] {
    __mustNotBeNegative(maxValue);
    __mustBeInteger(maxValue);
    __mustNotBeZero(maxValue);

    // 初期テーブルの作成
    const baseTable: Array<PrimeTableItem> = _createInitialTable(maxValue);

    // 0は素数ではない
    baseTable[0].isPrime = false;
    // 1は素数とする
    baseTable[1].isPrime = true;

    //エラトステネスのふるい本体
    for (let i = 2; i <= maxValue; i++) {
        // まだ素数というフラグがついているものについて
        if (baseTable[i].isPrime) {
            // その倍数を素数ではないのでフラグを落とす
            for (let j = 2; i * j <= maxValue; j++) {
                baseTable[i * j].isPrime = false;
            }
        }
    }

    // 戻り値
    return baseTable;
}

/**
 * 素数テーブルの初期化を行う。
 * 初期状態はすべて素数としておく。
 * @param maxValue 最大値
 * @returns 初期化された素数テーブル
 */
function _createInitialTable(maxValue: number): Array<PrimeTableItem> {
    return Array.from({ length: maxValue + 1 }).map<PrimeTableItem>((_, i) => {
        return {
            number: i,
            isPrime: true,
        };
    });
}
