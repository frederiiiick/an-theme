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

  it('applies default color via inline style', () => {
    renderWithTheme(<Card data-testid="card">Content</Card>);
    const card = screen.getByTestId('card');
    expect(card.style.backgroundColor).toBe('var(--an-color-primary)');
    expect(card.className).toContain('text-white');
  });

  it('applies pattern variant with dot overlay', () => {
    renderWithTheme(<Card variant="pattern" data-testid="card">Pattern</Card>);
    const card = screen.getByTestId('card');
    expect(card.style.backgroundColor).toBe('var(--an-color-primary)');
    const overlay = card.querySelector('.absolute');
    expect(overlay).not.toBeNull();
  });

  it('applies elevated variant with shadow', () => {
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

  it('applies specified color via inline style', () => {
    renderWithTheme(<Card color="info" data-testid="card">Info</Card>);
    const card = screen.getByTestId('card');
    expect(card.style.backgroundColor).toBe('var(--an-color-info)');
    expect(card.className).toContain('text-white');
  });

  it('applies color with elevated variant including shadow', () => {
    renderWithTheme(
      <Card variant="elevated" color="accent" data-testid="card">Accent</Card>,
    );
    const card = screen.getByTestId('card');
    expect(card.style.backgroundColor).toBe('var(--an-color-accent)');
    expect(card.className).toContain('shadow-[var(--an-shadow-md)]');
  });
});
