const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session');
const port = process.env.PORT || 8000;
const app = express();

app.use(session({secret: 'mycode'}));
app.use(bodyParser.urlencoded({extended: true}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

let userCount = 0;
app.get('/', function(request, response) {
    request.session.count = userCount+=2;
    // userCount+=2;
    console.log(userCount);
    response.render('index', { count: request.session.count });

});

app.get('/sub', function(request, response){
    request.session.count = userCount--;
    console.log(request.session.count);
    response.render('index', {count: request.session.count });
});

app.get('/clear', function(request, response){
    // clearCount = userCount - userCount;
    request.session.destroy();
    response.render('index')
});

app.listen(port, () => console.log('listen on port 8000 ${ port }'));
