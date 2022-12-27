const core = require('@actions/core');
const github = require('@actions/github');
const { Octokit } = require("@octokit/rest");


const commentOnPr = async () => {
  const owner = process.env.GITHUB_REPOSITORY_OWNER;
  const repo = process.env.GITHUB_REPOSITORY_NAME;
    // Create the comment on the pull request
    const octokit = new Octokit({
      auth: core.getInput('github_token'),
    }); 
    await octokit.issues.createComment({
      owner,
      repo,
      issue_number: pullRequest.number,
      body: "This is a new comment on the pull request",
  });
}

try {
  const context = github.context;
  core.getInput('metis_api_key');
  const pullRequest = context.payload.pull_request;
  console.log(pullRequest.title);
  core.setOutput('pr_tag', pullRequest.title || 'Action not trigger from pr');
  commentOnPr();


} catch (error) {
  core.setFailed(error.message);
}
