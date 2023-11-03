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
    return data;
}
// ***  ALL METHOD***

app.all("*", (req, res) => {
  let check_data=verify_data(req.body);
  res.send(check_data);
  console.log(check_data);
});

app.listen(PORT, () => {
    console.log(`Relay app is listening on port ${PORT}`);
});


