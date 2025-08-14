import { CreateTable } from './create-table.use-case';

describe('CreteTableUseCase', () => {
  const base = 2;

  it('should create table with default values', () => {
    const createTable = new CreateTable();

    const table = createTable.execute({ base });

    const rows = table.split('\n');

    expect(createTable).toBeInstanceOf(CreateTable);
    expect(typeof table).toBe('string');
    expect(table).toMatch(/2 x 2/);
    expect(rows).toHaveLength(10);
  });
});
