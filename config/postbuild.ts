import { readFileSync, writeFileSync } from "fs";

const util = require("util");
const exec = util.promisify(require("child_process").exec);

const indexHtmlPath = `build/index.html`;

const postAction = async () => {
  const branch = (await exec("git rev-parse --abbrev-ref HEAD")).stdout
    .toString()
    .trim();
  const revision = (await exec("git rev-parse --short HEAD")).stdout
    .toString()
    .trim();
  const version = process.env.npm_package_version;

  const content = readFileSync(indexHtmlPath);

  writeFileSync(
    indexHtmlPath,
    content
      .toString()
      .replace(/{{versions.branch}}/g, branch)
      .replace(/{{versions.revision}}/g, revision)
      .replace(/{{versions.version}}/g, version)
      .replace(/{{versions.datetime}}/g, Date().toString())
  );
};

postAction();
