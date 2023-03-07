import * as core from '@actions/core';
import axios from 'axios';
const { context } = require('@actions/github');

const { pull_request } = context.payload;

const updateTestIsCompleted = async (testName) => {
  try {
    const urlPrefix = core.getInput('target_url') || `https://app.metisdata.io`;
    axios
      .post(
        `${urlPrefix}/api/tests/update-test-to-completed`,
        {
          name: testName ,
          apiKey: core.getInput('metis_api_key'),
        },
        {
          headers: {
            'x-api-key': core.getInput('metis_api_key'),
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
    const testName = pull_request && pull_request?.title ? pull_request?.title?.replace('#', '') : context.sha;
    await updateTestIsCompleted(testName);
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message);
  }
};
try {
  run();
} catch (error) {
  console.log(error);
}
