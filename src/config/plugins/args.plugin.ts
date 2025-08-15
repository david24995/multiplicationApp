import yargs from 'yargs';

import { hideBin } from 'yargs/helpers';
import { isANumber, isPositiveNumber } from '../helpers/validation.helper';

export const yarg = yargs(hideBin(process.argv))
  .option('b', {
    alias: 'base',
    type: 'number',
    demandOption: true,
    describe: 'Multiplication table base',
  })
  .option('l', {
    alias: 'limit',
    type: 'number',
    default: 10,
    description: 'Multiplication table limit',
  })
  .option('s', {
    alias: 'show',
    type: 'boolean',
    default: false,
    describe: 'Show multiplication table',
  })
  .option('n', {
    alias: 'name',
    type: 'string',
    default: 'table',
    description: 'File Name',
  })
  .option('d', {
    alias: 'destination',
    type: 'string',
    default: 'outputs',
    desc: 'File destination',
  })
  .check((argv, options) => {
    isPositiveNumber(argv.b);
    isANumber(argv.b);

    return true;
  })
  .parseSync();
