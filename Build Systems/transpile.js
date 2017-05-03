var fn = process.argv[2]

var path = require('path')
var fs = require('fs')
var s = fs.readFileSync(fn, 'utf-8')

// var shebang = s.match(/^#!\/.*\b(jsn)\n/)
// if (!shebang)
  // throw new Error('Not supported')

// s = s.substr(shebang[0].length)

if (path.extname(fn) !== '.mjs')
  throw new Error('Not supported extname')


var { transpile } = require('./parser.js')

output(transpile(s))


function output(s) {
  var fbn = path.basename(fn, path.extname(fn))

  if (fn === fbn)
    throw new Error()

  var wn = path.dirname(fn) + '/' + fbn + '.js'
  console.log(wn)
  fs.writeFileSync(wn, s)
  // fs.writeFileSync(wn, '#!/usr/bin/env js\n' + s)
}
