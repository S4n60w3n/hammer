module.exports = {
  transform: {
    '^.+\\.tsx?$': 'ts-jest'
  },
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$',
  roots: [
    '.',
    'src'
  ],
  moduleDirectories: [
    'node_modules',
    'src'
  ],
  moduleNameMapper: {
  },
  moduleFileExtensions: [
    'ts',
    'tsx',
    'js',
    'jsx',
    'json'
  ]
};