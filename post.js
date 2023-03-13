import * as core from '@actions/core';
import axios from 'axios';
const { context } = require('@actions/github');

const { pull_request } = context.payload;

const updateTestIsCompleted = async (testName, prId) => {
  try {
    const urlPrefix = core.getInput('target_url');
    const apiKey = core.getInput('metis_api_key');
    axios
      .post(
        `${urlPrefix}/api/tests/update-test-to-completed`,
        {
          prName: testName,
          prId,
          apiKey,
        },
        {
          headers: {
            'x-api-key': apiKey,
          },
        }
      )
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

const run = async () => {
  try {
    const testName = pull_request?.title || context.sha;
    const prId = `${pull_request?.number}`;
    await updateTestIsCompleted(testName, prId);
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message);
  }
};
try {
  run();
} catch (error) {
  console.log(error);
}
