const { readdir, readFile, writeFile } = require('fs/promises');
const { join } = require('path');
const pathTo = (...path) => join(__dirname, ...path);

(async () => {
  const packages = (await readdir(pathTo('../packages')).catch(() => {
    throw new Error('could not read packages');
  }))?.filter(pkg => !['all', 'analytics', 'debounce', 'gestures', 'lazy-memo', 'throttle', 'visibility-observer'].includes(pkg));

  const allPackageJson = JSON.parse(await readFile(pathTo('../packages/all/package.json')));  
  // overwrite dependencies
  allPackageJson.dependencies = {};
  indexTsx = [];
  serverTsx = [];
  for (let i = 0; i < packages.length; i++) {
    // set package versions
    const package = packages[i];
    const packageJson = JSON.parse(await readFile(pathTo(`../packages/${package}/package.json`)));
    allPackageJson.dependencies[packageJson.name] = `^${packageJson.version}`;
    // add exports to index.tsx
    indexTsx.push(`export * from "${packageJson.name}";`);
    // add exports to server.tsx
    if (typeof packageJson.exports?.node === 'object') {
      serverTsx.push(`export * from "${packageJson.name}";`);
    }
  }
  indexTsx.push('');
  serverTsx.push('');
  await writeFile(pathTo('../packages/all/package.json'), JSON.stringify(allPackageJson, undefined, 2));
  await writeFile(pathTo('../packages/all/src/index.tsx'), indexTsx.join('\n'));
  await writeFile(pathTo('../packages/all/src/server.tsx'), indexTsx.join('\n'));
  console.log('updated "all" package');
})();