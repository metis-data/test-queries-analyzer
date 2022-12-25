const core = require('@actions/core');
const { github, getPullRequest } = require('@actions/github');

try {
  async function getPRName() {
    const pullRequest = await getPullRequest();
    const prName = pullRequest.title;
    console.log(prName);
  }
  
  // `who-to-greet` input defined in action metadata file
  const nameToGreet = core.getInput('who-to-greet');
  console.log(`Hello ${nameToGreet}!`);
  const time = (new Date()).toTimeString();
  core.setOutput("time", time);
  core.setOutput('METIS_TAG_PR', getPRName())
  process.env.JOHN_MEKEIN = "John mekein";
  // Get the JSON webhook payload for the event that triggered the workflow
  const payload = JSON.stringify(github.context.payload, undefined, 2)
  console.log(`The event payload: ${payload}`);
} catch (error) {
  core.setFailed(error.message);
}
