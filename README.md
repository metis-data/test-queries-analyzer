# Metis Test Action

This GitHub Action allows you to create a new test in Metis, and comment on a pull request with the results of the test.
we use your pr-name as your test name.

## Prerequisites
- A Metis account with a valid API key. https://docs.metisdata.io/metis/getting-started/what-is-metis
- Metis SDK installed on your project. https://docs.metisdata.io/metis/sdk-integration/general

## Inputs
- `metis_api_key`: The Metis API key to use for creating the test
- `github_token`: The GitHub token to use for commenting on the pull request
- `target_url` (optional): The URL to use for the Metis API. Default: https://app.metisdata.io

## Usage

### 1.
Add the following code to your GitHub Actions workflow file:
```yaml
- name: Metis Test
  id: tag_pr
  uses: metis-data/sql-queries-analyzer@v1
  with:
    metis_api_key: ${{ secrets.METIS_API_KEY }}
    github_token: ${{ secrets.GITHUB_TOKEN }}
```
### 2.
Inject tag_pr in your env for your sdk usage
```yaml
- name: test
        .
        . 
        env:
          METIS_TAG_PR: ${{ steps.tag_pr.outputs.pr_tag  }}
        .
        .
```
