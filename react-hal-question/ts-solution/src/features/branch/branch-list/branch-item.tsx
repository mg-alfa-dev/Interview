import { makeStyles } from '@material-ui/styles';
import { InlineLoading, SideNavMenuItem } from 'carbon-components-react';
import React, { FC, FocusEvent } from 'react';

import { BranchSummary } from '@/app/branch-slice/branch';
import { fetchBranchDetailsAsync, selectLoadingBranch, selectSelectedBranch } from '@/app/branch-slice/branch-slice';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { selectSelectedRepository } from '@/app/repository-slice/respository-slice';

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

export const BranchItem: FC<{ branch: BranchSummary; disabled?: boolean }> = ({ branch, disabled }) => {
  const selectedBranch = useAppSelector(selectSelectedBranch);
  const selectedRepository = useAppSelector(selectSelectedRepository);
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(selectLoadingBranch)?.id === branch.id;
  const isActive = (selectedBranch?.id === branch.id && !disabled) || isLoading;
  const classes = useItemStyles();

  const handleFocus = (e: FocusEvent<HTMLAnchorElement>) => {
    if (disabled) {
      e.currentTarget.blur();
    }
  };

  const handleClick = () => {
    if (!disabled && selectedRepository) {
      dispatch(fetchBranchDetailsAsync({ repository: selectedRepository, branch }));
    }
  };

  return (
    <SideNavMenuItem aria-current={isActive && 'page'} className={classes.root} href="#" isActive={isActive} onClick={handleClick} onFocus={handleFocus}>
      <span>{branch.name}</span>
      {isLoading && <InlineLoading className={classes.loading} />}
    </SideNavMenuItem>
  );
};
