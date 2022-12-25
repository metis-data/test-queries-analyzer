const core = require('@actions/core');
const github = require('@actions/github');

try {
  const context = github.context;
  const pullRequest = context.payload.pull_request;
  console.log(pullRequest);
  core.setOutput('METIS_TAG_PR', pullRequest.title || 'Action not trigger from pr');
} catch (error) {
  core.setFailed(error.message);
}
