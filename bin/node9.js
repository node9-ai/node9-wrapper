#!/usr/bin/env node
import { spawnSync } from 'child_process';
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';

// Locate @node9/proxy's cli.js by walking candidate paths.
// createRequire('@node9/proxy/dist/cli.js') would be cleaner but
// @node9/proxy's package.json has a strict exports map that blocks
// every subpath except '.' — so we resolve by filesystem.
//
// npm v7+ hoists @node9/proxy alongside node9-ai in the same
// node_modules; older setups and pnpm may nest it. Both covered.
const here = fileURLToPath(new URL('.', import.meta.url));
const candidates = [
  // hoisted: node_modules/@node9/proxy/... (npm default)
  path.resolve(here, '..', '..', '@node9', 'proxy', 'dist', 'cli.js'),
  // nested: node_modules/node9-ai/node_modules/@node9/proxy/...
  path.resolve(here, '..', 'node_modules', '@node9', 'proxy', 'dist', 'cli.js'),
];
const proxyBin = candidates.find((p) => fs.existsSync(p));

if (!proxyBin) {
  process.stderr.write(
    'node9: could not locate @node9/proxy. Searched:\n' +
      candidates.map((c) => '  ' + c).join('\n') +
      '\nTry `npm install -g node9-ai` again, or file an issue at https://github.com/node9-ai/node9-proxy\n'
  );
  process.exit(1);
}

const result = spawnSync(process.execPath, [proxyBin, ...process.argv.slice(2)], {
  stdio: 'inherit',
  env: { ...process.env, NODE9_WRAPPER: '1' },
});
process.exit(result.status ?? 0);
