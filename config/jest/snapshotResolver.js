module.exports = {
  testPathForConsistencyCheck: 'some/example.test.js',

  resolveSnapshotPath: (testPath, snapshotExtension) => 
    testPath.replace("src\\", "src\\__snapshots__\\").replace(/\.test\.([tj]sx?)/, `${snapshotExtension}.$1`).replace(
      /\\/g,
      "/"
    ),

  resolveTestPath: (snapshotFilePath, snapshotExtension) =>
    snapshotFilePath.replace("src\\__snapshots__\\", "src\\").replace(snapshotExtension, '.test').replace(
      /\\/g,
      "/"
    )
}