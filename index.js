const core = require('@actions/core');
const { getPullRequest } = require('@actions/github');

try {
  async function getPRName() {
    const pullRequest = await getPullRequest();
    const prName = pullRequest.title;
    console.log(prName);
  }

  core.setOutput('METIS_TAG_PR', getPRName() || 'Action not trigger from pr')
  console.log(getPRName())
 
} catch (error) {
  core.setFailed(error.message);
}
