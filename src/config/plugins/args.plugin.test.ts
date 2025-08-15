// import { yarg } from './args.plugin';

const runCommand = async (args: string[]) => {
  process.argv = [...process.argv, ...args];

  const { yarg } = await import('./args.plugin');

  // console.log(yarg);

  return yarg;
};

describe('Test args.plugin.ts', () => {
  const initialArgv = process.argv;
  beforeEach(() => {
    process.argv = initialArgv;
    jest.resetModules();
  });

  it('should returt default values', async () => {
    const yarg = await runCommand(['-b', '5']);

    expect(yarg).toEqual(
      expect.objectContaining({
        b: 5,
        l: 10,
        s: false,
        n: 'table',
        d: 'outputs',
      })
    );
  });

  it('Should return configuration with custom values', async () => {
    const yarg = await runCommand([
      '-b',
      '5',
      '-l',
      '12',
      '-s',
      '-n',
      'tableNameModif',
      '-d',
      'anotherDestination',
    ]);

    expect(yarg).toEqual(
      expect.objectContaining({
        b: 5,
        l: 12,
        s: true,
        n: 'tableNameModif',
        d: 'anotherDestination',
      })
    );
  });
});
