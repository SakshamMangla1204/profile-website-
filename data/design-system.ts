export const colorPalette = {
  background: {
    canvas: "220 20% 7%",
    surface: "220 20% 9%",
    elevated: "220 18% 11%",
    overlay: "218 17% 14%",
  },
  foreground: {
    primary: "210 20% 96%",
    secondary: "217 12% 66%",
  },
  brand: {
    50: "210 30% 96%",
    100: "214 26% 90%",
    200: "214 18% 78%",
    300: "214 16% 66%",
    400: "214 14% 54%",
    500: "214 14% 44%",
    600: "214 15% 33%",
    700: "214 17% 24%",
  },
} as const;

export const typographyScale = {
  displayLg: {
    size: "4.75rem",
    lineHeight: "0.92",
    tracking: "-0.06em",
  },
  displayMd: {
    size: "3.5rem",
    lineHeight: "0.96",
    tracking: "-0.05em",
  },
  displaySm: {
    size: "2.5rem",
    lineHeight: "1",
    tracking: "-0.04em",
  },
  titleLg: {
    size: "2rem",
    lineHeight: "1.08",
    tracking: "-0.04em",
  },
  bodyLg: {
    size: "1.125rem",
    lineHeight: "1.85",
    tracking: "-0.01em",
  },
  bodyMd: {
    size: "1rem",
    lineHeight: "1.75",
    tracking: "-0.01em",
  },
  label: {
    size: "0.75rem",
    lineHeight: "1.2",
    tracking: "0.18em",
  },
} as const;

export const spacingGuidelines = {
  pageX: "1.5rem",
  pageXDesktop: "2rem",
  sectionYMobile: "4.5rem",
  sectionYDesktop: "7rem",
  contentGap: "1.25rem",
  cardGap: "1.75rem",
  readingWidth: "42rem",
  layoutWidth: "80rem",
} as const;
