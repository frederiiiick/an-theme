import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { Button } from '../src/components/Button';
import { AnThemeProvider } from '../src/providers';

function renderWithTheme(ui: React.ReactElement, theme: 'tora' | 'spy' = 'tora') {
  return render(<AnThemeProvider theme={theme}>{ui}</AnThemeProvider>);
}

describe('Button', () => {
  it('renders with children', () => {
    renderWithTheme(<Button>Click me</Button>);
    expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument();
  });

  it('handles click events', async () => {
    const onClick = vi.fn();
    renderWithTheme(<Button onClick={onClick}>Click</Button>);
    await userEvent.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('is disabled when disabled prop is true', () => {
    renderWithTheme(<Button disabled>Disabled</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('is disabled when loading', () => {
    renderWithTheme(<Button loading>Loading</Button>);
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
    expect(button).toHaveAttribute('aria-busy', 'true');
  });

  it('applies variant classes', () => {
    const { rerender } = render(
      <AnThemeProvider theme="tora">
        <Button variant="primary">Primary</Button>
      </AnThemeProvider>,
    );
    const button = screen.getByRole('button');
    expect(button.className).toContain('bg-[var(--an-color-primary)]');

    rerender(
      <AnThemeProvider theme="tora">
        <Button variant="outline">Outline</Button>
      </AnThemeProvider>,
    );
    const outlineBtn = screen.getByRole('button');
    expect(outlineBtn.className).toContain('border-2');
  });

  it('applies size classes', () => {
    renderWithTheme(<Button size="lg">Large</Button>);
    const button = screen.getByRole('button');
    expect(button.className).toContain('h-12');
  });

  it('merges custom className', () => {
    renderWithTheme(<Button className="custom-class">Custom</Button>);
    expect(screen.getByRole('button').className).toContain('custom-class');
  });
});
