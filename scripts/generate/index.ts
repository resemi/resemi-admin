import inquirer from 'inquirer';
import icon from './icon';

type Command = {
  key: string;
  value: () => void;
  name: string;
};

const cmdList: Command[] = [{ key: 'icon', value: icon, name: 'Generate icon set' }];

(function generate() {
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'cmd',
        choices: cmdList,
        message: 'Select the command that needs to be execute?',
      },
    ])
    .then((answers) => {
      const { cmd } = answers;
      cmd?.();
    });
})();
