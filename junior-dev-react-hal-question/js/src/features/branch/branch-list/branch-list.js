import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { SideNav, SideNavItems, SideNavMenu } from 'carbon-components-react';
import classNames from 'classnames';
import { selectFetchBranchStatus } from '@/app/branch-slice/branch-slice';
import { useAppSelector } from '@/app/hooks';
import { selectSelectedRepository } from '@/app/repository-slice/respository-slice';
import BranchItem from './branch-item';

const useListStyles = makeStyles({
  root: {
    gridArea: 'branchList',
    position: 'static',
    width: 'unset',
    maxWidth: 'unset',
  },
  disabled: {
    '& a.bx--side-nav__link': {
      cursor: 'default',

      '&:not([aria-current="page"])': {
        backgroundColor: 'unset !important',
      },

      '& > .bx--side-nav__link-text': {
        '&, &:hover': {
          color: '#c6c6c6 !important',
        },
      },
    },
  },
});

/** @type {import('react').FC} */
const BranchList = () => {
  const selectedRepo = useAppSelector(selectSelectedRepository);
  const classes = useListStyles();

  const disabled = useAppSelector(selectFetchBranchStatus) === 'loading';
  const rootClasses = classNames(classes.root, disabled && classes.disabled);

  return (
    selectedRepo && (
      <SideNav aria-label="" className={rootClasses} expanded isChildOfHeader={false} isFixedNav>
        <SideNavItems>
          <SideNavMenu defaultExpanded title="Branches">
            {Object.values(selectedRepo.branchSummaries).map(b => (
              <BranchItem key={b.id} branch={b} disabled={disabled} />
            ))}
          </SideNavMenu>
        </SideNavItems>
      </SideNav>
    )
  );
};

export default BranchList;
