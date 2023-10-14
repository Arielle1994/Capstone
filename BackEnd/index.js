const express = require("express");
const app = express();
const configdb = require("./config");
const event = require("./models/event");
const login = require("./models/login");
const registration = require("./models/registration");

const cors = require("cors");
// const bcrypt = require('bcrypt');

// app.use('/images',express.static('public/images'));

//Middlewares:

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false })); //adding a global middleware

//Database Conntection:

configdb
  .authenticate() //the promise
  .then(() => {
    console.log("Database is connected");

    configdb
      .sync()
      .then(() => {
        console.log("Database synchronized.");
      })
      .catch((error) => {
        console.error("Database synchronization error:", error);
      });

    app.listen(3000, () => {
      console.log("Server running at port 3000"); // Log a message indicating that the server is running
    });

    //Login Route

    app.post("/login", async (req, res) => {
      const emailAddress = req.body.email;
      const clearTextPassword = req.body.password;

      // Find a user using the email address
      const data = {
        where: { email: emailAddress },
      };

      login
        .findOne(data)
        .then((result) => {
          if (result) {
            // Compare clear text password to the password stored in DB
            if (clearTextPassword === result.password) {
              res.status(200).send(result);
            } else {
              res.status(401).send("Incorrect password");
            }
          } else {
            res.status(404).send("User not found");
          }
        })
        .catch((err) => {
          res.status(500).send(err);
        });
    });

    //Event Routes:

    app.get("/events", function (req, res) {
      event
        .findAll()
        .then(function (results) {
          res.status(200).send(results);
        })
        .catch(function (error) {
          res.status(500).send(error);
        });
    });


    app.get("/events/:event_id", function (req, res) {
      let eventId = req.params.event_id;

      event
        .findByPk(eventId)
        .then(function (result) {
          res.status(200).send(result);
        })
        .catch(function (err) {
          res.status(500).send(err);
        });
    });

//Creating a new Event

app.post("/events", function (req, res) {
    let event_data = req.body;
    event
      .create(event_data)
      .then(function (result) {
        res.status(200).send(result);
      })
      .catch(function (error) {
        res.status(500).send(error);
      });
  });
  
  //Update an existing event
  
  app.put("/events/:event_id", function (req, res) {
    let eventId = req.params.event_id;


    //find the event to update
  
    event
      .findByPk(eventId)
      .then(function (result) {
        if (result) {
          //updating the result object
  
          Object.assign(result, req.body);
          //Save to DB
          result.save().then(function () {
            res.status(200).send(result);
          });
        } else {
          res.status(404).send("Event not found");
        }
      })
      .catch(function (err) {
        res.status(500).send(err);
      });
  });
  
  //Delete an existing event
  app.delete("/events/:event_id", function (req, res) {
    let eventId = req.params.event_id;
    //find the event to update
  
    event
      .findByPk(eventId)
      .then(function (result) {
        if (result) {
          //Delete result object from DB to DB
          result.destroy().then(function () {
            res.status(200).send(result);
          });
        } else {
          res.status(404).send("Event not found");
        }
      })
      .catch(function (err) {
        res.status(500).send(err);
      });
  });

  //Image Routes for future Work:
    // app.get("/events/:event_image", function (req, res) {
    //   let eventId = req.params.event_image;
    //   event
    //     .findByPk(eventId)
    //     .then(function (result) {
    //       res.status(200).send(result);
    //     })
    //     .catch(function (err) {
    //       res.status(500).send(err);
    //     });
    // });

    //Registration Route

    http://localhost:3000/registrants

app.get("/registrations", async(req,res) => {
  
  try {
    // Retrieve registration data from the database using Sequelize
    const registrations = await registration.findAll(); // Replace 'Registration' with your Sequelize model

    // Send the data as JSON to the client
    res.json(registrations);
  } catch (error) {
    console.error('Error retrieving registrations:', error);
    res.status(500).json({ error: 'An error occurred while retrieving data.' });
  }
});

    
  app.post("/register", async (req, res) => {
    try {
      const registrationData = req.body;
      console.log(req.body);
      const result = await registration.create(registrationData);
      res.status(200).send(result);
    } catch (error) {
      console.error("Error:", error);
      res.status(500).send("An error occurred.");
    }
  });
})

.catch((error) => {
  console.error("Database connection error:", error);
  });

