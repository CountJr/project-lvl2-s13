#!/usr/bin/env node

// @flow

import commander from 'commander';

commander.version('0.1.0')
  .usage('gendiff [options] <first_config> <second_config>>\n'
    + '\n'
    + 'Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'Output format')
  .parse(process.argv);

if (!commander.args.length) commander.help();
