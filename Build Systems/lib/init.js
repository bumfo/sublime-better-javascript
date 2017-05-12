import { transpile } from 'parser.js'
System.customize('.mjs', void 0, transpile)
System.customize('.wasm', async function(bytes, imports) {
  return await WebAssembly.compile(bytes).then(m => new WebAssembly.Instance(m, imports))
})
