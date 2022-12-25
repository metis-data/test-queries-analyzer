const core = require('@actions/core');
const { getPullRequest } = require('@actions/github');

try {
  async function getPRName() {
    const pullRequest = await getPullRequest();
    const prName = pullRequest.title;
    console.log(prName);
  }

  core.setOutput('METIS_TAG_PR', getPRName())
  process.env.JOHN_MEKEIN = "John mekein";
  
} catch (error) {
  core.setFailed(error.message);
}
