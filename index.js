const core = require('@actions/core');
const { getPullRequest } = require('@actions/github');

const getPRName = async () => {
  const pullRequest = await getPullRequest();
  const prName = pullRequest.title;
  return prName;
}

try {
  core.setOutput('METIS_TAG_PR', getPRName() || 'Action not trigger from pr')
  console.log(getPRName())
} catch (error) {
  core.setFailed(error.message);
}
