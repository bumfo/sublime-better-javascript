const { System } = require('./import.js')
const path = require('path')

System.import('init.js').then(function() {
  System.root(process.cwd())
  System.import(path.relative(process.cwd(), process.argv[2]))
})
