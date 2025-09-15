let __theInstance: PrimeNumberTable | null = null;

/**
 * 素数表を管理するクラス:
 * エラトステネスのふるい法を使って素数テーブルを構築します。
 */
export class PrimeNumberTable {
    private _maxValue: number = 0;
    private _table: number[] = [];

    private constructor(maxValue: number) {
        this._maxValue = maxValue;
        this._table = PrimeNumberTable._generateTable(maxValue);
    }

    public get table(): number[] {
        return this._table;
    }

    public until(maxValue: number): this {
        this._resetTable(maxValue);
        return this;
    }

    public isPrime(target: number) {
        if (target > this._maxValue) {
            this._resetTable(target);
        }
        return this._table.includes(target);
    }

    public static until(maxValue: number): PrimeNumberTable {
        if (__theInstance === null || __theInstance._maxValue < maxValue) {
            __theInstance = new PrimeNumberTable(maxValue);
        }
        return __theInstance;
    }

    public static dispose() {
        __theInstance = null;
    }

    private _resetTable(maxValue: number): void {
        this._maxValue = maxValue;
        this._table = PrimeNumberTable._generateTable(maxValue);
    }
    private static _generateTable(maxValue: number): number[] {
        const baseTable = Array.from({ length: maxValue + 1 }).map((_, i) => {
            return {
                number: i,
                isPrime: true,
            };
        });
        baseTable[0].isPrime = false;
        baseTable[1].isPrime = true;

        //エラトステネスのふるい本体
        for (let i = 2; i <= maxValue; i++) {
            if (baseTable[i].isPrime) {
                for (let j = 2; i * j <= maxValue; j++) {
                    baseTable[i * j].isPrime = false;
                }
            }
        }

        // 戻り値
        return baseTable.filter((item) => item.isPrime).map((item) => item.number);
    }
}
