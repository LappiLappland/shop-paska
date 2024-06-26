import defaultTheme from 'tailwindcss/defaultTheme';
import { createThemes } from 'tw-colors';

module.exports = {
  content: ['./src/**/*.{tsx,ts,jsx,js,html}'],
  theme: {
    extend: {
      colors: {
        primary: '#3A608F',
        'on-primary': '#FFFFFF',
        'primary-container': '#D3E3FF',
        'on-primary-container': '#001C39',
        'primary-fixed': '#D3E3FF',
        'on-primary-fixed': '#001C39',
        'on-primary-fixed-dim': '#A4C9FE',
        'on-primary-fixed-variant': '#1F4876',
        secondary: '#555A92',
        'on-secondary': '#FFFFFF',
        'secondary-container': '#E0E0FF',
        'on-secondary-container': '#10144B',
        'secondary-fixed': '#E0E0FF',
        'on-secondary-fixed': '#10144B',
        'secondary-fixed-dim': '#BEC2FF',
        'on-secondary-fixed-variant': '#3D4279',
        tertiary: '#156683',
        'on-tertiary': '#FFFFFF',
        'tertiary-container': '#C0E8FF',
        'on-tertiary-container': '#001F2B',
        'tertiary-fixed': '#C0E8FF',
        'on-tertiary-fixed': '#001F2B',
        'tertiary-fixed-dim': '#8CCFF1',
        'on-tertiary-fixed-variant': '#004D66',
        error: '#BA1A1A',
        'on-error': '#FFFFFF',
        'error-container': '#FFDAD6',
        'on-error-container': '#410002',
        outline: '#73777F',
        background: '#F8F9FF',
        'on-background': '#191C20',
        surface: '#F8F9FF',
        'on-surface': '#191C20',
        'surface-variant': '#DFE2EB',
        'on-surface-variant': '#43474E',
        'inverse-surface': '#2E3035',
        'inverse-on-surface': '#EFF0F7',
        'inverse-primary': '#A4C9FE',
        shadow: '#000000',
        'surface-tint': '#3A608F',
        'outline-variant': '#C3C6CF',
        scrim: '#000000',
        'surface-container-highest': '#E1E2E9',
        'surface-container-high': '#E7E8EE',
        'surface-container': '#EDEDF4',
        'surface-container-low': '#F2F3FA',
        'surface-container-lowest': '#FFFFFF',
        'surface-bright': '#F8F9FF',
        'surface-dim': '#D9DAE0',
      },
      fontFamily: {
        sans: ['Finlandica', ...defaultTheme.fontFamily.sans],
        serif: ['"Brygada 1918"', ...defaultTheme.fontFamily.serif],
        mono: ['"DEC Terminal"', ...defaultTheme.fontFamily.mono],
      },
      fontSize: {
        'display-large': [
          '3.563rem',
          {
            lineHeight: '4rem',
            letterSpacing: '-0.016rem',
            fontWeight: '400',
          },
        ],
        'display-medium': [
          '2.813rem',
          {
            lineHeight: '3.25rem',
            letterSpacing: '0',
            fontWeight: '400',
          },
        ],
        'display-small': [
          '2.25rem',
          {
            lineHeight: '2.75rem',
            letterSpacing: '0',
            fontWeight: '400',
          },
        ],
        'headline-large': [
          '2rem',
          {
            lineHeight: '2.5rem',
            letterSpacing: '0',
            fontWeight: '400',
          },
        ],
        'headline-medium': [
          '1.75rem',
          {
            lineHeight: '2.25rem',
            letterSpacing: '0',
            fontWeight: '400',
          },
        ],
        'headline-small': [
          '1.5rem',
          {
            lineHeight: '2rem',
            letterSpacing: '0',
            fontWeight: '400',
          },
        ],
        'title-large': [
          '1.375rem',
          {
            lineHeight: '1.75rem',
            letterSpacing: '0',
            fontWeight: '400',
          },
        ],
        'title-medium': [
          '1rem',
          {
            lineHeight: '1.5rem',
            letterSpacing: '0.009rem',
            fontWeight: '500',
          },
        ],
        'title-small': [
          '0.875rem',
          {
            lineHeight: '1.25rem',
            letterSpacing: '0.006rem',
            fontWeight: '500',
          },
        ],
        'body-large': [
          '1rem',
          {
            lineHeight: '1.5rem',
            letterSpacing: '0.031rem',
            fontWeight: '400',
          },
        ],
        'body-medium': [
          '0.875rem',
          {
            lineHeight: '1.25rem',
            letterSpacing: '0.016rem',
            fontWeight: '400',
          },
        ],
        'body-small': [
          '0.75rem',
          {
            lineHeight: '1rem',
            letterSpacing: '0.025rem',
            fontWeight: '400',
          },
        ],
        'label-large': [
          '0.875rem',
          {
            lineHeight: '1.25rem',
            letterSpacing: '0.006rem',
            fontWeight: '500',
          },
        ],
        'label-medium': [
          '0.75rem',
          {
            lineHeight: '1rem',
            letterSpacing: '0.031rem',
            fontWeight: '500',
          },
        ],
        'label-small': [
          '0.688rem',
          {
            lineHeight: '1rem',
            letterSpacing: '0.031rem',
            fontWeight: '500',
          },
        ],
      },
      opacity: {
        hovered: '.92',
        focused: '.88',
        pressed: '.84',
        disabled: '.88',
        'hovered-r': '.08',
        'focused-r': '.12',
        'pressed-r': '.16',
        'disabled-r': '.12',
      },
      borderRadius: {
        button: '20px',
      },
      boxShadow: {
        outside:
          '0 20px 12px -16px rgba(0,30,85,.1), 0 8px 24px 18px rgba(0,30,85,.05)',
        'level-1': '0px 5px 10px 1px rgba(0, 0, 0, 0.2)',
        'level-2': '0px 5px 10px 3px rgba(0, 0, 0, 0.2)',
        'level-3': '0px 5px 10px 6px rgba(0, 0, 0, 0.2)',
        'level-4': '0px 5px 10px 8px rgba(0, 0, 0, 0.2)',
        'level-5': '0px 5px 10px 12px rgba(0, 0, 0, 0.2)',
      },
      transitionProperty: {
        height: 'max-height',
        width: 'max-width',
        appear: 'transform, opacity',
      },
      transitionTimingFunction: {
        standart: 'cubic-bezier(0.2, 0.0, 0, 1.0)',
        'standart-declerate': 'cubic-bezier(0, 0, 0, 1)',
        'standart-acclerate': 'cubic-bezier(0.3, 0, 1, 1)',
        'emphasized-declerate': 'cubic-bezier(0.05, 0.7, 0.1, 1.0)',
        'emphasized-acclerate': 'cubic-bezier(0.3, 0.0, 0.8, 0.15)',
      },
      transitionDuration: {
        50: '50ms',
      },
      transitionDelay: {
        50: '50ms',
      },
      animation: {
        appear: 'appear 2s linear forwards',
        disappear: 'appear 2s linear reverse forwards',
        ripple: 'ripple 250ms linear',
      },
      keyframes: {
        appear: {
          '0%': { opacity: 0, visibility: 'hidden' },
          '1%': { visibility: 'visible' },
          '100%': { opacity: 1, visibility: 'visible' },
        },
        ripple: {
          '0%': {
            transform: 'scale(0)',
            opacity: 0.25,
          },
          '100%': {
            transform: 'scale(4)',
            opacity: 0,
          },
        },
      },
    },
  },
  plugins: [
    createThemes(
      {
        light: {
          primary: '#3A608F',
          'on-primary': '#FFFFFF',
          'primary-container': '#D3E3FF',
          'on-primary-container': '#001C39',
          'primary-fixed': '#D3E3FF',
          'on-primary-fixed': '#001C39',
          'on-primary-fixed-dim': '#A4C9FE',
          'on-primary-fixed-variant': '#1F4876',
          secondary: '#555A92',
          'on-secondary': '#FFFFFF',
          'secondary-container': '#E0E0FF',
          'on-secondary-container': '#10144B',
          'secondary-fixed': '#E0E0FF',
          'on-secondary-fixed': '#10144B',
          'secondary-fixed-dim': '#BEC2FF',
          'on-secondary-fixed-variant': '#3D4279',
          tertiary: '#156683',
          'on-tertiary': '#FFFFFF',
          'tertiary-container': '#C0E8FF',
          'on-tertiary-container': '#001F2B',
          'tertiary-fixed': '#C0E8FF',
          'on-tertiary-fixed': '#001F2B',
          'tertiary-fixed-dim': '#8CCFF1',
          'on-tertiary-fixed-variant': '#004D66',
          error: '#BA1A1A',
          'on-error': '#FFFFFF',
          'error-container': '#FFDAD6',
          'on-error-container': '#410002',
          outline: '#73777F',
          background: '#F8F9FF',
          'on-background': '#191C20',
          surface: '#F8F9FF',
          'on-surface': '#191C20',
          'surface-variant': '#DFE2EB',
          'on-surface-variant': '#43474E',
          'inverse-surface': '#2E3035',
          'inverse-on-surface': '#EFF0F7',
          'inverse-primary': '#A4C9FE',
          shadow: '#000000',
          'surface-tint': '#3A608F',
          'outline-variant': '#C3C6CF',
          scrim: '#000000',
          'surface-container-highest': '#E1E2E9',
          'surface-container-high': '#E7E8EE',
          'surface-container': '#EDEDF4',
          'surface-container-low': '#F2F3FA',
          'surface-container-lowest': '#FFFFFF',
          'surface-bright': '#F8F9FF',
          'surface-dim': '#D9DAE0',
        },
        dark: {
          'on-primary': '#A4C9FE',
          primary: '#00315C',
          'primary-container': '#1F4876',
          'on-primary-container': '#D3E3FF',
          'primary-fixed': '#D3E3FF',
          'on-primary-fixed': '#001C39',
          'on-primary-fixed-dim': '#A4C9FE',
          'on-primary-fixed-variant': '#1F4876',
          secondary: '#BEC2FF',
          'on-secondary': '#262B61',
          'secondary-container': '#3D4279',
          'on-secondary-container': '#E0E0FF',
          'secondary-fixed': '#E0E0FF',
          'on-secondary-fixed': '#10144B',
          'secondary-fixed-dim': '#BEC2FF',
          'on-secondary-fixed-variant': '#3D4279',
          tertiary: '#8CCFF1',
          'on-tertiary': '#003547',
          'tertiary-container': '#004D66',
          'on-tertiary-container': '#C0E8FF',
          'tertiary-fixed': '#C0E8FF',
          'on-tertiary-fixed': '#001F2B',
          'tertiary-fixed-dim': '#8CCFF1',
          'on-tertiary-fixed-variant': '#004D66',
          error: '#FFB4AB',
          'on-error': '#690005',
          'error-container': '#93000A',
          'on-error-container': '#FFDAD6',
          outline: '#8D9199',
          background: '#111318',
          'on-background': '#E1E2E9',
          surface: '#111318',
          'on-surface': '#E1E2E9',
          'surface-variant': '#43474E',
          'on-surface-variant': '#C3C6CF',
          'inverse-surface': '#E1E2E9',
          'inverse-on-surface': '#2E3035',
          'inverse-primary': '#3A608F',
          shadow: '#000000',
          'surface-tint': '#A4C9FE',
          'outline-variant': '#43474E',
          scrim: '#000000',
          'surface-container-highest': '#32353A',
          'surface-container-high': '#272A2F',
          'surface-container': '#1D2024',
          'surface-container-low': '#191C20',
          'surface-container-lowest': '#0C0E13',
          'surface-bright': '#37393E',
          'surface-dim': '#111318',
        },
      },
      {
        defaultTheme: 'light',
      },
    ),
  ],
};
