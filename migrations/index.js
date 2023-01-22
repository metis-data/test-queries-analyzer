const core = require("@actions/core");
const execSync = require("child_process").execSync;

async function main() {
  const shaFrom = core.getInput("from");
  const shaTo = core.getInput("to");
  const apiKey = core.getInput("api_key");

  let output = execSync(
    `git diff --diff-filter=ACM ${shaFrom} ${shaTo} --name-only | grep 'migration.sql'`
  );
  let newMigrationsFiles = JSON.parse(output);
  console.log(newMigrationsFiles);
}

main();