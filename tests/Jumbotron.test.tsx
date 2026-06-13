import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Jumbotron } from '../src/components/Jumbotron';
import { AnThemeProvider } from '../src/providers';

function renderWithTheme(ui: React.ReactElement) {
  return render(<AnThemeProvider theme="tora">{ui}</AnThemeProvider>);
}

function getCircles(container: HTMLElement) {
  return container.querySelectorAll('.rounded-full');
}

describe('Jumbotron', () => {
  it('renders the correct number of circles for given text', () => {
    renderWithTheme(<Jumbotron text="Toradora" data-testid="jumbotron" />);
    const container = screen.getByTestId('jumbotron');
    expect(getCircles(container).length).toBe(4);
  });

  it('syllable-aware split produces sensible chunks', () => {
    renderWithTheme(<Jumbotron text="Toradora" data-testid="jumbotron" />);
    expect(screen.getByText('To')).toBeInTheDocument();
    expect(screen.getAllByText('ra')).toHaveLength(2);
    expect(screen.getByText('do')).toBeInTheDocument();
  });

  it('respects manual chunks prop', () => {
    renderWithTheme(
      <Jumbotron text="Toradora" chunks={['To', 'ra', 'do', 'ra!']} data-testid="jumbotron" />,
    );
    expect(screen.getByText('To')).toBeInTheDocument();
    expect(screen.getByText('ra!')).toBeInTheDocument();
  });

  it('respects custom chunkSize with syllable-aware split', () => {
    renderWithTheme(<Jumbotron text="AnTheme" chunkSize={3} data-testid="jumbotron" />);
    const container = screen.getByTestId('jumbotron');
    expect(getCircles(container).length).toBeGreaterThanOrEqual(2);
  });

  it('spaces produce blank circles with no text content', () => {
    renderWithTheme(<Jumbotron text="A " chunkSize={1} data-testid="jumbotron" />);
    const container = screen.getByTestId('jumbotron');
    const circles = getCircles(container);
    expect(circles.length).toBe(2);
    expect(screen.getByText('A')).toBeInTheDocument();
    expect(circles[1].textContent).toBe('');
    expect(circles[1]).toHaveAttribute('aria-hidden', 'true');
  });

  it('applies cycling colors via inline style', () => {
    renderWithTheme(<Jumbotron text="ABCD" chunkSize={1} data-testid="jumbotron" />);
    const container = screen.getByTestId('jumbotron');
    const circles = getCircles(container);
    expect((circles[0] as HTMLElement).style.backgroundColor).toContain('var(--an-color-primary)');
    expect((circles[1] as HTMLElement).style.backgroundColor).toContain('var(--an-color-secondary)');
  });

  it('applies size styles', () => {
    renderWithTheme(<Jumbotron text="To" size="lg" data-testid="jumbotron" />);
    const container = screen.getByTestId('jumbotron');
    const circle = getCircles(container)[0];
    expect(circle.className).toContain('w-24');
    expect(circle.className).toContain('h-24');
  });

  it('applies small size styles', () => {
    renderWithTheme(<Jumbotron text="To" size="sm" data-testid="jumbotron" />);
    const container = screen.getByTestId('jumbotron');
    const circle = getCircles(container)[0];
    expect(circle.className).toContain('w-12');
    expect(circle.className).toContain('h-12');
  });

  it('applies chunk-size-aware font sizing', () => {
    renderWithTheme(<Jumbotron text="Toradora" chunkSize={2} size="md" data-testid="jumbotron" />);
    const textEl = screen.getByText('To');
    expect(textEl.style.fontSize).toBe('3.5rem');
  });

  it('applies chunkSize 3 font sizing', () => {
    renderWithTheme(<Jumbotron text="AnTheme" chunkSize={3} size="lg" data-testid="jumbotron" />);
    const container = screen.getByTestId('jumbotron');
    const spans = container.querySelectorAll('span');
    expect((spans[0] as HTMLElement).style.fontSize).toBe('3.8rem');
  });

  it('renders curved label on the middle circle', () => {
    renderWithTheme(
      <Jumbotron text="ABCDE" chunkSize={1} label="test label" data-testid="jumbotron" />,
    );
    const container = screen.getByTestId('jumbotron');
    const svg = container.querySelector('svg');
    expect(svg).not.toBeNull();
    expect(container.textContent).toContain('test label');
    const wrappers = container.children;
    const svgParent = svg!.closest('[class*="relative"]');
    expect(svgParent).toBe(wrappers[2]);
  });

  it('renders label on 2nd circle for even count', () => {
    renderWithTheme(
      <Jumbotron text="ABCD" chunkSize={1} label="even" data-testid="jumbotron" />,
    );
    const container = screen.getByTestId('jumbotron');
    const svg = container.querySelector('svg');
    expect(svg).not.toBeNull();
    const wrappers = container.children;
    const svgParent = svg!.closest('[class*="relative"]');
    expect(svgParent).toBe(wrappers[1]);
  });
});
