const core = require('@actions/core');
const github = require('@actions/github');
const { context } = require('@actions/github')
const octokit = github.getOctokit(core.getInput('github_token'));

const { pull_request } = context.payload;

async function commentPr() {
  await octokit.rest.issues.createComment({
    ...context.repo,
    issue_number: pull_request.number,
    body: `https://app.metisdata.io/tests/${core.getInput('metis_api_key')}`
  });
}




try {
  const context = github.context;
  core.getInput('metis_api_key');
  const pullRequest = context.payload.pull_request;
  console.log(pullRequest.title);
  core.setOutput('pr_tag', pullRequest.title || 'Action not trigger from pr');
  commentPr();


} catch (error) {
  core.setFailed(error.message);
}
