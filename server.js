var express = require('express');
var app = express();
var bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express')
const swaggerDoc = require('./swagger.json')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

var port = process.env.port || 6060;

app.use('/', require('./index'));
app.use('/',swaggerUi.serve,swaggerUi.setup(swaggerDoc));

app.listen(port, function () {
    console.log('Starting node.js on port ' + port);
    console.log('[Swagger] http://localhost:'+port+'/')
});
