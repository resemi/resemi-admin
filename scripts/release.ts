import inquirer from 'inquirer';
import semver from 'semver';
import standardVersion from 'standard-version';
import pkg from '../package.json';

const currentVersion = pkg.version;

/**
 * @param {import('semver').ReleaseType} i
 */
const inc = (i): string => semver.inc(currentVersion, i, 'beta');

(async function main() {
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'releaseAs',
        choices: ['patch', 'minor', 'major'].map((t) => {
          return { key: t, value: t, name: `${t} (${inc(t)})` };
        }),
        message: 'Select release type',
      },
      {
        type: 'confirm',
        name: 'dryRun',
        default: false,
        message: 'Use dry-run mode?',
      },
      {
        type: 'confirm',
        name: 'yes',
        default: true,
        message: (answers) => `Releasing v${inc(answers.releaseAs)}. Confirm?`,
        when: (answers) => !answers.dryRun,
      },
    ])
    .then(async (answers) => {
      const { releaseAs, dryRun, yes } = answers;

      if (!yes && !dryRun) {
        return;
      }

      standardVersion({
        dryRun,
        releaseAs,
      });
    });
})();
