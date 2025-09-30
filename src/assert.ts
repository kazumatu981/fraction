/**
 * 数値について、負の数かどうかを検査し、負の数であれば例外をスローする。
 * @param test テスト対象の数
 * @param appendix 追加メッセージ
 */
export function __mustNotBeNegative(test: number, appendix?: string) {
    if (test < 0) {
        const message = appendix
            ? `Number MUST NOT to be negative value: ${appendix}`
            : 'Number MUST NOT to be negative value';
        throw new Error(message);
    }
}

/**
 * 数値について、整数かどうかを検査し、整数でなければ例外をスローする。
 * @param test テスト対象の数
 * @param appendix 追加メッセージ
 */
export function __mustBeInteger(test: number, appendix?: string) {
    if (!Number.isInteger(test)) {
        const message = appendix
            ? `Number MUST be integer value: ${appendix}`
            : 'Number MUST be integer value';
        throw new Error(message);
    }
}

/**
 * 数値について、0かどうかを検査し、0であれば例外をスローする。
 * @param test テスト対象の数
 * @param appendix 追加メッセージ
 */
export function __mustNotBeZero(test: number, appendix?: string) {
    if (test === 0) {
        const message = appendix ? `Number MUST be zero: ${appendix}` : 'Number MUST be zero';
        throw new Error(message);
    }
}
