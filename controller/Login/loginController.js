const { hash } = require('bcrypt');
const db = require("../../models");
const { OK, BAD_REQUEST } = require("../../constants/httpCodes");
const bcrypt = require("bcrypt");

const signUp = async (req, res) => {
  try {
    const email = await db.User.findAll({
      attributes: ["email"],
      where: { email: `${req.body.email}` },
    });

    if (email.length == 0) {
      let contraseña = req.body.password;
      let rounds = 10;
      const encryptedPassword = await hash(contraseña, rounds);
      const user = await db.User.create({
        name: req.body.name,
        email: req.body.email,
        password: encryptedPassword,
      });

      if (user) {
        res.status(OK).json({ user });
      } else {
        res.status(BAD_REQUEST).json({ msg: "Error,try insert new record" });
      }
    } else {
      res.status(OK).json({ msg: "email be in use,try with other email" });
    }
  } catch (error) {
    console.log(error);
    res
      .status(BAD_REQUEST)
      .send({ msg: "there is an error with the server,try later" });
  }
};

const authUser = async (req, res) => {
  try {
    const email = await db.User.findAll({
      attributes: ["email"],
      where: { email: `${req.body.email}` },
    });

    if (email.length != 0) {
      const user = await db.User.findAll({ 
      attributes: ['id', 'name','email','password'],
      where:{email:`${req.body.email}`
    } 
  });
      let password = `${req.body.password}`;
      const userPassword=user[0].dataValues.password;
      const comparison = await bcrypt.compare(password, userPassword);

      if (comparison) {
        res.status(OK).send(user);
      } else {
        res
          .status(BAD_REQUEST)
          .send({ msg: "Password don't found, try again" });
      }
    } else {
      res.status(BAD_REQUEST).send({ msg: "Email don't found, try again" });
    }
  } catch (error) {
    console.log(error)
    res
      .status(BAD_REQUEST)
      .send({ msg: "there is an error with the server,try later" });
  }
  
};

const deleteUser = async (req, res) => {
  try {
    await db.User.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(OK).send("user deleted");
  } catch (errors) {
    res
      .status(BAD_REQUEST)
      .send({ msg: "it happend a error with server, try again" });
    console.error(errors.message);
  }
};

module.exports = {
  deleteUser,
  authUser,
  signUp,
};
