import type { Meta, StoryObj } from '@storybook/react';
import { Card } from '../src/components/Card';
import { Badge } from '../src/components/Badge';
import { Button } from '../src/components/Button';

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'pattern', 'elevated', 'striped'],
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'accent', 'info', 'success', 'warning', 'pink'],
    },
    hoverable: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: (
      <div>
        <h3 style={{ margin: '0 0 8px', fontFamily: 'var(--an-font-heading)' }}>
          Default Card
        </h3>
        <p style={{ margin: 0, opacity: 0.85 }}>
          Flat solid color, clean and bold.
        </p>
      </div>
    ),
    variant: 'default',
    color: 'primary',
  },
};

export const Pattern: Story = {
  name: 'Pattern (Dotted)',
  args: {
    children: (
      <div>
        <h3 style={{ margin: '0 0 8px', fontFamily: 'var(--an-font-heading)', fontSize: '1.5rem' }}>
          Toradora!
        </h3>
        <p style={{ margin: 0, opacity: 0.85 }}>
          Solid color with fading dot pattern overlay.
        </p>
      </div>
    ),
    variant: 'pattern',
    color: 'primary',
  },
};

export const PatternColors: Story = {
  name: 'Pattern (Different Colors)',
  render: () => (
    <div style={{ display: 'grid', gap: '16px', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))' }}>
      <Card variant="pattern" color="primary">
        <h3 style={{ margin: '0 0 8px' }}>Primary</h3>
        <p style={{ margin: 0, opacity: 0.8 }}>Orange dot pattern</p>
      </Card>
      <Card variant="pattern" color="secondary">
        <h3 style={{ margin: '0 0 8px' }}>Secondary</h3>
        <p style={{ margin: 0, opacity: 0.8 }}>Pink dot pattern</p>
      </Card>
      <Card variant="pattern" color="info">
        <h3 style={{ margin: '0 0 8px' }}>Info</h3>
        <p style={{ margin: 0, opacity: 0.8 }}>Blue dot pattern</p>
      </Card>
    </div>
  ),
};

export const Elevated: Story = {
  args: {
    children: (
      <div>
        <h3 style={{ margin: '0 0 8px', fontFamily: 'var(--an-font-heading)' }}>
          Elevated Card
        </h3>
        <p style={{ margin: 0, opacity: 0.85 }}>
          Glossy laminated finish with highlight and depth.
        </p>
      </div>
    ),
    variant: 'elevated',
    color: 'secondary',
  },
};

export const Hoverable: Story = {
  args: {
    children: (
      <div>
        <h3 style={{ margin: '0 0 8px', fontFamily: 'var(--an-font-heading)' }}>
          Hoverable Card
        </h3>
        <p style={{ margin: 0, opacity: 0.85 }}>
          Hover me for an interaction effect.
        </p>
      </div>
    ),
    variant: 'elevated',
    color: 'accent',
    hoverable: true,
  },
};

export const PatternWithContent: Story = {
  name: 'Pattern Card with Components',
  render: () => (
    <Card variant="pattern" color="secondary">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <Badge variant="soft" color="accent">Featured</Badge>
        <h2 style={{ margin: 0, fontFamily: 'var(--an-font-heading)', fontSize: '2rem' }}>
          Tiger & Dragon
        </h2>
        <p style={{ margin: 0, opacity: 0.8 }}>
          A warm, playful anime-inspired design.
        </p>
        <div style={{ display: 'flex', gap: '8px' }}>
          <Button variant="outline" size="sm" className="border-white/50 text-white hover:border-white hover:text-white">
            Learn More
          </Button>
        </div>
      </div>
    </Card>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: '16px', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))' }}>
      <Card variant="default" color="primary">
        <h3 style={{ margin: '0 0 8px' }}>Default</h3>
        <p style={{ margin: 0, opacity: 0.8 }}>Flat solid, no overlay</p>
      </Card>
      <Card variant="pattern" color="secondary">
        <h3 style={{ margin: '0 0 8px' }}>Pattern (Dotted)</h3>
        <p style={{ margin: 0, opacity: 0.8 }}>Solid color + dot fade</p>
      </Card>
      <Card variant="elevated" color="info">
        <h3 style={{ margin: '0 0 8px' }}>Elevated</h3>
        <p style={{ margin: 0, opacity: 0.8 }}>Shadow + inner glow</p>
      </Card>
      <Card variant="striped">
        <h3 style={{ margin: '0 0 8px' }}>Striped</h3>
        <p style={{ margin: 0, opacity: 0.8 }}>White + diagonal bands</p>
      </Card>
    </div>
  ),
};

export const ColoredCards: Story = {
  name: 'All Colors',
  render: () => (
    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
      <Card color="primary" style={{ width: 120, height: 120, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <span style={{ fontSize: '2rem', fontWeight: 'bold' }}>To</span>
      </Card>
      <Card color="secondary" style={{ width: 120, height: 120, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <span style={{ fontSize: '2rem', fontWeight: 'bold' }}>ra</span>
      </Card>
      <Card color="info" style={{ width: 120, height: 120, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <span style={{ fontSize: '2rem', fontWeight: 'bold' }}>do</span>
      </Card>
      <Card color="accent" style={{ width: 120, height: 120, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <span style={{ fontSize: '2rem', fontWeight: 'bold' }}>ra</span>
      </Card>
      <Card color="pink" style={{ width: 120, height: 120, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <span style={{ fontSize: '2rem', fontWeight: 'bold' }}>!</span>
      </Card>
      <Card color="success" style={{ width: 120, height: 120, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <span style={{ fontSize: '1rem', fontWeight: 'bold' }}>success</span>
      </Card>
      <Card color="warning" style={{ width: 120, height: 120, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <span style={{ fontSize: '1rem', fontWeight: 'bold' }}>warning</span>
      </Card>
    </div>
  ),
};

export const Striped: Story = {
  name: 'Striped (Default)',
  args: {
    children: (
      <div>
        <h3 style={{ margin: '0 0 8px', fontFamily: 'var(--an-font-heading)', fontSize: '1.5rem' }}>
          Tiger x Dragon
        </h3>
        <p style={{ margin: 0, opacity: 0.8 }}>
          White card with diagonal stripes.
        </p>
      </div>
    ),
    variant: 'striped',
  },
};

export const StripedColors: Story = {
  name: 'Striped (Different Colors)',
  render: () => (
    <div style={{ display: 'grid', gap: '16px', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))' }}>
      <Card variant="striped" color="secondary">
        <h3 style={{ margin: '0 0 8px' }}>Secondary</h3>
        <p style={{ margin: 0, opacity: 0.7 }}>Pink bg, stripes on top</p>
      </Card>
      <Card variant="striped" color="info">
        <h3 style={{ margin: '0 0 8px' }}>Info</h3>
        <p style={{ margin: 0, opacity: 0.7 }}>Blue bg, info stripe becomes white</p>
      </Card>
      <Card variant="striped" color="accent">
        <h3 style={{ margin: '0 0 8px' }}>Accent</h3>
        <p style={{ margin: 0, opacity: 0.7 }}>Gold bg, accent stripe becomes white</p>
      </Card>
    </div>
  ),
};

export const StripedHoverable: Story = {
  name: 'Striped (Hoverable)',
  args: {
    children: (
      <div>
        <h3 style={{ margin: '0 0 8px', fontFamily: 'var(--an-font-heading)', fontSize: '1.25rem' }}>
          Hover me
        </h3>
        <p style={{ margin: 0, opacity: 0.7 }}>
          Interactive striped card with hover lift.
        </p>
      </div>
    ),
    variant: 'striped',
    hoverable: true,
  },
};
