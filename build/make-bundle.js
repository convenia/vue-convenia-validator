const { promisify } = require('util')
const fs = require('fs')
const path = require('path')
const rollup = require('rollup')
const uglifyEs = require('uglify-es')

const readFile = promisify(fs.readFile)
const writeFile = promisify(fs.writeFile)

const packageName = "cee-validate"
const srcPath = path.join(__dirname, '..', 'src')
const compiledPath = path.join(__dirname, '..', "dist", "compiled")
const distNpmPath = path.join(__dirname, '..', "dist")

async function build () {
  let bundle = await rollup.rollup({
    input: path.join(compiledPath, 'index.js')
  })

  let { code } = await bundle.generate({
    format: 'cjs',
    sourcemap: false
  })

  let minified = uglifyEs.minify(code)
  if (minified.error) throw minified.error

  await writeFile(path.join(distNpmPath, `${packageName.min.js}`), minified.code)
  await writeFile(path.join(distNpmPath, `${packageName.d.js}`), await makeDefinitionsCode())
}

async function makeDefinitionsCode () {

}