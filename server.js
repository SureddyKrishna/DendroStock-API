const express = require("express");
const cors = require("cors");
const cookieSession = require("cookie-session");

const app = express();

// app.use(cors());
app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:4200"],
  })
);

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use(
  cookieSession({
    name: "krishna-session",
     // keys: ['key1', 'key2'],
    secret: "COOKIE_SECRET", // should use as secret environment variable
    httpOnly: true
  })
);

// dummy code need to look later if use full
const db = require("./app/models");
const Role = db.role;

// BELOW Code can be use in developement to drop the table data in DB and re-sync DB.
// db.sequelize.sync({force: true}).then(() => {
//   console.log('Drop and Resync Db');
//   initial();
// });


// Below line insert rows manually into database and avoid dropping data.
db.sequelize.sync();

function initial() {
  Role.create({
    id: 1,
    name: "user"
  });
 
  Role.create({
    id: 2,
    name: "moderator"
  });
 
  Role.create({
    id: 3,
    name: "admin"
  });
}
//  dummy code end

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Dendro application." });
});

// routes
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});