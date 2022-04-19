import React from 'react';
import { cleanup } from '@testing-library/react';
import Repository from '@/app/repository-slice/repository';
import { fireClickEvent, render } from '@/test-utils';
import AddBranchButton from './add-branch-button';

describe('AddBranchButton', () => {
  afterEach(() => {
    cleanup();
  });

  it('is disabled when the selected repository is readonly', () => {
    const wrapper = render(<AddBranchButton />, { preloadedState: { repository: { selectedRepository: { readonly: true } as Repository } } });
    const btn = wrapper.getByText('New branch', { selector: 'button' });
    expect(btn).toBeInTheDocument();
    expect(btn).toBeDisabled();
  });

  it('is enabled when the selected repository is not read-only', () => {
    const wrapper = render(<AddBranchButton />, { preloadedState: { repository: { selectedRepository: { readonly: false } as Repository } } });
    const btn = wrapper.getByText('New branch', { selector: 'button' });
    expect(btn).toBeInTheDocument();
    expect(btn).not.toBeDisabled();
  });

  it('is not rendered when there is no selected repository', () => {
    render(<AddBranchButton />);
    expect(document.querySelector('button')).not.toBeInTheDocument();
  });

  it('opens the dialog when clicked', () => {
    const wrapper = render(<AddBranchButton />, { preloadedState: { repository: { selectedRepository: { readonly: false } as Repository } } });
    const btn = wrapper.getByText('New branch', { selector: 'button' });
    fireClickEvent(btn);

    expect(document.querySelector('.bx--modal')).toHaveClass('is-visible');
  });
});
