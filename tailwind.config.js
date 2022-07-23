module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
    colors: {
      'my-border-color': '#C4C4C4',
      'my-border-sidebar-color': '#E7E7E7',
      'my-hover-workspace-color': '#F5F5F5',
      'my-accent-color': '#28A1FF',
      'my-gray-color': '#747474',
      'my-sidebar-color': '#FAFBFC',
      'my-sidebar-text-color': '#989BA1',
    },
  },
  plugins: [],
  variants: {
    extend: {
      display: ['group-hover', 'hover'],
    },
  },
};
