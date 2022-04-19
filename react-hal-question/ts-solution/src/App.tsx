import React from 'react';
import './App.css';
import 'carbon-components/css/carbon-components.css';
import { AddBranchButton, BranchDetails, BranchList } from './features/branch';
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
