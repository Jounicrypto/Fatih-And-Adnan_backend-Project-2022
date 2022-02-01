const express = require('express');
const router = require('./router');
const session = require('express-session');
const bodyParser = require('body-parser');
const MongoDBstore = require("connect-mongodb-session")(session);

const app = express();
app.use(bodyParser.json());

const store = new MongoDBstore({
    uri: "mongodb+srv://adnanjo:099485@cluster0.hvrvw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    collection:"mySessions",
});

app.set('view engine', 'ejs');
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }));
app.use(
    session({
    secret:"First nodejs project",
    resave: false,
    saveUninitialized:false,
    store: store,
    
}))

app.use(router);




require('./mongoose')

app.listen(5000, () => console.log('app is listening to port 5000 ...'));