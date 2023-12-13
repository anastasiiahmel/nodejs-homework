const mongoose = require("mongoose");

const app = require("./app");

const { DB_STRING, PORT = 5000 } = process.env;

mongoose
  .connect(DB_STRING)
  .then(() => {
    console.log("Database connection successful !");
    app.listen(PORT, () => {
      console.log(`Server running. Use our API on port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
