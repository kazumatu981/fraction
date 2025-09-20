import { __mustNotBeNegative, __mustBeInteger, __mustNotBeZero } from './assert';
let __theInstance: PrimeNumberTable | null = null;

type PrimeTableItem = {
    number: number;
    isPrime: boolean;
};

/**
 * 素数表を管理するクラス:
 * エラトステネスのふるい法を使って素数テーブルを構築します。
 */
export class PrimeNumberTable {
    private _table: PrimeTableItem[] = [];

    private constructor(maxValue: number) {
        this._resetTable(maxValue);
    }

    public get currentMaxValue(): number {
        return this._table.length - 1;
    }

    public until(maxValue: number): number[] {
        return this._resetTable(maxValue)
            ._table.filter((item) => item.isPrime && item.number <= maxValue)
            .map((item) => item.number);
    }

    public isPrime(target: number) {
        return this._resetTable(target)._table[target].isPrime;
    }

    public extendTo(maxValue: number): this {
        return this._resetTable(maxValue);
    }

    public static getTable(maxValue?: number): PrimeNumberTable {
        maxValue = maxValue ?? 100;
        __mustNotBeZero(maxValue);

        return (__theInstance = __theInstance
            ? __theInstance.extendTo(maxValue)
            : new PrimeNumberTable(maxValue));
    }

    public static isPrime(target: number): boolean {
        return PrimeNumberTable.getTable().isPrime(target);
    }

    public static until(maxValue: number): number[] {
        return PrimeNumberTable.getTable().until(maxValue);
    }

    public static dispose() {
        __theInstance = null;
    }

    private _resetTable(maxValue: number): this {
        __mustNotBeNegative(maxValue);
        __mustBeInteger(maxValue);

        if (this.currentMaxValue < maxValue) {
            this._table = PrimeNumberTable._generateTable(maxValue);
        }
        return this;
    }

    /**
     *
     * @param maxValue 最大値
     * @returns 素数の配列
     */
    protected static _generateTable(maxValue: number): PrimeTableItem[] {
        // 初期テーブルの作成
        const baseTable: Array<PrimeTableItem> = PrimeNumberTable._createInitialTable(maxValue);

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
    private static _createInitialTable(maxValue: number): Array<PrimeTableItem> {
        return Array.from({ length: maxValue + 1 }).map<PrimeTableItem>((_, i) => {
            return {
                number: i,
                isPrime: true,
            };
        });
    }
}
