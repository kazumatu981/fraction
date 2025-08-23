/**
 * 正の整数かどうかを返却します。
 * @param sourceNumber 対象の数
 * @returns 正の整数かどうかを表すブール値
 */
export function isNonNegativeNumeric(sourceNumber: number): boolean {
    return Number.isInteger(sourceNumber) && sourceNumber > 0;
}

/**
 * maxNumberで指定した数までの素数を求める
 * @param maxNumber 素数を求める最大値
 * @returns 発見した素数
 */
export function findPrimeNumbers(maxNumber: number): number[] {
    throw new Error('Not Implemented.');
}

/**
 * 素因数分解の要素
 */
export interface PrimeFactor {
    base: number; // 素因数（素数）
    exponent: number; // 指数（その素数が何回掛けられているか）
}

/**
 * 与えられた数を素因数分解をします。
 * @param sourceNumber 分解対象の数
 * @returns 素因数分解結果
 * @throws 負の数であった場合
 */
export function extractPrimeFactors(sourceNumber: number): PrimeFactor[] {
    throw new Error('Not Implemented');
}

/**
 * 2つの整数a, bの最大公約数を求める
 * @param a 1つ目の整数
 * @param b 2つ目の整数
 * @returns 2つの整数a, bの最大公約数
 */
export function resolveGcd(a: number, b: number): number {
    throw new Error('Not Implemented');
}
