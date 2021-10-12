import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { SkeletonPlaceholder, Tile } from 'carbon-components-react';
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

/**
 * Components you'll want to use are `SkeletonPlaceHolder` and `Tile`
 */

/** @type {import('react').FC} */
const BranchDetails = () => {
  const classes = useStyles();

  return <div className={classes.root}>{/* TODO */}</div>;
};

export default BranchDetails;
