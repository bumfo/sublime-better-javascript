export function compile(source, imports) {
  var bytes = new Uint8Array(source.length)
  for (var i = 0; i < source.length; ++i) {
    bytes[i] = source.charCodeAt(i)
  }
  return new Promise(function(done) {
    WebAssembly.compile(bytes).then(m => done(new WebAssembly.Instance(m, imports).exports))
  })
}
