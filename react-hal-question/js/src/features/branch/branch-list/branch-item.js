/**
 * @file This is a stub component.  You must determine how to pull the correct data from the store, display it in the
 * component, and implement the focus and click handlers.
 *
 * Refer to the mockups to determine what information that is and how it should be displayed.  The loading spinner
 * displayed is the `InlineLoading` component from `carbon-components-react`.
 */
import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { InlineLoading, SideNavMenuItem } from 'carbon-components-react';
import { useAppDispatch, useAppSelector } from '@/app/hooks';

/** @typedef {import('@/app/branch-slice/branch').BranchSummary} BranchSummary */

const useItemStyles = makeStyles({
  root: {
    '& > .bx--side-nav__link': {
      width: '100%',

      '& > .bx--side-nav__link-text': {
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row',
        width: '100%',
      },
    },
  },
  loading: {
    minHeight: 'unset',
    width: 'unset',
  },
});

/** @type {import('react').FC<{ branch: BranchSummary; disabled?: boolean }>} */
const BranchItem = ({ branch, disabled }) => {
  const dispatch = useAppDispatch();
  const classes = useItemStyles();

  // const x = useAppSelector(selectX);

  const isActive = false; // TODO: set to false if details are loading, a different branch is selected, or the item is disabled

  const handleFocus = e => {
    // TODO: blur item if item is disabled
  };

  const handleClick = () => {
    // TODO: fetch branch details
  };

  return (
    <SideNavMenuItem aria-current={isActive && 'page'} className={classes.root} href="#" isActive={isActive} onClick={handleClick} onFocus={handleFocus}>
      {/* TODO */}
    </SideNavMenuItem>
  );
};

export default BranchItem;
