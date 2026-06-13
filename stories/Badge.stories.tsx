import type { Meta, StoryObj } from '@storybook/react-vite';
import { Badge } from '../src/components/Badge';

const meta: Meta<typeof Badge> = {
  title: 'Components/Badge',
  component: Badge,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'outline', 'soft'],
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'accent', 'success', 'warning', 'danger'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Badge',
    variant: 'default',
    color: 'primary',
  },
};

export const Outline: Story = {
  args: {
    children: 'Outline',
    variant: 'outline',
    color: 'primary',
  },
};

export const Soft: Story = {
  args: {
    children: 'Soft',
    variant: 'soft',
    color: 'primary',
  },
};

export const AllColors: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
      <Badge color="primary">Primary</Badge>
      <Badge color="secondary">Secondary</Badge>
      <Badge color="accent">Accent</Badge>
      <Badge color="success">Success</Badge>
      <Badge color="warning">Warning</Badge>
      <Badge color="danger">Danger</Badge>
    </div>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
      <Badge variant="default" color="primary">Default</Badge>
      <Badge variant="outline" color="primary">Outline</Badge>
      <Badge variant="soft" color="primary">Soft</Badge>
    </div>
  ),
};

export const SoftColors: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
      <Badge variant="soft" color="primary">Primary</Badge>
      <Badge variant="soft" color="secondary">Secondary</Badge>
      <Badge variant="soft" color="accent">Accent</Badge>
      <Badge variant="soft" color="success">Success</Badge>
      <Badge variant="soft" color="warning">Warning</Badge>
      <Badge variant="soft" color="danger">Danger</Badge>
    </div>
  ),
};
