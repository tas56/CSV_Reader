const CSVReader = require('../src/Index');
const City = require('../src/models/City')
let csvFile = '../data/worldcities.csv';

test('Can create a CsvReader object', () => {
    let csvReader = new CSVReader(csvFile,City);
    expect(csvReader).toBeInstanceOf(CSVReader);
});
test('Can create a CSVReader object by factory', () => {
    let csvReader = CSVReader.Create(csvFile,City);
    expect(csvReader).toBeInstanceOf(CSVReader);
});