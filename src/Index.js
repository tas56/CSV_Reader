const parse = require('csv-parse')
const fs = require('fs');
const City = require('models/City')
let csvFile = '../data/worldcities.csv';
const output = []

class ReadStream {

    static output = [];

    constructor(csvFile,model) {

        this.csvFile = csvFile;
        this.model = model;

    }

    static Create(csvFile,model){
        return new ReadStream(csvFile,model);
    }

    static AddOutput(record){
        this.output.push(record);
    }

    CreateReadStream(){
        fs.createReadStream(this.csvFile)
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
                    let city = this.model.create(record);
                    this.AddOutput(record)
                }
            })
            // When we are done, test that the parsed output matched what expected
            .on('end', function(){

              //  console.log(output);

            }));

    }


}




// fs.createReadStream(csvFile)
//     .pipe(parse({
//     columns: true,
//     delimiter: ',',
//     trim: true,
//     skip_empty_lines: true
// })
//     .on('readable', function(){
//         let record
//         while (record = this.read()) {
//             console.log(record)
//             let city = City.create(record);
//             output.push(record)
//         }
//     })
//     // When we are done, test that the parsed output matched what expected
//     .on('end', function(){
//
//       //  console.log(output);
//
//     }));