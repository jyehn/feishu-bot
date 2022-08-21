module.exports = {
  printWidth: 80,
  useTabs: false, //use space instead of tab
  tabWidth: 2,
  semi: true, // semi-colon in end of line
  trailingComma: "all",
  bracketSpacing: true, // add more space in object eg: { foo: bar }
  jsxSingleQuote: true, // use single quote in jsx
  jsxBracketSameLine: true, //html tag ‘>’ in next line
  arrowParens: "avoid",
  endOfLine: "lf",
  embeddedLanguageFormatting: "auto", //format emmbedding language
  overrides: [
    {
      files: "*.json",
      options: {
        parser: "json",
        useTabs: false,
      },
    },
    {
      files: "*.ts",
      options: {
        parser: "typescript",
      },
    },
  ],
};
