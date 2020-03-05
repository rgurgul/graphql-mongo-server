const mongoose = require('mongoose');
const helpers = require('./helpers');
require('dotenv').config();

const { DB_HOST, DB_COURSE_USER, DB_PASS } = process.env;
const dbUrl = `mongodb://${DB_COURSE_USER}:${DB_PASS}@${DB_HOST}/${DB_COURSE_USER}`;
const dbLocalUrl = 'mongodb://127.0.0.1:27017/debugger';

const options = {
    keepAlive: 1,
    useUnifiedTopology: true,
    useNewUrlParser: true,
};
const url = helpers.args.env === 'local' ? dbLocalUrl : dbUrl;
mongoose.connect(url, options)
    .then(() => console.log('DB connected on ' + url))
    .catch((err) => console.log('*** error ', err));
