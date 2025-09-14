let __theInstance: PrimeNumberTable | null = null;

/**
 * 素数表を管理するクラス:
 * エラトステネスのふるい法を使って素数テーブルを構築します。
 */
export class PrimeNumberTable {
    public readonly maxValue: number;
    public readonly table: number[];
    private constructor(maxValue: number) {
        this.maxValue = maxValue;
        this.table = PrimeNumberTable._generateTable(maxValue);
    }

    public static getInstance(maxValue: number): PrimeNumberTable {
        if (__theInstance === null || __theInstance.maxValue > maxValue) {
            __theInstance = new PrimeNumberTable(maxValue);
        }
        return __theInstance;
    }

    private static _generateTable(maxValue: number): number[] {
        const baseTable = Array.from({ length: maxValue }).map((_, idx) => {
            return {
                number: idx + 1,
                isPrime: true,
            };
        });
    }
}
