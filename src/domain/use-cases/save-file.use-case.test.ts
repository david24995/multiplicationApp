import fs from 'fs';

import { SaveFile } from './save-file.use-case';

describe('SaveFileUseCase', () => {
  afterEach(() => {
    fs.rmSync('outputs', { recursive: true });
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

  it('should saveFile have called an error', async () => {
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
  });
});
