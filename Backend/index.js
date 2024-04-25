const express = require("express");
const { connection } = require("./Config/db");
const { UserModel } = require("./models/userModel");
const { vendorModel } = require("./models/vendorModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { authentiction } = require("./Middleware/authentication");
require("dotenv").config();
const cors = require("cors");

const app = express();
app.use(cors());

app.use(express.json());
app.get("/", (req, res) => {
  res.send("Hello");
});

app.post("/signup", async (req, res) => {
  try {
    const { email, password } = req.body;
    const isUser = await UserModel.findOne({ email });
    if (isUser) {
      res.status(200).send({ msg: "User Already Exists", success: true });
    } else {
      bcrypt.hash(password, 4, async function (err, hash) {
        if (err) {
          res.status(500).send({ msg: err.message, success: false });
        } else {
          const new_user = new UserModel({
            email,
            password: hash,
          });
          try {
            await new_user.save();
            res.status(200).send({ msg: "Sign Up Successfull", success: true });
          } catch {
            res
              .status(500)
              .send({ msg: "Internal Server Error", success: false });
          }
        }
      });
    }
  } catch (error) {
    res.status(500).send({ msg: "Internal Server Error" });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    const hashed_password = user.password;
    const user_id = user._id;
    const token = jwt.sign({ user_id }, process.env.SECRET_KEY);
    bcrypt.compare(password, hashed_password, function (err, result) {
      if (err)
        res.send({
          msg: "Something went Wrong Please Try Later",
          success: false,
        });
      if (result) {
        res
          .status(200)
          .send({ msg: "Login Successful", token: token, success: true });
      } else {
        res.status(401).send({ msg: "Wrong Password", success: false });
      }
    });
  } catch (error) {
    res.status(500).send({ msg: "Internal Server Error", success: false });
  }
});

app.post("/getVendors/delete", authentiction, async (req, res) => {
  try {
    const { _ids } = req.body;
    const deletedVendors = await vendorModel.deleteMany({ _id: { $in: _ids } });

    if (deletedVendors.deletedCount > 0) {
      res.status(200).json({ message: "Vendors deleted successfully" });
    } else {
      res.status(404).json({ error: "No vendors found with provided IDs" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/getVendors/edit", authentiction, async (req, res) => {
  try {
    const { _id } = req.body;
    const vendor = await vendorModel.findById(_id);

    if (!vendor) {
      return res.status(404).json({ error: "Vendor not found" });
    }
    vendor.status = !vendor.status;
    await vendor.save();
    res.status(200).json({
      message: "Vendor status updated successfully",
      updatedVendor: vendor,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/getVendors/add", authentiction, async (req, res) => {
  try {
    const { name, paymentDate, orderId, location, status, payment } = req.body;
    let vendorData = {
      name,
      paymentDate,
      orderId,
      location,
      status: status == 1 ? true : false,
      payment,
    };

    const newVendor = new vendorModel(vendorData);

    await newVendor.save();

    res.status(201).json({
      message: "Vendor added successfully",
      vendor: newVendor,
      success: true,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error", success: false });
  }
});



app.post("/getVendors", authentiction, async (req, res) => {
    try {
      const { sortBy, sortOrder, filterByLocation, filterByStatus } = req.query;
  
      let query = {}; 
      let sorting = {};
  
      if (sortBy) {
        const sortDirection = sortOrder === "desc" ? -1 : 1;
  
        if (sortBy === "date") {
          sorting = { ...sorting, paymentDate: sortDirection };
        } else if (sortBy === "status") {
          sorting = { ...sorting, status: sortDirection };
        } else if (sortBy === "payment") {
          sorting = { ...sorting, payment: sortDirection };
        }
      }
  
      if (filterByLocation) {
        query = { ...query, location: filterByLocation };
      }
  
      if (filterByStatus) {
        query = { ...query, status: filterByStatus };
      }
  
      const vendors = await vendorModel.find(query).sort(sorting);
  
      res.status(200).json({ vendorDetails: vendors }); 
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
  

app.listen(8000, async () => {
  try {
    await connection;
    console.log("DB Connected Successfully");
  } catch {
    console.log("Error in connecting DB");
    console.log(err);
  }
  console.log("Server Started Succesfully");
});
