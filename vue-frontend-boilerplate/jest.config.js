module.exports = {
  testEnvironment: "jsdom",
  moduleFileExtensions: ["js", "jsx", "json", "vue", "ts", "tsx"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  transform: {
    "^.+\\.vue$": "@vue/vue2-jest",
    "^.+\\.(ts|tsx)$": "ts-jest",
    "^.+\\.js$": "babel-jest",
  },
  testMatch: ["**/tests/**/*.spec.(ts|js)"],
};
