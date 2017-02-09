#!/usr/bin/env node

// @flow

/* eslint-disable no-console */

import commander from 'commander';
import { diffFromFiles } from '../';

commander
  .version('0.1.0')
  .option('-f, --format [type]', 'Output format', 'standart');


commander
  .arguments('<first_config> <second_config>')
  .action((firstConfig, secondConfig) => {
    const result = diffFromFiles(firstConfig, secondConfig, commander.format);
    console.log(`${result}`);
  });

commander
  .parse(process.argv);

if (!commander.args.length) commander.help();
