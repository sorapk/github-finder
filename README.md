## Github Finder

Interfaces with Github API and performs user lookup on Github.

## High Level Component

![Overlay](https://github.com/sorapk/github-finder/blob/master/high-level-component.PNG)

## Technology

- React
- Type Script

## Environment Setup

- <strong>Chrome Extension</strong>
  - [React Development Extension](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en)
- <strong>VS Code Extensions</strong>
  - ES7 React/Redux/GraphQL/React-Native snippets
  - Breacket Pair Colorizer
  - Auto Rename Tag
  - Prettier - Code formatter
- <strong>Adding Editor Settings</strong>
  - "emmet.includeLanguages": {
    "javascript": "javascriptreact"
    }

## Fixes

- Reassign cache path to fix windows npm error "npm config set cache C:\tmp\nodejs\npm-cache --global"
- https://github.com/zkat/npx/issues/146
