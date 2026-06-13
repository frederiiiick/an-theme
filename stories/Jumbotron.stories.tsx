import type { Meta, StoryObj } from '@storybook/react';
import { Jumbotron } from '../src/components/Jumbotron';

const meta: Meta<typeof Jumbotron> = {
  title: 'Components/Jumbotron',
  component: Jumbotron,
  tags: ['autodocs'],
  argTypes: {
    chunkSize: {
      control: 'select',
      options: [1, 2, 3],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    text: 'Toradora',
  },
};

export const SyllableAware: Story = {
  name: 'Syllable-Aware Split (chunkSize 3)',
  args: {
    text: 'Toradora',
    chunkSize: 3,
  },
};

export const ManualChunks: Story = {
  name: 'Manual Chunks Override',
  args: {
    text: 'Toradora',
    chunks: ['To', 'ra', 'do', 'ra!'],
  },
};

export const CustomChunkSize: Story = {
  name: 'Chunk Size 3 (AnTheme)',
  args: {
    text: 'AnTheme',
    chunkSize: 3,
  },
};

export const WithSpaces: Story = {
  name: 'With Spaces (Blank Circles)',
  args: {
    text: 'An theme',
    chunkSize: 2,
  },
};

export const SingleCharacter: Story = {
  name: 'Single Character Chunks',
  args: {
    text: 'TORA',
    chunkSize: 1,
  },
};

export const Large: Story = {
  args: {
    text: 'Tora',
    size: 'lg',
  },
};

export const Small: Story = {
  args: {
    text: 'Toradora',
    size: 'sm',
  },
};

export const WithLabelTop: Story = {
  name: 'Curved Label (Top)',
  decorators: [(Story) => <div style={{ paddingTop: '20px' }}><Story /></div>],
  args: {
    text: 'Toradora',
    label: 'Tiger x Dragon',
    size: 'lg',
  },
};

export const SingleCircleWithLabel: Story = {
  name: 'Single Circle + Label (Parking Sign Style)',
  decorators: [(Story) => <div style={{ paddingTop: '20px' }}><Story /></div>],
  args: {
    text: 'P',
    chunkSize: 1,
    label: 'ポータブル',
    size: 'lg',
    colors: ['--an-color-success'],
  },
};

export const AllSizes: Story = {
  name: 'Size Comparison',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <p style={{ margin: '0 0 8px', fontWeight: 'bold' }}>Small</p>
        <Jumbotron text="Toradora" size="sm" />
      </div>
      <div>
        <p style={{ margin: '0 0 8px', fontWeight: 'bold' }}>Medium</p>
        <Jumbotron text="Toradora" size="md" />
      </div>
      <div>
        <p style={{ margin: '0 0 8px', fontWeight: 'bold' }}>Large</p>
        <Jumbotron text="Toradora" size="lg" />
      </div>
    </div>
  ),
};
