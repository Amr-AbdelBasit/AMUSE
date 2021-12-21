import { Register } from "../../dto/account/register";
import { KeyVal } from "../../dto/shared/keyVal";
import User from "../../model/account/user";
require('util').inspect.defaultOptions.depth = null


const express = require("express");
const Gender = require("../../model/account/gender");
const router = express.Router();

router.post("/addGender", async (req: any, res: any) => {
  try {
    const gender = new Gender(req.body);
    await gender.save();
    res.status(200).send("Added successfully");
  } catch (err) {
    res.status(400).send(err);
    console.log(err);
  }
});

router.get("/genderList", async (req: any, res: any) => {
  try {
      console.log(res);
      
    const genders = await Gender.find({ isActive: true });
    const gendersResponse = new Array<KeyVal>();
    genders.forEach(await function (gender: any) {
      gendersResponse.push({
        id: gender.id,
        name: gender.name,
      });
    });
    res.status(200).send({ genders: gendersResponse });
  } catch (err) {
    res.status(400).send(err);
  }
});

router.post("/register", async (req: any, res: any) => {
    try {
      const user = new User(req.body);
      await user.save();
      res.status(200).send("Registered successfully");
    } catch (err) {
      res.status(400).send(err);
      console.log(err);
    }
  });
  
module.exports = router;
