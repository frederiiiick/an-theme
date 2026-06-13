import type { Meta, StoryObj } from '@storybook/react-vite';
import { Card } from '../src/components/Card';

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'glass', 'elevated'],
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
        <p style={{ margin: 0, color: 'var(--an-color-text-muted)' }}>
          A simple card with a border.
        </p>
      </div>
    ),
    variant: 'default',
  },
};

export const Glass: Story = {
  args: {
    children: (
      <div>
        <h3 style={{ margin: '0 0 8px', fontFamily: 'var(--an-font-heading)' }}>
          Glass Card
        </h3>
        <p style={{ margin: 0, color: 'var(--an-color-text-muted)' }}>
          Glassmorphism with backdrop blur.
        </p>
      </div>
    ),
    variant: 'glass',
  },
  decorators: [
    (Story) => (
      <div
        style={{
          background: 'linear-gradient(135deg, var(--an-color-primary), var(--an-color-secondary))',
          padding: '48px',
          borderRadius: '16px',
        }}
      >
        <Story />
      </div>
    ),
  ],
};

export const Elevated: Story = {
  args: {
    children: (
      <div>
        <h3 style={{ margin: '0 0 8px', fontFamily: 'var(--an-font-heading)' }}>
          Elevated Card
        </h3>
        <p style={{ margin: 0, color: 'var(--an-color-text-muted)' }}>
          Raised with a shadow for emphasis.
        </p>
      </div>
    ),
    variant: 'elevated',
  },
};

export const Hoverable: Story = {
  args: {
    children: (
      <div>
        <h3 style={{ margin: '0 0 8px', fontFamily: 'var(--an-font-heading)' }}>
          Hoverable Card
        </h3>
        <p style={{ margin: 0, color: 'var(--an-color-text-muted)' }}>
          Hover me for an interaction effect.
        </p>
      </div>
    ),
    variant: 'elevated',
    hoverable: true,
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: '16px', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))' }}>
      <Card variant="default">
        <h3 style={{ margin: '0 0 8px' }}>Default</h3>
        <p style={{ margin: 0 }}>Simple bordered card</p>
      </Card>
      <Card variant="glass">
        <h3 style={{ margin: '0 0 8px' }}>Glass</h3>
        <p style={{ margin: 0 }}>Translucent backdrop</p>
      </Card>
      <Card variant="elevated">
        <h3 style={{ margin: '0 0 8px' }}>Elevated</h3>
        <p style={{ margin: 0 }}>Shadow emphasis</p>
      </Card>
    </div>
  ),
};
