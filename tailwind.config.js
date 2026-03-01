/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        base: 'var(--font-family-base)',
      },
      fontSize: {
        xs: 'var(--font-size-xs)',
        sm: 'var(--font-size-sm)',
        md: 'var(--font-size-md)',
        lg: 'var(--font-size-lg)',
        xl: 'var(--font-size-xl)',
        '2xl': 'var(--font-size-2xl)',
        '3xl': 'var(--font-size-3xl)',
      },
      fontWeight: {
        normal: 'var(--font-weight-normal)',
        medium: 'var(--font-weight-medium)',
        semibold: 'var(--font-weight-semibold)',
      },
      lineHeight: {
        base: 'var(--line-height-base)',
        tight: 'var(--line-height-tight)',
      },
      spacing: {
        1: 'var(--space-1)',
        2: 'var(--space-2)',
        3: 'var(--space-3)',
        4: 'var(--space-4)',
        5: 'var(--space-5)',
        6: 'var(--space-6)',
        8: 'var(--space-8)',
        10: 'var(--space-10)',
        12: 'var(--space-12)',
        16: 'var(--space-16)',
      },
      borderRadius: {
        sm: 'var(--radius-sm)',
        md: 'var(--radius-md)',
        lg: 'var(--radius-lg)',
        xl: 'var(--radius-xl)',
        full: 'var(--radius-full)',
      },
      boxShadow: {
        xs: 'var(--shadow-xs)',
        sm: 'var(--shadow-sm)',
        md: 'var(--shadow-md)',
        lg: 'var(--shadow-lg)',
      },
      colors: {
        primary: {
          DEFAULT: 'var(--color-primary)',
          hover: 'var(--color-primary-hover)',
        },
        secondary: {
          DEFAULT: 'var(--color-secondary)',
          hover: 'var(--color-secondary-hover)',
        },
        tertiary: {
          DEFAULT: 'var(--color-tertiary)',
          hover: 'var(--color-tertiary-hover)',
          text: 'var(--color-tertiary-text)',
          border: 'var(--color-tertiary-border)',
          'focus-ring': 'var(--color-tertiary-focus-ring)',
        },
        danger: {
          DEFAULT: 'var(--color-danger)',
          hover: 'var(--color-danger-hover)',
        },
        surface: {
          DEFAULT: 'var(--color-surface)',
          hover: 'var(--color-surface-hover)',
        },
        text: {
          base: 'var(--color-text-base)',
          title: 'var(--color-text-title)',
          muted: 'var(--color-text-muted)',
          link: 'var(--color-text-link)',
          'link-hover': 'var(--color-text-link-hover)',
        },
        background: 'var(--color-background)',
        border: {
          DEFAULT: 'var(--color-border)',
          input: 'var(--color-border-input)',
          'input-focus': 'var(--color-border-input-focus)',
          'input-error': 'var(--color-border-input-error)',
        },

        status: {
          'success-bg': 'var(--color-status-success-bg)',
          'success-text': 'var(--color-status-success-text)',
          'warning-bg': 'var(--color-status-warning-bg)',
          'warning-text': 'var(--color-status-warning-text)',
          'error-bg': 'var(--color-status-error-bg)',
          'error-text': 'var(--color-status-error-text)',
          'refunded-bg': 'var(--color-status-refunded-bg)',
          'refunded-text': 'var(--color-status-refunded-text)',
        },
        error: {
          bg: 'var(--color-error-bg)',
          text: 'var(--color-error-text)',
        },
      },
      transitionDuration: {
        fast: '0.2s',
        base: '0.25s',
      },
      maxWidth: {
        app: 'var(--max-width-app)',
      },
      minWidth: {
        body: 'var(--min-width-body)',
      },
    },
  },
  plugins: [],
}
