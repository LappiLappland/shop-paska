module.exports = {
  jsc: {
    experimental: {
      plugins: [],
    },
    parser: {
      syntax: 'typescript',
      tsx: true,
    },
    transform: {
      react: {
        runtime: 'automatic',
      },
    },
  },
};
