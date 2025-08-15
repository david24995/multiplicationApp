import { ServerApp } from './server-app';
import { SaveFile } from '../domain/use-cases/save-file.use-case';
import { CreateTable } from '../domain/use-cases/create-table.use-case';

describe('Test server-app.ts', () => {
  beforeEach(() => jest.restoreAllMocks());
  it('should create serveApp instance', () => {
    const serverApp = new ServerApp();
    expect(serverApp).toBeInstanceOf(ServerApp);
    expect(typeof ServerApp.run).toBe('function');
  });
  // it('should run ServerApp create with options', () => {
  //   const logSpy = jest.spyOn(console, 'log');
  //   const createTableSpy = jest.spyOn(CreateTable.prototype, 'execute');
  //   const saveFileSpy = jest.spyOn(SaveFile.prototype, 'execute');
  //   const options = {
  //     base: 2,
  //     limit: 12,
  //     showTable: true,
  //     name: 'test-fileName',
  //     destination: 'test-destination',
  //   };
  //   ServerApp.run(options);
  //   expect(logSpy).toHaveBeenCalledTimes(3);
  //   expect(logSpy).toHaveBeenCalledWith('Server running...');
  //   expect(logSpy).toHaveBeenCalledWith('File created!');
  //   expect(createTableSpy).toHaveBeenCalledTimes(1);
  //   expect(saveFileSpy).toHaveBeenCalled();
  // });
  // it('should return false to a invalid SaveFile', () => {
  //   const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
  //   jest.spyOn(CreateTable.prototype, 'execute').mockReturnValue('table-name');
  //   const saveFileSpy = jest
  //     .spyOn(SaveFile.prototype, 'execute')
  //     .mockReturnValue(false);
  //   const options = {
  //     base: 1,
  //     limit: 12,
  //     showTable: false,
  //     name: 'test-fileName',
  //     destination: 'test-destination',
  //   };
  //   ServerApp.run(options);
  //   expect(errorSpy).toHaveBeenCalledWith('File not created!');
  // });

  it('should run with custom values mocked', () => {
    const logMock = jest.fn();
    const createMock = jest.fn().mockReturnValue('1 x 2 = 2');
    const saveFileMock = jest.fn().mockReturnValue(true);

    console.log = logMock;
    CreateTable.prototype.execute = createMock;
    SaveFile.prototype.execute = saveFileMock;

    const options = {
      base: 1,
      limit: 12,
      showTable: false,
      name: 'test-fileName',
      destination: 'test-destination',
    };
    ServerApp.run(options);

    expect(logMock).toHaveBeenCalledWith('Server running...');
    expect(createMock).toHaveBeenCalledWith({
      base: options.base,
      limit: options.limit,
    });
    expect(saveFileMock).toHaveBeenCalledWith({
      destination: options.destination,
      fileName: options.name,
      fileContent: '1 x 2 = 2',
    });

    expect(logMock).toHaveBeenCalledWith('File created!');
  });

  it('should run with custom values mocked', () => {
    const logErrorMock = jest.fn();
    const createMock = jest.fn().mockReturnValue('1 x 2 = 2');
    const saveFileMock = jest.fn().mockReturnValue(false);

    console.error = logErrorMock;
    CreateTable.prototype.execute = createMock;
    SaveFile.prototype.execute = saveFileMock;

    const options = {
      base: 1,
      limit: 12,
      showTable: true,
      name: 'test-fileName',
      destination: 'test-destination',
    };
    ServerApp.run(options);

    expect(logErrorMock).toHaveBeenCalledWith('File not created!');
  });
});
