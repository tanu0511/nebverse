#!/usr/bin/env node

// Set memory limit for Node.js
process.env.NODE_OPTIONS = '--max-old-space-size=8192';

// Disable source maps to reduce memory usage
process.env.GENERATE_SOURCEMAP = 'false';

// Start the development server
const { spawn } = require('child_process');
const reactScripts = require.resolve('react-scripts/scripts/start.js');

const child = spawn('node', [reactScripts], {
  stdio: 'inherit',
  env: { ...process.env }
});

child.on('close', (code) => {
  process.exit(code);
});

