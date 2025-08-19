#!/usr/bin/env node

// Simple script to build only the backend for Render deployment
import { execSync } from 'child_process';

console.log('Building backend for Render...');
try {
  execSync('esbuild server/index.ts --platform=node --packages=external --bundle --format=esm --outdir=dist', { stdio: 'inherit' });
  console.log('Backend build complete!');
} catch (error) {
  console.error('Backend build failed:', error);
  process.exit(1);
}