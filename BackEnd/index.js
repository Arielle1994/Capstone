const express = require("express");
const app = express();
const configdb = require("./config");
const event = require("./models/event");
const login = require("./models/login");
const registration = require("./models/registration");
const fs = require ("fs");
const fastcsv = require("fast-csv"); // Import the 'fast-csv' library for CSV operations
const path = require("path"); // Import the 'path' module for handling file paths
const stripeConfig = ("pk_live_51O8nIAGSTpg97mPkC2gVz3ZNSJ43PwpFGqDzhUD5NHtKQccU6XYRYN2bNwrmCtJzK5wNdnt8TlmQIfg7n0Op4YxJ00ay7UfPpD");
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

  app.post('/register/batch', async (req, res) => {
    try {
      const registrants = req.body;
      if (!Array.isArray(registrants)) {
        return res.status(400).send('Invalid batch registration data. Expecting an array.');
      }
      const results = await Promise.all(registrants.map(registration.create));
      res.status(200).send(results);
    } catch (error) {
      console.error("Error:", error);
      res.status(500).send("An error occurred.");
    }
  });
  // app.post('/register/batch', async (req, res) => {
  //   try {
  //     const registrants = req.body;
  //     const results = await Promise.all(registrants.map(registration.create));
  //     res.status(200).send(results);
  //   } catch (error) {
  //     console.error("Error:", error);
  //     res.status(500).send("An error occurred.");
  //   }
  // });

  app.get("/api/export", async (req, res) => {
    try {
      // Fetch data from the database
      const registrationData = await registration.findAll();

      // Define the file path for the exported CSV
      const filePath = path.join(__dirname, "exported_data.csv");

      const data = [
        // Header row
        [
          'Registration ID',
          'Event ID',
          'First Name',
          'Last Name',
          'Age',
          'Gender',
          'Email',
          'Phone Number',
          'Distance Length',
          'Address',
          'Postal Code',
          'Province',
          'City',
          'Entry Type',
          'Waiver',
        ],
      ];

      // Populate data array with registration data
      registrationData.forEach((registration) => {
        const rowData = [
          registration.registration_id,
          registration.event_id,
          registration.first_name,
          registration.last_name,
          registration.age,
          registration.gender,
          registration.email || '',
          registration.phone_number || '',
          registration.distance_length,
          registration.address || '',
          registration.postal_code || '',
          registration.province || '',
          registration.city || '',
          registration.entry_type,
          registration.waiver,
        ];
        data.push(rowData);
      });

      // Create a write stream and write the data as a CSV
      const ws = fs.createWriteStream(filePath);
      fastcsv.write(data, { headers: true }).pipe(ws);

      ws.on("finish", () => {
        // Send the CSV file as a downloadable response
        res.download(filePath, "registration_data.csv", (err) => {
          if (err) {
            console.error("Error exporting data:", err);
            res.status(500).send("Error exporting data");
          }
        });
      });
    } catch (error) {
      console.error("Error exporting data:", error);
      res.status(500).send("Error exporting data");
    }
  });
})

.catch((error) => {
  console.error("Database connection error:", error);
  });

  
  app.post("/create-payment-intent", async (req, res) => {
    const { items } = req.body;
  
    // Create a Tax Calculation for the items being sold
    const taxCalculation = await calculateTax(items, 'cad');
    const amount = await calculateOrderAmount(items, taxCalculation);
  
    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: "cad",
      // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
      automatic_payment_methods: {
        enabled: true,
      },
      metadata: {
        tax_calculation: taxCalculation.id
      },
    });
  
    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  });
  
  // Invoke this method in your webhook handler when `payment_intent.succeeded` webhook is received
  const handlePaymentIntentSucceeded = async (paymentIntent) => {
    // Create a Tax Transaction for the successful payment
    stripe.tax.transactions.createFromCalculation({
      calculation: paymentIntent.metadata['tax_calculation'],
      reference: 'myOrder_123', // Replace with a unique reference from your checkout/order system
    });
  };