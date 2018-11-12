import typescript from 'rollup-plugin-typescript2'

import package from './package.json'

export default {
  input: 'src/index.ts',
  output:
    [{ file: package.main
     , sourcemap: true
     , format: 'cjs'
     },
     { file: package.module
     , sourcemap: true
     , format: 'es'
    }],

  external:
    [ ...Object.keys(package.dependencies || {})
    , ...Object.keys(package.peerDependencies || {})
    ],

  plugins:
    [ typescript({ typescript: require('typescript') })
    ]
}