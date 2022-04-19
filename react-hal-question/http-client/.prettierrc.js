module.exports = {
  printWidth: 180,
  arrowParens: 'avoid',
  singleQuote: true,
  importOrder: [
    '^react(-dom)?($|\\/)',
    '^webpack($|\\/)',
    '^(?!\\@\\/|\\.)|(?<!\\.(less|css|s[c]ss)$',
    '^\\@/',
    '^[./](?!.*.(less|css|s[c]ss)$)',
    '(?<!\\.(less|css|s[c]ss)$',
  ],
  importOrderSeparation: true,
};
