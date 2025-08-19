#!/usr/bin/env node

// Simple script to build only the frontend for Vercel deployment
import { execSync } from 'child_process';

console.log('Building frontend for Vercel...');
try {
  execSync('vite build', { stdio: 'inherit' });
  console.log('Frontend build complete!');
} catch (error) {
  console.error('Frontend build failed:', error);
  process.exit(1);
}