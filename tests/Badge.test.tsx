import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
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

  it('applies solid variant with inline background color', () => {
    renderWithTheme(<Badge data-testid="badge">Tag</Badge>);
    const badge = screen.getByTestId('badge');
    expect(badge.style.backgroundColor).toBe('var(--an-color-primary)');
    expect(badge.className).toContain('text-white');
  });

  it('applies outline variant with inline border and text color', () => {
    renderWithTheme(
      <Badge variant="outline" color="info" data-testid="badge">Outline</Badge>,
    );
    const badge = screen.getByTestId('badge');
    expect(badge.style.borderColor).toBe('var(--an-color-info)');
    expect(badge.style.color).toBe('var(--an-color-info)');
    expect(badge.className).toContain('border');
  });

  it('applies soft variant with color overlay', () => {
    renderWithTheme(
      <Badge variant="soft" color="secondary" data-testid="badge">Soft</Badge>,
    );
    const badge = screen.getByTestId('badge');
    expect(badge.style.color).toBe('var(--an-color-secondary)');
    const overlay = badge.querySelector('.absolute');
    expect(overlay).not.toBeNull();
    expect((overlay as HTMLElement).style.backgroundColor).toBe('var(--an-color-secondary)');
  });

  it('applies dot variant with colored indicator', () => {
    renderWithTheme(
      <Badge variant="dot" color="success" data-testid="badge">Online</Badge>,
    );
    const badge = screen.getByTestId('badge');
    const dot = badge.querySelector('.rounded-full');
    expect(dot).not.toBeNull();
    expect((dot as HTMLElement).style.backgroundColor).toBe('var(--an-color-success)');
  });

  it('renders left and right icons', () => {
    renderWithTheme(
      <Badge leftIcon={<span data-testid="left">L</span>} rightIcon={<span data-testid="right">R</span>}>
        With Icons
      </Badge>,
    );
    expect(screen.getByTestId('left')).toBeInTheDocument();
    expect(screen.getByTestId('right')).toBeInTheDocument();
  });

  it('renders remove button when removable', async () => {
    const onRemove = vi.fn();
    renderWithTheme(
      <Badge removable onRemove={onRemove} data-testid="badge">Removable</Badge>,
    );
    const removeBtn = screen.getByRole('button', { name: 'Remove' });
    expect(removeBtn).toBeInTheDocument();
    await userEvent.click(removeBtn);
    expect(onRemove).toHaveBeenCalledTimes(1);
  });

  it('applies different color tokens via inline style', () => {
    renderWithTheme(
      <Badge color="pink" data-testid="badge">Pink</Badge>,
    );
    const badge = screen.getByTestId('badge');
    expect(badge.style.backgroundColor).toBe('var(--an-color-pink)');
  });

  it('merges custom className', () => {
    renderWithTheme(<Badge className="extra" data-testid="badge">Custom</Badge>);
    expect(screen.getByTestId('badge').className).toContain('extra');
  });
});
