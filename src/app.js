const path = require("path");
const express = require("express");

const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();

// Default path for express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Amit App",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Page",
    name: "Amit",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    message: "This is help message",
    title: "Help",
    name: "Amit",
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404-Help",
    errorMessage: "Help Artical Not Found",
    name: "Amit",
  });
});

// Query String Pass
app.get("/products", (req, res) => {
  console.log(req.query);
  if (!req.query.search) {
    res.send({
      error: "you must provide search term",
    });
    return;
  }
  res.send({
    product: [],
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "No Address",
    });
  }

  geocode(
    req.query.address,
    (error, { longitude, latituade, location } = {}) => {
      if (error) {
        res.send({ error });
      }
      forecast(longitude, latituade, (error, forcastData) => {
        if (error) {
          res.send({ error });
        }
        res.send({
          forecast: forcastData,
          location,
          address: req.query.address,
        });
      });
    }
  );
});

// Error Page for routing (It should last)
app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    errorMessage: "Page Not Found",
    name: "Amit",
  });
});

// app.get("/help", (req, res) => {
//   const helpDirectory = path.join(__dirname, "../public/help.html");
//   res.sendFile(helpDirectory);
// });

// app.get("/about", (req, res) => {
//  const aboutDirectory = path.join(__dirname, '../public/about.html');
//  res.sendFile(aboutDirectory);
// });

app.listen(3000, () => {
  console.log("App is running at 3000");
});
