export default {
    // Change the test environment to jsdom
    testEnvironment: 'jsdom',
    
    // The glob patterns Jest uses to detect test files
    testMatch: [
        "**/tests/**/*.test.js",
        "!**/import-lambda/**"  // Exclude the import-lambda directory
    ],
    
    // An array of regexp pattern strings that are matched against all test paths
    testPathIgnorePatterns: [
        "/node_modules/",
        "/import-lambda/"
    ],
    
    // Automatically clear mock calls and instances between every test
    clearMocks: true,
    
    // Indicates whether the coverage information should be collected while executing the test
    collectCoverage: false,
}; 