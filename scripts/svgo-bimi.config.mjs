/** Aggressive SVGO config targeting BIMI 32KB limit. */
export default {
  multipass: true,
  js2svg: { indent: 0, pretty: false },
  plugins: [
    {
      name: "preset-default",
      params: {
        overrides: {
          cleanupNumericValues: { floatPrecision: 0 },
          convertPathData: {
            floatPrecision: 0,
            transformPrecision: 0,
            noSpaceAfterFlags: true,
          },
          mergePaths: { force: true, noSpaceAfterFlags: true },
          removeViewBox: false,
          removeTitle: false,
          removeDesc: false,
        },
      },
    },
    {
      name: "convertPathData",
      params: {
        floatPrecision: 0,
        transformPrecision: 0,
        noSpaceAfterFlags: true,
      },
    },
  ],
};
