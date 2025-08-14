import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

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
    if (argv.b < 1) throw 'Error: base must be greater than 0';
    if (isNaN(argv.b)) throw 'Error: base needs to be a number type';

    return true;
  })
  .parseSync();
