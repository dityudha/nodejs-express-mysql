const sql = require("./db.js");

// constructor
const Cars = function(cars) {
  this.brand = cars.brand;
  this.type = cars.type;
  this.sold = cars.sold;
};

Cars.create = (newCars, result) => {
  sql.query("INSERT INTO cars SET ?", newCars, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created cars: ", { id: res.insertId, ...newCars });
    result(null, { id: res.insertId, ...newCars });
  });
};

Cars.findById = (id, result) => {
  sql.query(`SELECT * FROM cars WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found cars: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Cars with the id
    result({ kind: "not_found" }, null);
  });
};

Cars.getAll = (brand, result) => {
  let query = "SELECT * FROM cars";

  if (brand) {
    query += ` WHERE brand LIKE '%${brand}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("cars: ", res);
    result(null, res);
  });
};

Cars.getAllsold = result => {
  sql.query("SELECT * FROM cars WHERE sold=true", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("cars: ", res);
    result(null, res);
  });
};

Cars.updateById = (id, cars, result) => {
  sql.query(
    "UPDATE cars SET brand = ?, type = ?, sold = ? WHERE id = ?",
    [cars.brand, cars.type, cars.sold, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Cars with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated cars: ", { id: id, ...cars });
      result(null, { id: id, ...cars });
    }
  );
};

Cars.remove = (id, result) => {
  sql.query("DELETE FROM cars WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Cars with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted cars with id: ", id);
    result(null, res);
  });
};

Cars.removeAll = result => {
  sql.query("DELETE FROM cars", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} cars`);
    result(null, res);
  });
};

module.exports = Cars;