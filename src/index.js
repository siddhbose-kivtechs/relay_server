import express from 'express';
import axios from 'axios';
import cors from 'cors';


const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());

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
  let check_data=verify_data(req.body);
    console.log(req.body);
    console.log(check_data);
  if(check_data)
  {
    res.send({data:'json data'});
  }
  else
  {
    res.send({data:'not a json data'});
  }
  // res.send(check_data);

});

app.listen(PORT, () => {
    console.log(`Relay app is listening on port ${PORT}`);
});


