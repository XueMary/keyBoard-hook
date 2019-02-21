
import buble from 'rollup-plugin-buble'; // Transpile/polyfill with reasonable browser support
import {uglify} from 'rollup-plugin-uglify';

export default {
    input: 'test/src/keyBoard-hook.js', // Path relative to package.json
    output: {
        name: 'index',
        exports: 'named',
    },
    plugins: [
        buble({
            exclude: 'node_modules/**',
        }),
        uglify()
    ],
};