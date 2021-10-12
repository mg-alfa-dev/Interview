Milliman LTS Junior Dev HAL Interview Question
==============================================

Setup
-----

1. Download and install
   - [Git for Windows](https://gitforwindows.org/) (assuming you're on Windows)
   - [Visual Studio Code](https://code.visualstudio.com/) (Code - Insiders will also work fine)
   - [Node.js](https://nodejs.org/en/) (LTS version, though it really shouldn't matter)
2. Clone the repository
   ```bash
   git clone https://github.com/mg-alfa-dev/Interview.git --no-checkout
   cd Interview
   git sparse-checkout init
   git sparse-checkout add junior-dev-react-hal-question
   cd js # or 'ts' if you prefer typescript
   ```
3. Install dependencies
   ```bash
   npm install
   ```
4. Open Visual Studio Code and install the recommended extensions.  The *Live Share* extension is required in order to conduct the interview.
5. Open `package.json` and set your name in the `author.name` field.

### Optional

6. Install the React Developer Tools and Redux DevTools plugins for your browser.
   - React Developer Tools: [Chrome](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en-US) | [Firefox](https://addons.mozilla.org/en-US/firefox/addon/react-devtools/) | [Edge](https://microsoftedge.microsoft.com/addons/detail/react-developer-tools/gpphkfbcpidddadnkolkpfckpihlkkil)
   - Redux DevTools: [Chrome](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?hl=en-US) | [Firefox](https://addons.mozilla.org/en-US/firefox/addon/reduxdevtools/) | [Edge](https://microsoftedge.microsoft.com/addons/detail/redux-devtools/nnkgneoiohoecpdiaponcejilbhhikei)

What we will be building
------------------------

We will be using [HAL Documents](https://en.wikipedia.org/wiki/Hypertext_Application_Language) to generate a simple React app for retrieving repositories and displaying details about the branch.  The final product will look something like this:

![Final app](../../../raw/master/junior-dev-react-hal-question/mockups/react-dev-interview-question.gif)

We will *not* be building this from scratch, only creating a couple of the components and doing some data manipulation to generate the data.

Mockups of the various features are in `/mockups/` within the repository root.

### Technologies

We'll be using [React Redux](https://react-redux.js.org/) via [Redux Toolkit](https://redux-toolkit.js.org/) for the store, [Carbon Components](https://www.carbondesignsystem.com/) for some prebuilt/pre-styled components, and optionally [Material UI Styles](https://mui.com/styles/basics/) for styling (you may also use css or sass).  We'll use [jest](https://jestjs.io/) and [@testing-library/react](https://testing-library.com/docs/react-testing-library/intro/) for tests.

As this interview will also be pair programming, we encourage you to ask questions about the supplied features and workflows of these packages, rather than spending a lot of time searching the web and docs, though you are certainly welcome to read them during the interview if it helps.

The data from the "server" is retrieved via the `http-client` package at the root of the repository.  It is just a mock that returns expected results for given URLs, and does not connect to an external server.
