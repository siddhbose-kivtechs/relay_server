import express from 'express';
import axios from 'axios';
import cors from 'cors';
import bodyParser from 'body-parser'; 


const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());
app.use(bodyParser.json());  

//  to verify if the data is json or not
const verify_data = (data) =>
  {
    // return data;
     try {  
    JSON.parse(data);  
    return true;  
  } catch (error) {  
    return false;  
  }  
}
// ***  ALL METHOD***

app.all("*", (req, res) => {
  const data=req.body;
  const check_data=verify_data(data);
  
   console.log(check_data);
    console.log(data); 
  if (typeof data === 'object') {  
    res.send({ type:'json data', data:data });  
  } else {  
    res.send({ type:'not a json data',data: data  });  
  }  
});  


app.listen(PORT, () => {
    console.log(`Relay app is listening on port ${PORT}`);
});


