import React, { FC, FocusEvent } from 'react';
import { makeStyles } from '@material-ui/styles';
import { InlineLoading, SideNavMenuItem } from 'carbon-components-react';
import { BranchSummary } from '@/app/branch-slice/branch';
import { useAppDispatch, useAppSelector } from '@/app/hooks';

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

const BranchItem: FC<{ branch: BranchSummary; disabled?: boolean }> = ({ branch, disabled }) => {
  const dispatch = useAppDispatch();
  const classes = useItemStyles();

  // const x = useAppSelector(selectX);

  const isActive = false; // TODO

  const handleFocus = (e: FocusEvent<HTMLAnchorElement>) => {
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
