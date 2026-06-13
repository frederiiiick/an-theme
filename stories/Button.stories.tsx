import type { Meta, StoryObj } from '@storybook/react';
import { Heart, ArrowRight, Star, Send, Plus, Trash2, Download } from 'lucide-react';
import { Button } from '../src/components/Button';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['solid', 'outline', 'ghost', 'link'],
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'accent', 'info', 'success', 'warning', 'pink'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    iconOnly: { control: 'boolean' },
    animate: { control: 'boolean' },
    loading: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Solid: Story = {
  args: {
    children: 'Solid Button',
    variant: 'solid',
    color: 'primary',
  },
};

export const Outline: Story = {
  args: {
    children: 'Outline Button',
    variant: 'outline',
    color: 'primary',
  },
};

export const Ghost: Story = {
  args: {
    children: 'Ghost Button',
    variant: 'ghost',
    color: 'primary',
  },
};

export const Link: Story = {
  args: {
    children: 'Link Button',
    variant: 'link',
    color: 'primary',
  },
};

export const AllColors: Story = {
  name: 'All Colors (Solid)',
  render: () => (
    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
      <Button color="primary">Primary</Button>
      <Button color="secondary">Secondary</Button>
      <Button color="accent">Accent</Button>
      <Button color="info">Info</Button>
      <Button color="success">Success</Button>
      <Button color="warning">Warning</Button>
      <Button color="pink">Pink</Button>
    </div>
  ),
};

export const AllColorsOutline: Story = {
  name: 'All Colors (Outline)',
  render: () => (
    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
      <Button variant="outline" color="primary">Primary</Button>
      <Button variant="outline" color="secondary">Secondary</Button>
      <Button variant="outline" color="accent">Accent</Button>
      <Button variant="outline" color="info">Info</Button>
      <Button variant="outline" color="success">Success</Button>
      <Button variant="outline" color="warning">Warning</Button>
      <Button variant="outline" color="pink">Pink</Button>
    </div>
  ),
};

export const WithLeftIcon: Story = {
  args: {
    children: 'Like',
    leftIcon: <Heart size={16} />,
    variant: 'solid',
    color: 'pink',
  },
};

export const WithRightIcon: Story = {
  args: {
    children: 'Next',
    rightIcon: <ArrowRight size={16} />,
    variant: 'solid',
    color: 'primary',
  },
};

export const WithBothIcons: Story = {
  args: {
    children: 'Send',
    leftIcon: <Star size={16} />,
    rightIcon: <Send size={16} />,
    variant: 'solid',
    color: 'accent',
  },
};

export const IconOnly: Story = {
  name: 'Icon Only',
  render: () => (
    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
      <Button iconOnly size="sm" color="primary" leftIcon={<Plus size={14} />}>+</Button>
      <Button iconOnly size="md" color="secondary" leftIcon={<Heart size={18} />}>heart</Button>
      <Button iconOnly size="lg" color="info" leftIcon={<Download size={20} />}>dl</Button>
      <Button iconOnly variant="outline" color="pink" leftIcon={<Trash2 size={18} />}>del</Button>
      <Button iconOnly variant="ghost" color="accent" leftIcon={<Star size={18} />}>star</Button>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
    </div>
  ),
};

export const Loading: Story = {
  args: {
    children: 'Loading...',
    loading: true,
  },
};

export const Disabled: Story = {
  args: {
    children: 'Disabled',
    disabled: true,
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
      <Button variant="solid">Solid</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="link">Link</Button>
    </div>
  ),
};

export const HoverPulseDemo: Story = {
  name: 'Hover Pulse Effect',
  render: () => (
    <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center' }}>
      <Button color="primary">Hover me</Button>
      <Button color="secondary">Hover me</Button>
      <Button color="info">Hover me</Button>
      <Button variant="outline" color="pink">Hover me</Button>
    </div>
  ),
};
