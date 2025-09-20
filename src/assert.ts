export function __mustNotBeNegative(test: number, appendix?: string) {
    if (test < 0) {
        const message = appendix
            ? `Number MUST NOT to be negative value: ${appendix}`
            : 'Number MUST NOT to be negative value';
        throw new Error(message);
    }
}

export function __mustBeInteger(test: number, appendix?: string) {
    if (!Number.isInteger(test)) {
        const message = appendix
            ? `Number MUST be integer value: ${appendix}`
            : 'Number MUST be integer value';
        throw new Error(message);
    }
}

export function __mustNotBeZero(test: number, appendix?: string) {
    if (test === 0) {
        const message = appendix ? `Number MUST be zero: ${appendix}` : 'Number MUST be zero';
        throw new Error(message);
    }
}
