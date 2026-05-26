import fs from "node:fs";
import { optimize } from "svgo";

const LIMIT = 32 * 1024;
const input = "public/assets/pathpickerlogo.svg";
const output = "public/assets/pathpickernew.svg";

function losslessPrep(s) {
  s = s
    .replace(/<\?xml[^?]*\?>\s*/i, "")
    .replace(/ xmlns:xlink="[^"]*"/, "")
    .replace(/<title>[^<]*<\/title>/, "");

  s = s.replace(
    /<g fill="([^"]+)" transform="matrix\(.1 0 0 -.1 0 300\)"><path d="([^"]+)"\/><\/g>/g,
    '<path fill="$1" d="$2"/>',
  );

  s = s.replace(
    /<svg([^>]*)><g><path fill=/,
    '<svg$1><g transform="matrix(.1 0 0 -.1 0 300)"><path fill=',
  );

  return s;
}

let s = losslessPrep(fs.readFileSync(input, "utf8"));
console.log(`lossless prep: ${Buffer.byteLength(s)}`);

const basePlugins = [
  "removeDoctype",
  "removeXMLProcInst",
  "removeComments",
  "removeMetadata",
  "removeTitle",
  "removeDesc",
  "removeEditorsNSData",
  "removeEmptyAttrs",
  "removeEmptyContainers",
  "collapseGroups",
];

function trySvgo(precision) {
  const plugins =
    precision === null
      ? basePlugins
      : [
          ...basePlugins,
          {
            name: "convertPathData",
            params: {
              floatPrecision: precision,
              transformPrecision: precision,
              noSpaceAfterFlags: false,
            },
          },
        ];

  const result = optimize(s, {
    multipass: true,
    js2svg: { indent: 0, pretty: false },
    plugins,
  }).data;

  const bytes = Buffer.byteLength(result);
  console.log(
    `svgo${precision === null ? " (no path convert)" : ` precision ${precision}`}: ${bytes} under32=${bytes <= LIMIT}`,
  );
  return { result, bytes };
}

for (const precision of [null, 2, 1, 0]) {
  const { result, bytes } = trySvgo(precision);
  if (bytes <= LIMIT) {
    fs.writeFileSync(output, result);
    console.log(`Wrote ${output}`);
    process.exit(0);
  }
}

// Slightly stronger path tidy (still no mergePaths / topology changes)
const stronger = optimize(s, {
  multipass: true,
  js2svg: { indent: 0, pretty: false },
  plugins: [
    ...basePlugins,
    {
      name: "convertPathData",
      params: {
        floatPrecision: 0,
        transformPrecision: 0,
        noSpaceAfterFlags: true,
        utilizeAbsolute: false,
      },
    },
    { name: "cleanupNumericValues", params: { floatPrecision: 0 } },
  ],
}).data;

const strongBytes = Buffer.byteLength(stronger);
console.log(`stronger svgo: ${strongBytes} under32=${strongBytes <= LIMIT}`);
if (strongBytes <= LIMIT) {
  fs.writeFileSync(output, stronger);
  console.log(`Wrote ${output}`);
  process.exit(0);
}

process.exit(1);
