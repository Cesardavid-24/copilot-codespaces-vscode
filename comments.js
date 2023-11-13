// create web server
// create web server
const express = require('express');
const app = express();
const path = require('path');

// set port
app.set('port', process.env.PORT || 3000);

// set view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// set middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// set routes
app.use(require('./routes/index'));

// start server
app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'));
});