import React, { FC, useEffect, useRef, useState } from 'react';
import { addBranchAsync } from '@/app/branch-slice/branch-shared-actions';
import { closeDialog, selectAddBranchStatus, selectIsDialogOpen } from '@/app/branch-slice/branch-slice';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { selectSelectedRepository } from '@/app/repository-slice/respository-slice';
import { makeStyles } from '@material-ui/styles';
import { Button, ComposedModal, InlineLoading, ModalBody, ModalFooter, ModalHeader, TextInput } from 'carbon-components-react';
import classNames from 'classnames';

const useStyles = makeStyles({
  hidden: {
    display: 'none',
  },
  busyIndicator: {
    marginLeft: 6,
    minHeight: 'unset',
    width: 'unset',
  },
});

const AddBranchDialog: FC = () => {
  const dispatch = useAppDispatch();
  const [value, setValue] = useState('');
  const currentRepo = useAppSelector(selectSelectedRepository)!;
  const open = useAppSelector(selectIsDialogOpen);
  const busy = useAppSelector(selectAddBranchStatus) === 'loading';
  const classes = useStyles();
  const inputRef = useRef<HTMLInputElement>(null);

  const valid = !!value.trim();

  const close = () => {
    if (!busy) {
      dispatch(closeDialog());
    }
  };

  const handleSubmit = () => {
    if (!busy && valid) {
      dispatch(addBranchAsync({ repository: currentRepo, name: value }));
    }
  };

  useEffect(() => {
    if (!open) {
      setValue('');
    } else {
      inputRef.current?.focus();
    }
  }, [open]);

  useEffect(() => {
    if (busy) {
      const stopEscape = (e: KeyboardEvent): void => {
        if (e.key === 'Escape') {
          e.preventDefault();
          e.stopPropagation();
        }
      };

      document.addEventListener('keydown', stopEscape);

      return () => document.removeEventListener('keydown', stopEscape);
    }
  }, [busy]);

  const headerCloseButtonClasses = classNames(busy && classes.hidden);

  const Loading = busy ? () => <InlineLoading className={classes.busyIndicator} /> : undefined;

  return (
    <form>
      <ComposedModal onClose={close} open={open} preventCloseOnClickOutside={busy} size="sm">
        <ModalHeader closeClassName={headerCloseButtonClasses} closeModal={close} title="New branch" />
        <ModalBody>
          <TextInput ref={inputRef} autoFocus disabled={busy} id="new-branch-name" labelText="New branch name" onChange={e => setValue(e.currentTarget.value)} value={value} />
        </ModalBody>
        <ModalFooter>
          <Button disabled={busy} kind="secondary" onClick={close}>
            Cancel
          </Button>
          <Button disabled={!valid || busy} onClick={handleSubmit} renderIcon={Loading} type="submit">
            Create
          </Button>
        </ModalFooter>
      </ComposedModal>
    </form>
  );
};

export default AddBranchDialog;
