#!/usr/bin/env node
import { spawnSync } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

// Locate @node9/proxy's bin via node_modules lookup
const here = fileURLToPath(new URL('.', import.meta.url));
const proxyBin = path.resolve(here, '../node_modules/@node9/proxy/dist/cli.js');

if (!fs.existsSync(proxyBin)) {
  process.stderr.write(`node9: could not find @node9/proxy at ${proxyBin}\n`);
  process.exit(1);
}

const result = spawnSync(process.execPath, [proxyBin, ...process.argv.slice(2)], {
  stdio: 'inherit',
  env: process.env,
});
process.exit(result.status ?? 0);
