module.exports = {
  preset: 'ts-jest',
  testURL: 'http://localhost',
  transform: { '.*\\.(vue)$': 'vue-jest', '.(ts|tsx)': 'ts-jest' },
  moduleFileExtensions: [ 'ts', 'js', 'vue' ],
  verbose: true,
  globals: {
    'ts-jest': {
      isolatedModules: true,
      diagnostics: { warnOnly: true }
    }
  }
}
