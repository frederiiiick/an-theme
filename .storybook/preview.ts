import type { Preview } from '@storybook/react-vite';
import React from 'react';
import '../tailwind.css';
import { AnThemeProvider } from '../src/providers';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  globalTypes: {
    theme: {
      description: 'An-theme active theme',
      toolbar: {
        title: 'Theme',
        icon: 'paintbrush',
        items: [
          { value: 'tora', title: 'Tora (Toradora)' },
          { value: 'spy', title: 'Spy (Spy x Family)' },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: {
    theme: 'tora',
  },
  decorators: [
    (Story, context) => {
      const theme = context.globals.theme || 'tora';
      return React.createElement(
        AnThemeProvider,
        { theme },
        React.createElement(Story),
      );
    },
  ],
};

export default preview;
