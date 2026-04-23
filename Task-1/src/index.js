const app = require('./app');
const ConnectDB = require('./config/db.js')

ConnectDB();

app.listen(3000,() => {
    console.log("Server has been started");
})