
const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req,res)=>res.send('cut-service running'));
app.listen(port, () => console.log('cut-service running at http://localhost:' + port));
