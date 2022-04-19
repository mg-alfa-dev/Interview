import React, { FC } from 'react';
import { Add16 } from '@carbon/icons-react';
import { makeStyles } from '@material-ui/styles';
import { Button } from 'carbon-components-react';
import { openDialog } from '@/app/branch-slice/branch-slice';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { selectSelectedRepository } from '@/app/repository-slice/respository-slice';
import AddBranchDialog from './add-branch-dialog';

const useStyles = makeStyles({
  root: {
    gridArea: 'createBranch',
  },
});

const AddBranchButton: FC = () => {
  const dispatch = useAppDispatch();
  const classes = useStyles();
  const currentRepo = useAppSelector(selectSelectedRepository);
  const visible = !!currentRepo;

  return visible ? (
    <>
      <Button className={classes.root} disabled={currentRepo?.readonly} isExpressive onClick={() => dispatch(openDialog())} renderIcon={Add16}>
        New branch
      </Button>
      <AddBranchDialog />
    </>
  ) : null;
};

export default AddBranchButton;
