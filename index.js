const express = require('express')
const app = express()
const port = 3000
const fs = require('fs');
const csv=require('csvtojson/v2')

//ATTEMPT 1 - CSV TO JSON
// let rawdata = fs.readFileSync('titanic_data.json');
// let titanic_data = JSON.parse(rawdata);
// console.log(titanic_data);

//ATTEMPT 2 - CSV TO JSON
// let parse = require('csv-parse');
// let csvParser = parse({columns: true}, function (err, records) {
// 	console.log(records);
// });
// titanic_data=fs.createReadStream(__dirname+'/titanic.csv').pipe(csvParser)
//     .on('error', error => console.error(error))
//     .on('data', row => console.log(row))
//     .on('end', rowCount => console.log(`Parsed ${rowCount} rows`));

//ATTEMPT 3 - CSV TO JSON
let titanic_data
csv().fromFile('titanic.csv')
.then((jsonObj)=>{
    titanic_data = jsonObj;
})

app.get('/', (req, res) => {
  res.send(titanic_data)
})


const genderSearch=(gender)=>{
    let genderResponse= []
    
    console.log(gender)
    for(let i in titanic_data){
        console.log(titanic_data[i]['Name'])
        if (titanic_data[i]['Sex']==gender.toString()){
            genderResponse.push(titanic_data[i])
        }
    }
    return genderResponse
}

app.get('/advancedSearch/:gender', (req, res)=>
{
    let gender = req.params.gender
    res.send(genderSearch(gender))
})

app.get('/searchByExactAge/:exactage', (req, res)=>
{
    let exactAgeResponse= []
    let exactAge = req.params.exactage
    console.log(exactAge)
    for(let i in titanic_data){
        if (titanic_data[i]['Age']==parseInt(exactAge)){
            exactAgeResponse.push(titanic_data[i])
        }
    }

    res.send(exactAgeResponse)
})

app.get('/searchByFirstName/:firstName', (req, res)=>
{
    let firstNameResponse= []
    let firstName = req.params.firstName.toLowerCase()
    for(let i in titanic_data){
       
        dataFirstName = titanic_data[i]['Name'].split(' ')[2].trim().toLowerCase()

        if (firstName==(dataFirstName)){
            firstNameResponse.push(titanic_data[i])
        }
    }

    res.send(firstNameResponse)
})

app.get('/searchByFirstName/:firstName', (req, res)=>
{
    let firstNameResponse= []
    let firstName = req.params.firstName.toLowerCase()
    for(let i in titanic_data){
        dataFirstName = titanic_data[i]['Name'].split(' ')[2].trim().toLowerCase();
        if (firstName==(dataFirstName)){
            firstNameResponse.push(titanic_data[i])
        }
    }

    res.send(firstNameResponse)
})

app.get('/searchByAgeRange/', (req, res)=>
{
    let ageRangeResponse= []
    let upper =(req.query.upper === undefined) ? 200 : parseInt(req.query.upper)
    let lower =(req.query.lower === undefined) ? 0 : parseInt(req.query.lower)

    for(let i in titanic_data){
        const age = titanic_data[i]['Age']
        if (age>lower&&age<upper){
            ageRangeResponse.push(titanic_data[i])
        }
    }

    res.send(ageRangeResponse)
})


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})