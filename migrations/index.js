const core = require("@actions/core");
const execSync = require("child_process").execSync;
const fs = require("fs");
const axios = require("axios");
const { context, getOctokit } = require('@actions/github');

async function main() {
  try {
    const shaFrom = core.getInput("from");
    const shaTo = core.getInput("to");
    const apiKey = core.getInput("metis_api_key");
    const githubToken = core.getInput("github_token");
    const url = core.getInput("target_url");
    const pull_request = context.payload?.pull_request;
    const octokit = getOctokit(githubToken);

    console.log(`sha from ${shaFrom}`);
    console.log(`sha to ${shaTo}`);
    console.log(`api key ${apiKey}`);

    let output = execSync(
      `git diff --diff-filter=ACM ${shaFrom} ${shaTo} --name-only | grep 'migration.sql' | jq -Rsc '. / "\n" - [""]'`
    );
    const newMigrationsFiles = JSON.parse(output);
    console.log(`new files paths: ${newMigrationsFiles}`);

    const migrationsData = [];
    await Promise.all(
      newMigrationsFiles.map((migration) => {
        const content = fs.readFileSync(migration, 'utf-8');
        migrationsData.push(content);
      }),
    );

    const res = await axios.post(`${url}/api/migrations/create`, {
      migrationsData,
      prId: `${pull_request.number}`,
      apiKey,
    });
    console.log(res);

    await octokit.rest.issues.createComment({
      ...context.repo,
      issue_number: pull_request.number,
      body: `Metis analyzed your new migrations files. View the results in the link: ${encodeURI(
        `${url}/migrations/${apiKey}/${pull_request.number}`
      )}`,
    });
  } catch (e) {
    console.error(e);
    core.setFailed(e);
  }
}

main();