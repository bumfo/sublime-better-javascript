const { System } = require('./import.js')
const path = require('path')

System.import('init_mjs.js').then(function() {
  System.root(process.cwd())
  System.import(path.relative(process.cwd(), process.argv[2]))
})

