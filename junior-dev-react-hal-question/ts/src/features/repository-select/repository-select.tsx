import React, { FC, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Dropdown, DropdownSkeleton } from 'carbon-components-react';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { setSelectedRepository } from '@/app/repository-slice/repository-shared-actions';
import { fetchRepositoriesAsync, selectFetchRepositoryStatus, selectRepositories, selectSelectedRepository } from '@/app/repository-slice/respository-slice';

const useStyles = makeStyles({
  root: {
    maxWidth: 300,
    width: 300,
    gridArea: 'repoSelect',
  },
});

const RepositorySelect: FC = () => {
  const dispatch = useAppDispatch();
  const repos = useAppSelector(selectRepositories);
  const status = useAppSelector(selectFetchRepositoryStatus);
  const selectedRepo = useAppSelector(selectSelectedRepository);

  const classes = useStyles();

  useEffect(() => {
    dispatch(fetchRepositoriesAsync());
  }, [dispatch]);

  if (!repos || status === 'loading') {
    return <DropdownSkeleton className={classes.root} size="lg" />;
  }

  return (
    <div className={classes.root}>
      <Dropdown
        id="repository-select"
        itemToString={r => r.name}
        items={Object.values(repos)}
        label="Select repository"
        onChange={({ selectedItem }) => dispatch(setSelectedRepository(selectedItem!.id))}
        selectedItem={selectedRepo}
        size="lg"
        titleText={false}
      />
    </div>
  );
};

export default RepositorySelect;
