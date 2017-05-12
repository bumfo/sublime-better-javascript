import { transpile } from 'parser.js'
System.customize('.mjs', void 0, transpile)
import { compile } from 'wasm.js'
System.customize('.wasm', compile)
