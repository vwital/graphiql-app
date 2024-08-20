const config = {
  "src/**/*.{css, scss}": "npx stylelint",
  "src/**/*.{ts,tsx}": ["npm run format", "npm run lint"],
};

export default config;
