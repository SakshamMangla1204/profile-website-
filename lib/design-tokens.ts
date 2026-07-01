export const designTokens = {
  colors: {
    background: "hsl(var(--background))",
    foreground: "hsl(var(--foreground))",
    surface: {
      1: "hsl(var(--surface-1))",
      2: "hsl(var(--surface-2))",
      3: "hsl(var(--surface-3))",
    },
    brand: {
      50: "hsl(var(--brand-50))",
      100: "hsl(var(--brand-100))",
      200: "hsl(var(--brand-200))",
      300: "hsl(var(--brand-300))",
      400: "hsl(var(--brand-400))",
      500: "hsl(var(--brand-500))",
      600: "hsl(var(--brand-600))",
      700: "hsl(var(--brand-700))",
    },
  },
  radius: {
    sm: "0.75rem",
    md: "1rem",
    lg: "1.25rem",
    xl: "1.625rem",
    "2xl": "2rem",
  },
  shadows: {
    softXl: "0 12px 50px rgba(0, 0, 0, 0.28)",
    soft2xl: "0 24px 90px rgba(0, 0, 0, 0.36)",
    innerLine: "inset 0 1px 0 rgba(255, 255, 255, 0.06)",
  },
  spacing: {
    sectionY: "7rem",
    sectionYMobile: "4.5rem",
    contentMax: "80rem",
    readingMax: "42rem",
  },
  typography: {
    displayLg: "4.75rem / 0.92",
    displayMd: "3.5rem / 0.96",
    displaySm: "2.5rem / 1",
    bodyLg: "1.125rem / 1.85",
    bodyMd: "1rem / 1.75",
    label: "0.75rem / 1.2",
  },
} as const;
