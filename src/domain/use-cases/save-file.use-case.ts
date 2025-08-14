import fs from 'fs';

export interface SaveFileUseCase {
  execute: (options: Options) => boolean;
}

export interface Options {
  fileContent: string;
  destination?: string;
  fileName?: string;
}

export class SaveFile implements SaveFileUseCase {
  constructor() {}

  execute({ fileContent, destination = 'outputs', fileName }: Options) {
    try {
      fs.mkdirSync(destination, { recursive: true });
      fs.writeFileSync(`${destination}/${fileName}.txt`, fileContent, {
        encoding: 'utf-8',
      });
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
}
