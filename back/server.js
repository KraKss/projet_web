import cors from 'cors';
import express from "express";
import {default as Router} from "./API/routes/index.js";
const app = express();
const port = 3001;

app.use(express.json());
app.use(cors());
app.use(express.static('./upload'));
app.use(Router);

app.listen(port, () => {
    console.log(`http://localhost:${port}`);
});