const core = require('@actions/core');
const github = require('@actions/github');

try {
  const context = github.context;
  const pullRequest = context.payload.pull_request;
  console.log(pullRequest.title);
  core.setOutput('pr_tag', pullRequest.title || 'Action not trigger from pr');

  const runId = context.runId;
  const { owner, repo } = context.repo;

  // Get the status of the workflow run
  const { data: run } = await github.actions.getWorkflowRun({
    owner,
    repo,
    run_id: runId,
  });

  // Check if the workflow run has completed
  if (run.conclusion === 'success' || run.conclusion === 'failure') {
    console.log('Hellosdlfjlsdfjlsdjflsdjflsdjflsdfjlsdjflsdjflsdjfsdlfjsdlfjlsdfjsldjflsdjfsdfksdjflkdsjflsdjfsldkjf');
  }
} catch (error) {
  core.setFailed(error.message);
}
