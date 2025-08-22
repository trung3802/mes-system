
const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req,res)=>res.send('ie-service running'));
app.listen(port, () => console.log('ie-service running at http://localhost:' + port));
