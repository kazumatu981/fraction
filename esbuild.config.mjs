const commonConfig = {
    entryPoints: ['src/index.ts'], // バンドルしたいライブラリのエントリポイント
    outbase: 'src',
    entryNames: '[dir]/fraction-bundle',
    bundle: true, // バンドルする
    logLevel: 'info',
};

export const buildConfig = {
    /**
     * 本番モード
     *  * ソース圧縮あり
     *  * ソースマップなし
     *  @type {import("esbuild").BuildOptions} */
    release: {
        ...commonConfig,
        ...{
            minify: true, // ソース圧縮あり
            sourcemap: false,
        },
    },
    /**
     * 本番(デバッグ)モード
     *  * ソース圧縮あり
     *  * ソースマップあり
     *  @type {import("esbuild").BuildOptions} */
    release_debug: {
        ...commonConfig,
        ...{
            minify: true, // ソース圧縮あり
            sourcemap: 'inline',
        },
    },
    /**
     * 開発モード
     *  * ソース圧縮なし
     *  * ソースマップあり
     *  @type {import("esbuild").BuildOptions} */
    develop: {
        ...commonConfig,
        ...{
            minify: false, // ソース圧縮なし
            sourcemap: 'inline',
        },
    },
};
