const express = require('express')
const app = express()
const port = 3000
const fs = require('fs');
const csv=require('csvtojson/v2')

//ATTEMPT 1
// let rawdata = fs.readFileSync('titanic_data.json');
// let titanic_data = JSON.parse(rawdata);
// console.log(titanic_data);

//ATTEMPT 2
// let parse = require('csv-parse');
// let csvParser = parse({columns: true}, function (err, records) {
// 	console.log(records);
// });
// titanic_data=fs.createReadStream(__dirname+'/titanic.csv').pipe(csvParser)
//     .on('error', error => console.error(error))
//     .on('data', row => console.log(row))
//     .on('end', rowCount => console.log(`Parsed ${rowCount} rows`));

//ATTEMPT 3
let titanic_data
csv().fromFile('titanic.csv')
.then((jsonObj)=>{
    titanic_data = jsonObj;
})

app.get('/', (req, res) => {
  res.send(titanic_data)
})

app.get('/advancedSearch/:gender', (req, res)=>
{
    let genderResponse= []
    let gender = req.params.gender
    let survived = titanic_data.data.survived
    for(let i in survived){
        if (survived[i][1]==gender){
            newRow = survived[i]
            newRow.push('survived')
            genderResponse.push(survived[i])
        }
    }

    let didntSurvive = titanic_data.data.did_not_survive
    for(let i in didntSurvive){
        if (didntSurvive[i][1]==gender){
            newRow = didntSurvive[i]
            newRow.push('did_not_survive')
            genderResponse.push(newRow)
        }
    }
    res.send(genderResponse)
})

app.get('/searchByExactAge/:exactage', (req, res)=>
{
    let exactAgeResponse= []
    let exactAge = req.params.exactage
    let survived = titanic_data.data.survived
    for(let i in survived){
        if (survived[i][2]==exactAge){
            newRow = survived[i]
            newRow.push('survived')
            exactAgeResponse.push(survived[i])
        }
    }

    let didntSurvive = titanic_data.data.did_not_survive
    for(let i in didntSurvive){
        if (didntSurvive[i][2]==exactAge){
            newRow = didntSurvive[i]
            newRow.push('did_not_survive')
            exactAgeResponse.push(newRow)
        }
    }
    res.send(exactAgeResponse)
})



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})