module.exports = {
  roots: ['<rootDir>/tests'],
  testMatch: ['**/*.spec.ts', '**/*.test.ts'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  testEnvironment: 'node', // テスト環境。ブラウザ環境でテストしたい場合は`jsdom`を設定する
}
