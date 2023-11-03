import express from 'express';
import axios from 'axios';
import cors from 'cors';
import bodyParser from 'body-parser'; 


const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());
app.use(bodyParser.json());  

// const parse_data= (data) => {
//   let jsonData=JSON.parse(data);
//   console.log(jsonData);
// if (jsonData.hasOwnProperty('message')) {  
//   console.log(jsonData['message']);
// }
// }
const parse_data = (data) => {  
  let jsonData = JSON.parse(data);  
  console.log(jsonData);  
    
  if (Object.keys(jsonData).length === 0) {  
    console.log('Empty object');  
  } else {  
    console.log('Non-empty object');  
  }  
}  


//  to verify if the data is json or not
const verify_data = (data) =>
  {
    // return data;
     try {  
    JSON.parse(data);  
    return true;  
  }
     catch (error) {  
    return false;  
  }  
}
// ***  ALL METHOD***

app.all("*", (req, res) => {
  const data=req.body;

  // if (typeof data === 'object') 
  if(verify_data && typeof data === 'object' && data)
  {  
    // parse the json data
    // parse_data(data);
    const strippedStr = data.replace(/`/g, '');  
    res.send({ type:'json data', data:strippedStr });  
    console.log({ type:'json data', data:strippedStr });
  } 
  
  else {  
    res.send({ type:'not a json data',data: data  });  
    console.log({ type:'not a json data',data: data  });
  }  
});  


app.listen(PORT, () => {
    console.log(`Relay app is listening on port ${PORT}`);
});


