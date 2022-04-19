import React, { FC } from 'react';
import { makeStyles } from '@material-ui/styles';
import { SkeletonPlaceholder, Tile } from 'carbon-components-react';
import Branch from '@/app/branch-slice/branch';
import { selectLoadingBranch, selectSelectedBranch } from '@/app/branch-slice/branch-slice';
import { useAppSelector } from '@/app/hooks';

const useStyles = makeStyles({
  root: {
    gridArea: 'branchInfo',
    paddingTop: 10,
    paddingLeft: 20,
    paddingRight: 20,
    width: '100%',
    height: '100%',
    '& > h3': {
      marginBottom: 16,
    },
  },
  skeleton: {
    width: '50%',
    maxWidth: 500,
  },
  tile: {
    display: 'inline-grid',
    gridTemplateColumns: 'auto 1fr',
    minWidth: '500px',
    gap: '4px 8px',
    whiteSpace: 'pre-wrap',
    '& > :nth-child(2n + 1)': {
      textAlign: 'end',
    },
  },
  spanAll: {
    gridColumn: '1 / -1',
    minWidth: '100%',
    textAlign: 'unset',
  },
});

const BranchDetails: FC = () => {
  const curBranch = useAppSelector(selectSelectedBranch);
  const branchLoading = useAppSelector(selectLoadingBranch);
  const classes = useStyles();

  if (!curBranch && !branchLoading) {
    return null;
  }

  const LoadedBranchData: FC<{ branch: Branch }> = ({ branch }) => {
    return (
      <Tile className={classes.tile}>
        <span>Repository ID:</span>
        <span>{branch.repositoryId}</span>
        <span>Branch ID:</span>
        <span>{branch.id}</span>
        <span>Date created:</span>
        <span>{new Date(branch.dateCreated).toLocaleTimeString()}</span>

        <hr className={classes.spanAll} />

        <div className={classes.spanAll}>{branch.details}</div>
      </Tile>
    );
  };

  return (
    <div className={classes.root}>
      <h3>{(branchLoading ?? curBranch!).name}</h3>
      {branchLoading ? <SkeletonPlaceholder className={classes.skeleton} /> : curBranch && <LoadedBranchData branch={curBranch} />}
    </div>
  );
};

export default BranchDetails;
