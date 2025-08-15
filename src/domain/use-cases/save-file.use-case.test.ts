import fs from 'fs';

import { SaveFile } from './save-file.use-case';

describe('SaveFileUseCase', () => {
  afterEach(() => {
    if (fs.existsSync('outputs')) fs.rmSync('outputs', { recursive: true });
  });

  it('should saveFile with default values', () => {
    const saveFile = new SaveFile();
    const options = {
      fileContent: 'Test content',
      destination: 'outputs',
      fileName: 'table',
    };

    const fnSpyOnMk = jest.spyOn(fs, 'mkdirSync');
    const fnSpyOnWrite = jest.spyOn(fs, 'writeFileSync');

    const result = saveFile.execute(options);

    expect(result).toBeTruthy();
    expect(fnSpyOnMk).toHaveBeenCalled();
    expect(fnSpyOnWrite).toHaveBeenCalled();
  });

  it('should return error if directory could not be created', () => {
    const saveFile = new SaveFile();
    const options = {
      fileContent: 'Test content',
    };

    const fnSpyOnMk = jest.spyOn(fs, 'mkdirSync').mockImplementation(() => {
      throw new Error('Error en generar el directorio');
    });

    const result = saveFile.execute(options);

    expect(result).toBeFalsy();
    expect(fnSpyOnMk).toHaveBeenCalled();

    fnSpyOnMk.mockRestore();
  });

  it('should return error if file could not be created', () => {
    const saveFile = new SaveFile();
    const options = {
      fileContent: 'Test content',
    };

    const fnSpyOnMk = jest.spyOn(fs, 'writeFileSync').mockImplementation(() => {
      throw new Error('Error en generar el archivo');
    });

    const result = saveFile.execute(options);

    expect(result).toBeFalsy();
    expect(fnSpyOnMk).toHaveBeenCalled();
    fnSpyOnMk.mockRestore();
  });
});
