module.exports = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
    config.experiments = {
      topLevelAwait: true,
    };
    return config;
  },
  images: {
    disableStaticImages: true,
  },
};
