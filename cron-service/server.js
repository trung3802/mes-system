
const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req,res)=>res.send('cron-service running'));
app.listen(port, () => console.log('cron-service running at http://localhost:' + port));
