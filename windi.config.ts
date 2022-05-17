import { defineConfig } from 'windicss/helpers';

function generateColorsBySemi() {
  const disc = {
    // static colors
    white: 'rgba(var(--semi-white), 1)',
    black: 'rgba(var(--semi-black), 1)',
  };

  (function buildTypes(types: string[], noDisable: string[]) {
    types.forEach((t) => {
      // to text-#{t}-hover, bg-#{t}-active, border-#{t}-light, ...
      disc[t] = {
        DEFAULT: `var(--semi-color-${t})`,
        hover: `var(--semi-color-${t}-hover)`,
        active: `var(--semi-color-${t}-active)`,
        ...(!noDisable.includes(t) && {
          disabled: `var(--semi-color-${t}-disabled)`,
        }),
        light: `var(--semi-color-${t}-light-default)`,
        'light-hover': `var(--semi-color-${t}-light-hover)`,
        'light-active': `var(--semi-color-${t}-light-active)`,
      };
    });
  })(['primary', 'secondary', 'tertiary', 'info', 'success', 'warning', 'danger'], ['tertiary', 'warning', 'danger']);

  (function buildColors(colors: string[]) {
    const levels = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    colors.forEach((c) => {
      // to text-#{t}-1, bg-#{t}-2, border-#{t}-3, ...
      disc[c] = Object.assign(
        {
          DEFAULT: `rgba(var(--semi-${c}-5), 1)`,
        },
        ...levels.map((l) => ({ [l]: `rgba(var(--semi-${c}-${l}), 1)` })),
      );
    });
  })([
    'red',
    'pink',
    'purple',
    'violet',
    'indigo',
    'blue',
    'light-blue',
    'cyan',
    'teal',
    'green',
    'light-green',
    'lime',
    'yellow',
    'amber',
    'orange',
    'grey',
  ]);

  return disc;
}

export default defineConfig({
  extract: {
    include: ['**/*.{jsx,tsx,css}'],
    exclude: ['node_modules', '.git', '.next'],
  },
  darkMode: 'class',
  theme: {
    // "spacing" by padding,margin,width,height
    padding: {
      xs: '4px',
      sm: '8px',
      md: '16px',
      lg: '32px',
      xl: '64px',
    },
    margin: {
      xs: '4px',
      sm: '8px',
      md: '16px',
      lg: '32px',
      xl: '64px',
    },
    colors: generateColorsBySemi(),
    screens: {
      sm: '640px',
      // => @media (min-width: 640px) { ... }

      md: '768px',
      // => @media (min-width: 768px) { ... }

      lg: '1024px',
      // => @media (min-width: 1024px) { ... }

      xl: '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
    },
  },
  shortcuts: {},
});
