## Github Finder

Interfaces with Github API and performs user lookup on Github.

## High Level Component

![Overlay](https://github.com/sorapk/github-finder/blob/master/other/high-level-component.PNG)

## Key Libraries

- React
- Type Script
- React Hooks

## Implementation Highlights

- Implemented presentational components functionally.
- Manage scope and access of each components' using React Hook Context API.
- Abstract state updates and edits with Redux reducer pattern using React Hook Context API.

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

## NPM commands:

- npm start
- npm run build

## Wish List:

- Scroll down to fetch additional users
- Implement OAuth on backend
  - User Login with his/her own Github account to access API
- Additional Statistics about queried results
  - Visualization of quiered user location
  - Language used by users
