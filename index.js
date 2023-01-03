const core = require('@actions/core');
const github = require('@actions/github');
const axios = require('axios');
const { context } = require('@actions/github');
const octokit = github.getOctokit(core.getInput('github_token'));

const { pull_request } = context.payload;

const commentPr = async () => {
  try {
    await octokit.rest.issues.createComment({
      ...context.repo,
      issue_number: pull_request.number,
      body: `:link: to your test  (${encodeURI(`${core.getInput('target_url')}/projects/${core.getInput('metis_api_key')}/${core.getInput('metis_api_key')}?tag=${pull_request.title}`)})`,
    });
  } catch (error) {
    console.log(error);
  }
};

const createNewTest = async () => {
  try {
    axios
      .post(`${core.getInput('target_url')}/api/tests/create`, {
        name: pull_request.title,
        apiKey: core.getInput('metis_api_key'),
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  } catch (error) {
    console.log(error);
  }
};

try {
  const context = github.context;

  core.getInput('metis_api_key');
  const pullRequest = context.payload.pull_request;
  console.log(pullRequest.title);
  core.setOutput('pr_tag', pullRequest.title || 'Action not trigger from pr');
  createNewTest();
  commentPr();
} catch (error) {
  core.setFailed(error.message);
}
