const express = require('express');
const app = express();
const fs = require('fs').promises;

const port = 5000;


app.use(express.json());
app.use(express.static(__dirname));


// getting index file
app.get('/', (req, res) =>{
  res.sendFile(__dirname + `/index.html`)
})


// storeing Data
app.post('/api/storeData', async (req, res)=>{

  const existingData = await fs.readFile('blogs.json', 'utf8');
  console.log('Existing Data:', existingData);

  let jsonData = [];
  if(existingData){
    jsonData = JSON.parse(existingData);
  }

  console.log('Parsed JSON:', jsonData);

  const newData = req.body;

  jsonData.push(newData);
  await fs.writeFile('blogs.json', JSON.stringify(jsonData,null,2));

  res.status(200).json({message : 'data stored succesfully'});

})


// Show Data
app.get('/api/showData', async(req,res)=>{
  
  const Data = await fs.readFile('blogs.json', 'utf8'); 
  jsonData = JSON.parse(Data);

  res.json(jsonData);

})


// Delete data
app.post('/api/deleteData', async(req,res)=>{

  const data = await fs.readFile('blogs.json','utf8');
  jsonData = JSON.parse(data);

  console.log(jsonData[0].name)

  let dataToRemove = req.body
  let Name = dataToRemove.name
 

  for (let i = 0 ; i < jsonData.length; i++){
    if(jsonData[i].name == Name){
      jsonData.splice(i,1);
      break;
    }
  }

  console.log(jsonData);

  await fs.writeFile('blogs.json', JSON.stringify(jsonData,null,2));

  console.log('deleted')

  res.status(200).json({message : 'data stored succesfully'});
})


app.listen(port,()=>{
  console.log(`server listeniing in port : http://localhost:${port}`);
})

// username storing
app.post('/api/signin', async (req, res)=>{

  const existingData = await fs.readFile('users.json', 'utf8');
  console.log('Existing Data:', existingData);

  let jsonData = [];
  let id = 1;

  if(existingData){
    jsonData = JSON.parse(existingData);
  }

  console.log('Parsed JSON:', jsonData);

  let newData = req.body;


  for (let i = 0; i < existingData.length; i++){
    if(newData.name != existingData[i].name){
      newData.id = i;
    }
  }


  jsonData.push(newData);
  await fs.writeFile('users.json', JSON.stringify(jsonData,null,2));

  res.status(200).json({message : 'data stored succesfully'});

})


app.get('/api/userdata', async(req,res)=>{
  
  const Data = await fs.readFile('users.json', 'utf8'); 
  jsonData = JSON.parse(Data);

  res.json(jsonData);

})

