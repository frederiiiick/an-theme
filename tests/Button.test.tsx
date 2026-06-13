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

  it('applies solid variant with inline background color', () => {
    renderWithTheme(<Button variant="solid" color="primary">Solid</Button>);
    const button = screen.getByRole('button');
    expect(button.style.backgroundColor).toBe('var(--an-color-primary)');
    expect(button.className).toContain('text-white');
  });

  it('applies outline variant with inline border and text color', () => {
    renderWithTheme(<Button variant="outline" color="info">Outline</Button>);
    const button = screen.getByRole('button');
    expect(button.style.borderColor).toBe('var(--an-color-info)');
    expect(button.style.color).toBe('var(--an-color-info)');
    expect(button.className).toContain('border-2');
  });

  it('applies ghost variant', () => {
    renderWithTheme(<Button variant="ghost">Ghost</Button>);
    const button = screen.getByRole('button');
    expect(button.className).toContain('bg-transparent');
  });

  it('applies link variant', () => {
    renderWithTheme(<Button variant="link" color="secondary">Link</Button>);
    const button = screen.getByRole('button');
    expect(button.style.color).toBe('var(--an-color-secondary)');
    expect(button.className).toContain('rounded-none');
  });

  it('applies size classes', () => {
    renderWithTheme(<Button size="lg">Large</Button>);
    const button = screen.getByRole('button');
    expect(button.className).toContain('h-12');
  });

  it('renders left and right icons', () => {
    renderWithTheme(
      <Button leftIcon={<span data-testid="left-icon">L</span>} rightIcon={<span data-testid="right-icon">R</span>}>
        Text
      </Button>,
    );
    expect(screen.getByTestId('left-icon')).toBeInTheDocument();
    expect(screen.getByTestId('right-icon')).toBeInTheDocument();
  });

  it('applies iconOnly sizing', () => {
    renderWithTheme(<Button iconOnly size="md" leftIcon={<span>+</span>}>plus</Button>);
    const button = screen.getByRole('button');
    expect(button.className).toContain('w-10');
    expect(button.className).toContain('h-10');
  });

  it('merges custom className', () => {
    renderWithTheme(<Button className="custom-class">Custom</Button>);
    expect(screen.getByRole('button').className).toContain('custom-class');
  });
});
