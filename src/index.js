import express from 'express';
import axios from 'axios';
import cors from 'cors';


const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());


// ***  ALL METHOD***
app.all("/", (req, res) => {
  res.send("<h2>It's Working!</h2>");
});
app.listen(PORT, () => {
    console.log(`Relay app is listening on port ${PORT}`);
});


