Milliman LTS Dev HAL Interview Question
=======================================

Setup
-----

1. Download and install
   - [Git for Windows](https://gitforwindows.org/) (assuming you're on Windows)
   - [Visual Studio Code](https://code.visualstudio.com/)
   - [Node.js](https://nodejs.org/en/) (LTS version, though it really shouldn't matter)
2. Clone the repository
   ```bash
   git init --initial-branch master
   git remote add origin https://github.com/mg-alfa-dev/Interview.git
   git config core.sparseCheckout true
   git sparse-checkout set react-hal-question
   git fetch --depth 1 origin master
   git checkout master
   cd react-hal-question
   cd js # or 'ts' if you prefer typescript
3. Install dependencies
   ```bash
   npm ci
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

![Final app](mockups\react-dev-interview-question.gif)

We will *not* be building this from scratch, only creating a couple of the components and doing some data manipulation to generate the data.

Mockups of the various features are in `./mockups/` within the repository.

### Technologies

We'll be using [React Redux](https://react-redux.js.org/) via [Redux Toolkit](https://redux-toolkit.js.org/) for the store, [Carbon Components](https://www.carbondesignsystem.com/) for some prebuilt/pre-styled components, and optionally [Material UI Styles](https://mui.com/styles/basics/) or [Emotion](https://emotion.sh/docs/styled) for styling (you may also use css or sass).  We'll use [jest](https://jestjs.io/) and [@testing-library/react](https://testing-library.com/docs/react-testing-library/intro/) for tests.

As this interview will also be pair programming, we encourage you to ask questions about the supplied features and workflows of these packages, rather than spending a lot of time searching the web and docs, though you are certainly welcome to read them during the interview if it helps.

The data from the "server" is retrieved via the `http-client` package at the root of the repository.  It is just a mock that returns expected results for given URLs, and does not connect to an external server.

Steps
-----

We will guide you through these steps, but for reference, these are the files we will be editing.  If you're using the TypeScript version, the file extensions will be the TypeScript equivalents.

### Part 1 - Branch list items ###

Files:

- `src/app/branch-slice/branch-slice.js`
  - Generate a unique ID in `getBranchKey()`, as `branch.id` is not guaranteed to be unique across repositories.
  - Set the `fetchBranch` status appropriately in the `extraReducers` callbacks for `fetchBranchDetailsAsync.pending` and `fetchBranchDetailsAsync.fulfilled`.  (We will assume it never rejects.)

  Reference: `src/app/repository-slice/repository-slice.js`

- `src/features/branch/branch-list/branch-item.js`
  - Fill in the children of the rendered output.
    - Branch name
    - If branch details are loading, an `<InlineLoading />` element
  - Use the `useAppSelector()` hook to retrieve whether branch details are being retrieved or not.
  - Implement the `handleClick()` callback to dispatch the proper action to fetch branch details.
  - Implement the `handleFocus()` callback to blur the item if it is disabled (for stylistic reasons).
  
  Reference: `src/features/repository-select/repository-select.js`

### Part 2 - Branch details ###

Files:

- `src/features/branch/branch-details/branch-details.js`
  - Use `useAppSelector()` hook to retrieve the necessary information.
  - While no branch is selected (or no repository has been selected), return `null` or some empty element.
  - If a branch has been selected, display its name in an `<h3 />`.
  - While a branch's details are being loaded, return a `SkeletonPlaceholder`, with the proper `className`.
  - Once a branch's details have been loaded, return a `<Tile />` with the proper `className`, containing the data displayed in the mockup (the red box in `/mockups/segments.png`).

### Tests ###

You may choose to do these as you write these components or after.

Files:

- `src/app/branch-slice/branch-slice.test.js`
- `src/features/branch/branch-list/branch-item.test.js`
- `src/features/branch/branch-details/branch-details.test.js`