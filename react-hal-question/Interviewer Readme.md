Frontend Paired Programming Problem
===================================

Interviewer notes
-----------------

It may be helpful to have downloaded the [`Recruitment` repo](https://dev.azure.com/mgalfadev/Rainier/_git/Recruitment) from Azure.  An expected solution (for TypeScript, but you can imagine for JavaScript) is stored at `Recruitment/junior-dev-react-hal-question/ts-solution`.  Use a sparse checkout or you will download a several hundred MB zip for a different interview.

Another option is just to have the solution open in [Azure itself](https://dev.azure.com/mgalfadev/Rainier/_git/Recruitment?path=/junior-dev-react-hal-question/ts-solution).

I've included estimates for the amount of time I would expect a junior dev to take to complete each of these.  I... have been known to have unrealistic expectations, so take them with a grain of salt.  It also matters a great deal whether they familiarized themselves with the code prior to the interview.

Notes to give interviewee
-------------------------

### Give these up front ###

- The top right button resets the state of the app.  No need to refresh each time, and hot module reloading is enabled.
- Every component file already includes every required import from `carbon-components-react`.  As long as they don't delete these, they should not need to go hunting for the correct components.
  
  *Note to interviewer*: this excludes the add branch button/dialog stretch goal.  These files, if they get that far, will need to be created.
- Everything in both TS and JS has been strongly typed (JS via @jsdoc), including the HTTP responses from `http-client`, so they can and should rely heavily on Intellisense (<kbd>ctrl</kbd>+<kbd>space</kbd> by default).
- The styling is already complete so long as they add the proper `className` property to the components, retrieved from `const classes = useStyles();`.
- The only files that will need editing (which you will guide them through during the interview), are under `src/app/**` and `src/features/brabcg.**`.  The redux store resides in `app`.  The components reside in `features`.

### Give these as needed ###

- `@/*` has been set up as a path alias for importing from `src/*`.
- While I would expect them to know this already, to start the app, they need to run `npm start`.  To run tests, they need to run `npm test`.
- Files that need implementing have file header comments and comments in the areas that need to be implemented.
- When/if they do not know what something should look like, or how it should behave in various state, remind them to pull up the mockups stored in `/mockups`.  It includes a gif that clicks through the completed webpage.

Things to implement
-------------------

The following are the pieces that the interviewee needs to complete, in order.

### Basic expectations ###

I would expect a junior dev, with help from their pair-programming partner, to finish these in the time allotted, and possibly to have written some tests for them.

#### Branch item ####

*Expected time w/out tests for jr dev: 5-10 minutes*

These items appear in the list below the *Repository Select* (top left) when a repository has been selected.

When clicked, assuming the item is not disabled a repository is selected, the item will dispatch the `fetchBranchDetailsAsync` action (I would expect them to find this action on their own).  An `InlineLoading` spinner is displayed while the branch details are being loaded.  During loading, all branch items are disabled, and if the user focuses on one while disabled, the focus is `blur`ed (the purpose of the `handleBlur` stub).  The styles for disabled items come from `branch-list.tsx`.

The component is at `@/features/branch/branch-list/branch-item.tsx`.  It will also require implementing a small chunk of `@/app/branch-slice/branch-slice.ts`.

Hint: `@/features/repository-select/repository-select.tsx`, `@/app/repository-slice/repository-slice.ts`, and `@/features/branch/branch-list/branch-list.tsx` are all complete and can be used as references.  (Tests do not exist for these files, but I would expect them to already know at least some form of testing react components.)

#### Branch details ####

*Expected time w/out tests for jr dev: 40 minutes*

This is where I expect the bulk of a junior dev candidate's time to be spent.  The file is located at `@/features/branch/branch-details/branch-details.tsx`.  It contains only a stub that returns an empty (styled) `<div />`.

This control returns a `<div>` containing a header with the selected branch's name, followed by either a `<SkeletonPlaceholder>` while its details are being loaded, or an inner component (which in the solution, I call `LoadedBranchData`).

This inner component returns `null` if there is no selected branch or that branch is loading.  Once loaded, it contains a `<Tile>` containing a list of `<span>`s, displaying the retrieved information.  One `<span>` for the info's title followed by another `<span>` containing its value.  After these three pairs of spans, an `<hr>` with the `spanAll` class, and a `<div>` with the `spanAll` class containing the branch's details.

Remember that every Carbon component required is already imported (and a comment exists above the component stub, in case they should forget).

#### Tests ####

*Expected time for jr dev: 10-20 minutes or whatever they have left*

Tests for these files.  The files already exist (`*.test.tsx`, etc) and the framework is setup, but the tests have not.

### Stretch goal ###

I would not expect a junior dev to get this far unless they were very good.  A senior dev candidate may, but I would also expect more extensive testing from them, so they may not.

#### Add branch button ####

A button that opens an *Add branch dialog* (below).  It only appears when a repository is selected.  If it is a read-only repository, it is disabled.

#### Add branch dialog ####

I would be shocked if anyone got here inside of an hour.  This dialog contains title, a text field labeled `New branch name`, and `Cancel` and `Create` buttons.  The create button is disabled while the field is empty, and contains an `<InlineLoading />` component while the branch is being created.  While the branch is being created, both buttons are disabled, and the close button (&times;) in the top right is invisible.