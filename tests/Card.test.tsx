import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Card } from '../src/components/Card';
import { AnThemeProvider } from '../src/providers';

function renderWithTheme(ui: React.ReactElement) {
  return render(<AnThemeProvider theme="tora">{ui}</AnThemeProvider>);
}

describe('Card', () => {
  it('renders children', () => {
    renderWithTheme(<Card>Card content</Card>);
    expect(screen.getByText('Card content')).toBeInTheDocument();
  });

  it('applies default variant styles', () => {
    renderWithTheme(<Card data-testid="card">Content</Card>);
    const card = screen.getByTestId('card');
    expect(card.className).toContain('border');
    expect(card.className).toContain('bg-[var(--an-color-surface)]');
  });

  it('applies glass variant styles', () => {
    renderWithTheme(<Card variant="glass" data-testid="card">Glass</Card>);
    const card = screen.getByTestId('card');
    expect(card.className).toContain('backdrop-blur-md');
  });

  it('applies elevated variant styles', () => {
    renderWithTheme(
      <Card variant="elevated" data-testid="card">Elevated</Card>,
    );
    const card = screen.getByTestId('card');
    expect(card.className).toContain('shadow-[var(--an-shadow-md)]');
  });

  it('adds hover styles when hoverable', () => {
    renderWithTheme(
      <Card hoverable data-testid="card">Hoverable</Card>,
    );
    const card = screen.getByTestId('card');
    expect(card.className).toContain('cursor-pointer');
    expect(card.className).toContain('hover:-translate-y-0.5');
  });

  it('merges custom className', () => {
    renderWithTheme(<Card className="my-card" data-testid="card">Custom</Card>);
    expect(screen.getByTestId('card').className).toContain('my-card');
  });
});
