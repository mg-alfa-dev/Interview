import React, { FC } from 'react';
import { Add16 } from '@carbon/icons-react';
import { makeStyles } from '@material-ui/styles';
import { Button } from 'carbon-components-react';
import { useAppDispatch, useAppSelector } from '@/app/hooks';

const useStyles = makeStyles({
  root: {
    gridArea: 'createBranch',
  },
});

// TODO
const AddBranchButton: FC = () => {
  return null;
};

export default AddBranchButton;
