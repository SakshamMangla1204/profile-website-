export type NavigationItem = {
  label: string;
  href: string;
  external?: boolean;
};

export const navigation = {
  main: [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Technology Stack", href: "#technology-stack" },
    { label: "Projects", href: "#projects" },
    { label: "Personal Journey", href: "#personal-journey" },
    { label: "Certifications", href: "#certifications" },
    { label: "Blog", href: "#blog" },
    { label: "Contact", href: "#contact" },
  ] satisfies NavigationItem[],
  social: [
    { label: "GitHub", href: "https://github.com/SakshamMangla1204", external: true },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/saksham-mangla11/", external: true },
    { label: "X", href: "https://x.com", external: true },
  ] satisfies NavigationItem[],
} as const;
