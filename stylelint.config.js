/**
 * @type {import("stylelint").Config}
 */
const styleLintConfig = {
  extends: ['stylelint-config-standard', '@dreamsicle.io/stylelint-config-tailwindcss'],
  rules: {
    'import-notation': null,
  },
};

export default styleLintConfig;
