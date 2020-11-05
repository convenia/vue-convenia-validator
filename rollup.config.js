import typescript from 'rollup-plugin-typescript2'
import commonjs from 'rollup-plugin-commonjs'
import resolve from 'rollup-plugin-node-resolve'
import sourceMaps from 'rollup-plugin-sourcemaps'

import pkg from './package.json'

export default {
  input: 'src/index.ts',
  output:
    [{ file: pkg.main
     , name: pkg.main
     , sourcemap: true
     , format: 'umd'
     },
     { file: pkg.module
      , sourcemap: true
     , format: 'es'
    }],

  external:
    [ ...Object.keys(pkg.dependencies || {})
    , ...Object.keys(pkg.peerDependencies || {})
    ],

  plugins:
    [ typescript({ useTsconfigDeclarationDir: true })
    , commonjs()
    , resolve()
    , sourceMaps()
    ]
}