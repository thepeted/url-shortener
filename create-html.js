'use strict'
const fs = require('fs')
const showdown = require('showdown')

module.exports = function createHtml() {
  const converter = new showdown.Converter()
  const md = fs.readFileSync('./README.md', 'utf-8')
  return converter.makeHtml(md)
}