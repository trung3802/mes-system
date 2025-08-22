
const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req,res)=>res.send('mec-service running'));
app.listen(port, () => console.log('mec-service running at http://localhost:' + port));
