#!/usr/bin/env node

// @flow

import commander from 'commander';
import print from 'mylittlecolor';

commander
  .version('0.1.0')
  .option('-f, --format [type]', 'Output format');


commander
  .arguments('<first_config> <second_config>')
  .action((firstConfig, secondConfig) => {
    // passing arguments
    print(`#red{${firstConfig}} #green{${secondConfig}}`);
  });

commander
  .parse(process.argv);

if (!commander.args.length) commander.help();
