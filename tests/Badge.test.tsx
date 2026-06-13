import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Badge } from '../src/components/Badge';
import { AnThemeProvider } from '../src/providers';

function renderWithTheme(ui: React.ReactElement) {
  return render(<AnThemeProvider theme="tora">{ui}</AnThemeProvider>);
}

describe('Badge', () => {
  it('renders children', () => {
    renderWithTheme(<Badge>New</Badge>);
    expect(screen.getByText('New')).toBeInTheDocument();
  });

  it('applies default variant with primary color', () => {
    renderWithTheme(<Badge data-testid="badge">Tag</Badge>);
    const badge = screen.getByTestId('badge');
    expect(badge.className).toContain('bg-[var(--an-color-primary)]');
    expect(badge.className).toContain('text-white');
  });

  it('applies outline variant', () => {
    renderWithTheme(
      <Badge variant="outline" data-testid="badge">Outline</Badge>,
    );
    const badge = screen.getByTestId('badge');
    expect(badge.className).toContain('border');
    expect(badge.className).toContain('bg-transparent');
  });

  it('applies soft variant', () => {
    renderWithTheme(
      <Badge variant="soft" data-testid="badge">Soft</Badge>,
    );
    const badge = screen.getByTestId('badge');
    expect(badge.className).toContain('bg-[var(--an-color-primary)]/10');
  });

  it('applies different color tokens', () => {
    renderWithTheme(
      <Badge color="success" data-testid="badge">Success</Badge>,
    );
    const badge = screen.getByTestId('badge');
    expect(badge.className).toContain('--an-color-success');
  });

  it('merges custom className', () => {
    renderWithTheme(<Badge className="extra" data-testid="badge">Custom</Badge>);
    expect(screen.getByTestId('badge').className).toContain('extra');
  });
});
