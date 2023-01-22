const core = require("@actions/core");
const execSync = require("child_process").execSync;

async function main() {
  const shaTo = core.getInput("to");
  const apiKey = core.getInput("api_key");

  const shaFrom = execSync(`git rev-parse ${shaTo}^`);
  let output = execSync(
    `git diff --diff-filter=ACM ${shaFrom} ${shaTo} --name-only | grep 'migration.sql'`
  );
  let newMigrationsFiles = JSON.parse(output);
  console.log(newMigrationsFiles);
}

main();