const parse = require('csv-parse')
const fs = require('fs');
const output = [];

class CsvReader {

    static output = [];

    constructor(csvFile,model) {

        this.csvFile = csvFile;
        this.model = model;

    }

    static Create(csvFile,model){
        return new CsvReader(csvFile,model);
    }

    static AddOutput(record){
        CsvReader.output.push(record);
    }

    inputStream (csvFile, Model){
        fs.createReadStream(csvFile)
            .pipe(parse({
                columns: true,
                delimiter: ',',
                trim: true,
                skip_empty_lines: true
            })
                .on('readable', function(){
                    let record
                    while (record = this.read()) {
                        console.log(record)
                        let city = new Model(record)
                        output.push(record)
                    }

                })
                // When we are done, test that the parsed output matched what expected
                .on('end', function(){

                    //console.log(output);
                }));
    }


}


module.exports = CsvReader;
