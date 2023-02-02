import * as core from '@actions/core'
import axios from 'axios'
const {context} = require('@actions/github')

const {pull_request} = context.payload

const updateTestIsCompleted = async () => {
  try {
    const urlPrefix = core.getInput('target_url') || `https://app.metisdata.io`;
    axios
      .post(
        `${urlPrefix}/api/tests/update-test-to-completed`,
        {
          name: pull_request.title,
          apiKey: core.getInput('metis_api_key')
        }
      )
      .then(function (response) {
        console.log(response)
      })
      .catch(function (error) {
        console.log(error)
      })
  } catch (error) {
    console.log(error)
  }
}

const run = async () => {
  try {
    await updateTestIsCompleted()
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run();
