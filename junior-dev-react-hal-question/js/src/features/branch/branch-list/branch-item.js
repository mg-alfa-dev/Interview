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

  const isActive = false; // TODO

  const handleFocus = e => {
    // TODO
  };

  const handleClick = () => {
    // TODO
  };

  return (
    <SideNavMenuItem aria-current={isActive && 'page'} className={classes.root} href="#" isActive={isActive} onClick={handleClick} onFocus={handleFocus}>
      {/* TODO */}
    </SideNavMenuItem>
  );
};

export default BranchItem;
