// modified from https://github.com/vbenjs/vue-vben-admin/blob/main/build/generate/icon/index.ts
import path from 'path';
import fs from 'fs-extra';
import inquirer from 'inquirer';
import colors from 'picocolors';
import pkg from '../../package.json';

export default function generateIcon() {
  const dir = path.resolve(process.cwd(), 'node_modules/@iconify/json');

  const raw = fs.readJsonSync(path.join(dir, 'collections.json')) as Record<string, any>;

  const collections = Object.entries(raw).map(([id, v]) => {
    return {
      ...v,
      id,
    };
  });

  const choices = collections.map((item) => {
    return { key: item.id, value: item.id, name: item.name };
  });

  inquirer
    .prompt([
      {
        type: 'list',
        name: 'useType',
        choices: [
          { key: 'local', value: 'local', name: 'Local' },
          { key: 'onLine', value: 'online', name: 'Online' },
        ],
        message: 'How to use icons?',
      },
      {
        type: 'list',
        name: 'iconSet',
        choices,
        message: 'Select the icon set that needs to be generated?',
      },
      {
        type: 'input',
        name: 'output',
        message: 'Custom output directory?',
        default: 'src/components/Icon/data',
      },
    ])
    .then((answers) => {
      const { iconSet, output, useType } = answers;
      const outputDir = path.resolve(process.cwd(), output);
      fs.ensureDirSync(outputDir);
      const genCollections = collections.filter((item) => [iconSet].includes(item.id));
      const prefixSet = [];
      genCollections.forEach((info) => {
        const data = fs.readJsonSync(path.join(dir, 'json', `${info.id}.json`));
        if (data) {
          const { prefix } = data;
          const isLocal = useType === 'local';
          const icons = Object.keys(data.icons).map((item) => `${isLocal ? `${prefix}:` : ''}${item}`);
          fs.writeFileSync(
            path.join(output, `icons.json`),
            isLocal ? JSON.stringify(icons, null, 2) : JSON.stringify({ prefix, icons }, null, 2),
          );

          // fs.writeFileSync(
          //   path.join(output, `icons.categories.json`),
          //   JSON.stringify(
          //     Object.entries(data.categories).map((t) => {
          //       return {
          //         name: t[0],
          //         items: t[1].map((o) => `${data.prefix}:${o}`),
          //       };
          //     }),
          //     null,
          //     2,
          //   ),
          // );

          prefixSet.push(prefix);
        }
      });
      console.log(`✨ ${colors.cyan(`[${pkg.name}]`)} - Icon generated successfully: [${prefixSet}]`);
    });
}
