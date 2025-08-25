
const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req,res)=>res.send('qa-service running'));
app.listen(port, () => console.log('qa-service running at http://localhost:' + port));
