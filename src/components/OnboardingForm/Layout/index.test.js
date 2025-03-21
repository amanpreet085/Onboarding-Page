import React from 'react';
import { render, screen } from '@testing-library/react';
import Layout from './index';

describe('Layout Component', () => {
  test('renders children and header', () => {
    const header = 'Test Header';
    render(
      <Layout header={header}>
        <div data-testid="child-content">Test Content</div>
      </Layout>
    );
    
    expect(screen.getByText(header)).toBeInTheDocument();
    expect(screen.getByTestId('child-content')).toBeInTheDocument();
  });
  
  test('renders with correct CSS classes', () => {
    render(<Layout header="Header">Content</Layout>);
    
    expect(screen.getByText('Header').closest('div')).toHaveClass('header');
    expect(screen.getByText('Content').closest('div')).toHaveClass('content');
  });
});