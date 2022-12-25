const core = require('@actions/core');
const github = require('@actions/github');

try {
  const context = github.context;
  const pullRequest = context.payload.pull_request;
  console.log(pullRequest.title);
  core.setOutput('pr_tag', pullRequest.title || 'Action not trigger from pr');
} catch (error) {
  core.setFailed(error.message);
}
