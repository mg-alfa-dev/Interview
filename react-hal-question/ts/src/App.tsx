import './App.css';
import 'carbon-components/css/carbon-components.css';
import React from 'react';
import { BranchDetails, BranchList } from './features/branch';
import AddBranchButton from './features/branch/add-branch-button';
import Header from './features/header';
import RepositorySelect from './features/repository-select';

function App() {
  return (
    <div className="App">
      <Header />
      <RepositorySelect />
      <BranchList />
      <AddBranchButton />
      <BranchDetails />
    </div>
  );
}

export default App;
