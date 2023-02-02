# Metis Test Action

This GitHub Action allows you to create a new test in Metis, and comment on a pull request with the results of the test.

## Prerequisites
- A Metis account with a valid API key
- A GitHub repository

## Inputs
- `metis_api_key`: The Metis API key to use for creating the test
- `github_token`: The GitHub token to use for commenting on the pull request
- `target_url` (optional): The URL to use for the Metis API. Default: https://app.metisdata.io

## Usage
Add the following code to your GitHub Actions workflow file:
```yaml
- name: Metis Test
  uses: <YOUR_GITHUB_USERNAME>/sql-queries-analyzer@v1
  with:
    metis_api_key: ${{ secrets.METIS_API_KEY }}
    github_token: ${{ secrets.GITHUB_TOKEN }}