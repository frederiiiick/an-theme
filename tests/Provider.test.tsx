import { render, screen, act } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { AnThemeProvider } from '../src/providers';
import { useAnTheme } from '../src/hooks/use-an-theme';

function ThemeDisplay() {
  const { theme, themeId, setTheme } = useAnTheme();
  return (
    <div>
      <span data-testid="theme-id">{themeId}</span>
      <span data-testid="theme-name">{theme.name}</span>
      <span data-testid="primary-color">{theme.colors.primary}</span>
      <button onClick={() => setTheme('spy')}>Switch to Spy</button>
    </div>
  );
}

describe('AnThemeProvider', () => {
  it('provides tora theme by default', () => {
    render(
      <AnThemeProvider>
        <ThemeDisplay />
      </AnThemeProvider>,
    );
    expect(screen.getByTestId('theme-id').textContent).toBe('tora');
    expect(screen.getByTestId('theme-name').textContent).toBe('Tora');
    expect(screen.getByTestId('primary-color').textContent).toBe('#FD9450');
  });

  it('provides spy theme when specified', () => {
    render(
      <AnThemeProvider theme="spy">
        <ThemeDisplay />
      </AnThemeProvider>,
    );
    expect(screen.getByTestId('theme-id').textContent).toBe('spy');
    expect(screen.getByTestId('primary-color').textContent).toBe('#57675C');
  });

  it('sets data-an-theme attribute on container', () => {
    const { container } = render(
      <AnThemeProvider theme="tora">
        <div>Content</div>
      </AnThemeProvider>,
    );
    const themeContainer = container.querySelector('[data-an-theme="tora"]');
    expect(themeContainer).toBeTruthy();
  });

  it('allows theme switching', async () => {
    render(
      <AnThemeProvider theme="tora">
        <ThemeDisplay />
      </AnThemeProvider>,
    );

    expect(screen.getByTestId('theme-id').textContent).toBe('tora');

    await act(async () => {
      screen.getByRole('button', { name: 'Switch to Spy' }).click();
    });

    expect(screen.getByTestId('theme-id').textContent).toBe('spy');
    expect(screen.getByTestId('primary-color').textContent).toBe('#57675C');
  });
});
