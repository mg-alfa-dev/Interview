import React from 'react';
import { cleanup } from '@testing-library/react';
import { fireClickEvent, render } from '@/test-utils';
import AddBranchButton from './add-branch-button';

describe('AddBranchButton', () => {
  afterEach(() => {
    cleanup();
  });

  it.todo('is not rendered when there is no selected repository');

  it('is disabled when the selected repository is readonly', () => {
    const wrapper = render(<AddBranchButton />, { preloadedState: { repository: { selectedRepository: { readonly: true } } } });
    const btn = wrapper.getByText('New branch', { selector: 'button' });
    expect(btn).toBeInTheDocument();
    expect(btn).toBeDisabled();
  });

  it.todo('is enabled when the selected repository is not read-only');
});
