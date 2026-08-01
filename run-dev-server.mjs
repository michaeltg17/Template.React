#!/usr/bin/env node
import { spawn } from 'child_process';
import { createWriteStream, writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const logDir = join(__dirname, 'logs');
const logFile = join(logDir, 'server-dev-log.txt');

mkdirSync(logDir, { recursive: true });
writeFileSync(logFile, '');
const log = createWriteStream(logFile);

function stripAnsi(text) {
  return text.toString().replace(/\x1b\[[0-9;]*m/g, '');
}

const child = spawn('npx', ['next', 'dev'], {
  stdio: 'pipe',
  shell: true,
  env: { ...process.env, FORCE_COLOR: '1' },
});

child.stdout.on('data', (data) => {
  process.stdout.write(data);
  log.write(stripAnsi(data));
});

child.stderr.on('data', (data) => {
  process.stderr.write(data);
  log.write(stripAnsi(data));
});

child.on('close', (code) => log.end());

process.on('SIGINT', () => child.kill('SIGINT'));