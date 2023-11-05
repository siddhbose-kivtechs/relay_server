import express from 'express';
import axios from 'axios';
import cors from 'cors';
import { createClient } from "@supabase/supabase-js";
import { ulid } from 'ulid';
import bodyParser from 'body-parser'; 
import helmet from 'helmet';
import morgan from 'morgan';


const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());
app.use(bodyParser.json());  

app.use(morgan('combined'));
app.use(helmet());
// Create a Supabase client  
const supabaseUri = process.env.SUPABASE_URI;  
const supabaseKey = process.env.SUPABASE_KEY;  
const supabase = createClient(supabaseUri, supabaseKey);  

// const parse_data= (data) => {
//   let jsonData=JSON.parse(data);
//   console.log(jsonData);
// if (jsonData.hasOwnProperty('message')) {  
//   console.log(jsonData['message']);
// }
// }
// const parse_data = (data) => {  
//   let jsonData = JSON.parse(data);  
//   console.log(jsonData);  
    
//   if (Object.keys(jsonData).length === 0) {  
//     console.log('Empty object');  
//   } else {  
//     console.log('Non-empty object');  
//   }  
// }  

 const parse_data = (data) => {  
   const keysArr = Object.keys(data);  
     console.log(keysArr);
    const jsonLength = keysArr.length;  
     console.log(jsonLength); 
 }

//  to verify if the data is json or not
const verify_data = (data) =>
  {
    // return data;
     try {  
    JSON.parse(data);  
         console.log('Valid JSON');
    return true;  
  }
     catch (error) {  
console.log(' Not a valid JSON');
    return false;  
     
  }  
}
// ***  ALL METHOD***

app.all("*", (req, res) => {  
  const data = req.body;  
  
  if (verify_data && typeof data === 'object' && data) {    
    const jsonString = JSON.stringify(data);  
    const strippedStr = jsonString.replace(/`/g, '');    
    // res.send({ type: 'json data', data: strippedStr });   
      
    // console.log({ type: 'json data', data: strippedStr });
     // parse_data(strippedStr);
      res.json(strippedStr);
      console.log('JSON DATA');
  } else {    
    res.json({ type: 'not a json data', data: data });    
    console.log({ type: 'not a json data', data: data });  
  }
  let log_db = {
    status: "ok",
    url: req.originalUrl,
    ip_address: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
    request_body: req.body,
    request_method: req.method,
    lat: req.headers['x-vercel-ip-latitude'],
    lon: req.headers['x-vercel-ip-longitude'],
    city: req.headers['x-vercel-ip-city'],
    region: req.headers['x-vercel-ip-country-region'],
    country: req.headers['x-vercel-ip-country'],
    UA: req.headers['user-agent'],
    // uuid: uuidv4(),
    date_time: new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }),
    ulid: ulid()
  };

   console.log(log_db);

  // Insert the log entry into Supabase
  const { data: logEntry, error } = await supabase
    .from("logs")
    .insert([logdb]);

  // Handle any errors
  if (error) {
    console.error("Error inserting log:", error);
    return res.status(200).send("Out of Order. Contact Admin");
  }



});  
  


app.listen(PORT, () => {
    console.log(`Relay app is listening on port ${PORT}`);
});


