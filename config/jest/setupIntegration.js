module.exports = {
    collectCoverageFrom: [
      "src/**/*.{js,jsx,ts,tsx}",
      "!src/**/*.d.ts"
    ],
    moduleFileExtensions: [
      "web.js",
      "js",
      "web.ts",
      "ts",
      "web.tsx",
      "tsx",
      "json",
      "web.jsx",
      "jsx",
      "node"
    ],
    moduleNameMapper: {
      "react-native$": "react-native-web",
      ".+\\.module\\.(css|sass|scss)$": "identity-obj-proxy"
    },
    modulePaths: [
      "<rootDir>/src"
    ],
    rootDir: "../../",
    roots: [
      "<rootDir>/src"
    ],
    setupFiles: [
      "react-app-polyfill/jsdom"
    ],
    setupFilesAfterEnv: [
      "<rootDir>/config/jest/setupFilesAfterEnvIntegration.js"
    ],
    snapshotResolver: "<rootDir>/config/jest/snapshotResolver.js",
    snapshotSerializers: [
      "enzyme-to-json/serializer"
    ],
    testEnvironment: "jest-environment-jsdom-fourteen",
    testMatch: [
      "<rootDir>/src/**/__integration__/**/*.{js,jsx,ts,tsx}",
      "<rootDir>/src/**/*.{integration}.{test}.{js,jsx,ts,tsx}"
    ],
    transform: {
      ".+\\.(js|jsx|ts|tsx)$": "babel-jest",
      ".+\\.css$": "<rootDir>/config/jest/cssTransform.js",
      ".+\\.json$": "<rootDir>/config/jest/jsonTransform.js",
      "(?!.*\\.(js|jsx|ts|tsx|css|json)$)": "<rootDir>/config/jest/fileTransform.js"
    },
    transformIgnorePatterns: [
      "[/\\\\]node_modules[/\\\\].+\\.(js|jsx|ts|tsx)$",
      ".+\\.module\\.(css|sass|scss)$"
    ],
    watchPlugins: [
      "jest-watch-typeahead/filename",
      "jest-watch-typeahead/testname"
    ]
  }