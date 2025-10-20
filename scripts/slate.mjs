import { rm, stat } from 'node:fs/promises';
import { resolve } from 'node:path';

async function removeIfExists(relativePath) {
  const targetPath = resolve(process.cwd(), relativePath);
  try {
    await stat(targetPath);
  } catch (error) {
    if (error.code === 'ENOENT') {
      return;
    }
    throw error;
  }

  await rm(targetPath, { recursive: true, force: true });
  console.log(`Removed ${relativePath}`);
}

const targets = ['node_modules', 'package-lock.json'];

for (const target of targets) {
  try {
    await removeIfExists(target);
  } catch (error) {
    console.error(`Failed to remove ${target}:`, error);
    process.exitCode = 1;
  }
}

console.log('Project slate cleared.');
