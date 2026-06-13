import type { Meta, StoryObj } from '@storybook/react';
import { Star, Zap, Check, AlertCircle, Bell } from 'lucide-react';
import { Badge } from '../src/components/Badge';

const meta: Meta<typeof Badge> = {
  title: 'Components/Badge',
  component: Badge,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['solid', 'outline', 'soft', 'dot'],
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'accent', 'info', 'success', 'warning', 'pink'],
    },
    removable: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Solid: Story = {
  args: {
    children: 'Badge',
    variant: 'solid',
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

export const Dot: Story = {
  args: {
    children: 'Active',
    variant: 'dot',
    color: 'success',
  },
};

export const AllColorsSolid: Story = {
  name: 'All Colors (Solid)',
  render: () => (
    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
      <Badge color="primary">Primary</Badge>
      <Badge color="secondary">Secondary</Badge>
      <Badge color="accent">Accent</Badge>
      <Badge color="info">Info</Badge>
      <Badge color="success">Success</Badge>
      <Badge color="warning">Warning</Badge>
      <Badge color="pink">Pink</Badge>
    </div>
  ),
};

export const AllColorsOutline: Story = {
  name: 'All Colors (Outline)',
  render: () => (
    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
      <Badge variant="outline" color="primary">Primary</Badge>
      <Badge variant="outline" color="secondary">Secondary</Badge>
      <Badge variant="outline" color="accent">Accent</Badge>
      <Badge variant="outline" color="info">Info</Badge>
      <Badge variant="outline" color="success">Success</Badge>
      <Badge variant="outline" color="warning">Warning</Badge>
      <Badge variant="outline" color="pink">Pink</Badge>
    </div>
  ),
};

export const AllColorsSoft: Story = {
  name: 'All Colors (Soft)',
  render: () => (
    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
      <Badge variant="soft" color="primary">Primary</Badge>
      <Badge variant="soft" color="secondary">Secondary</Badge>
      <Badge variant="soft" color="accent">Accent</Badge>
      <Badge variant="soft" color="info">Info</Badge>
      <Badge variant="soft" color="success">Success</Badge>
      <Badge variant="soft" color="warning">Warning</Badge>
      <Badge variant="soft" color="pink">Pink</Badge>
    </div>
  ),
};

export const AllColorsDot: Story = {
  name: 'All Colors (Dot)',
  render: () => (
    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
      <Badge variant="dot" color="primary">Primary</Badge>
      <Badge variant="dot" color="secondary">Secondary</Badge>
      <Badge variant="dot" color="accent">Accent</Badge>
      <Badge variant="dot" color="info">Info</Badge>
      <Badge variant="dot" color="success">Success</Badge>
      <Badge variant="dot" color="warning">Warning</Badge>
      <Badge variant="dot" color="pink">Pink</Badge>
    </div>
  ),
};

export const WithLeftIcon: Story = {
  name: 'With Left Icon',
  render: () => (
    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
      <Badge color="accent" leftIcon={<Star />}>Featured</Badge>
      <Badge color="info" leftIcon={<Bell />}>Notification</Badge>
      <Badge color="success" leftIcon={<Check />}>Verified</Badge>
    </div>
  ),
};

export const WithRightIcon: Story = {
  name: 'With Right Icon',
  render: () => (
    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
      <Badge color="primary" rightIcon={<Zap />}>Power</Badge>
      <Badge color="warning" rightIcon={<AlertCircle />}>Caution</Badge>
    </div>
  ),
};

export const Removable: Story = {
  name: 'Removable',
  render: () => (
    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
      <Badge color="primary" removable onRemove={() => alert('Removed!')}>Removable</Badge>
      <Badge color="secondary" removable>Tag</Badge>
      <Badge variant="soft" color="info" removable>Filter</Badge>
      <Badge variant="outline" color="pink" removable>Category</Badge>
    </div>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
      <Badge variant="solid" color="primary">Solid</Badge>
      <Badge variant="outline" color="primary">Outline</Badge>
      <Badge variant="soft" color="primary">Soft</Badge>
      <Badge variant="dot" color="primary">Dot</Badge>
    </div>
  ),
};

export const Animated: Story = {
  name: 'Animated Entrance',
  render: () => (
    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
      <Badge color="primary" animate>Animated</Badge>
      <Badge color="secondary" animate>Badges</Badge>
      <Badge color="accent" animate>Scale In</Badge>
      <Badge color="info" animate>On Mount</Badge>
    </div>
  ),
};
