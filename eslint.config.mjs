import coreWebVitals from "eslint-config-next/core-web-vitals";
import typescript from "eslint-config-next/typescript";

/**
 * Flat ESLint config — replaces .eslintrc.json after the Next 16 upgrade
 * removed `next lint`. Same rule set: next/core-web-vitals + next/typescript.
 */
const config = [
  ...coreWebVitals,
  ...typescript,
  {
    ignores: [".next/**", "node_modules/**", "out/**"],
  },
];

export default config;
