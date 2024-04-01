module.exports = {
  // Indica onde o Jest deve buscar os arquivos de teste
  roots: ['<rootDir>/src/tests'],

  // Indica quais extensões Jest deve considerar ao procurar arquivos de teste
  testMatch: ['**/__tests__/**/*.+(ts|tsx|js)', '**/?(*.)+(spec|test).+(ts|tsx|js)'],

  // Indica qual ambiente de teste o Jest deve usar
  testEnvironment: 'node',

  // Indica quais módulos Jest deve transformar
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },

  // Indica quais módulos Jest deve ignorar ao transformar
  transformIgnorePatterns: ['/node_modules/'],

  // Indica se cada teste individual deve ser relatado durante a execução
  verbose: true,
};