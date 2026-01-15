module.exports = {
  webpack: {
    configure: (config) => {
      config.module.rules.forEach((rule) => {
        if (rule.enforce === 'pre' && rule.use) {
          rule.exclude = /node_modules/;
        }
      });
      return config;
    },
  },
};
