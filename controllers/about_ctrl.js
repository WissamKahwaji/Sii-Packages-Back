import { AboutModel } from "../models/about/about_model.js";
import nodemailer from "nodemailer";

export const getAboutData = async (req, res, next) => {
  try {
    const data = await AboutModel.findOne();
    res.status(200).json(data);
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

export const sendEmail = async (req, res, next) => {
  try {
    const { email, name, companyName, mobile, message, subject } = req.body;
    const transporter = nodemailer.createTransport({
      port: 465,
      host: "smtp.gmail.com",
      auth: {
        user: "sii.app.developer@gmail.com",
        pass: "xyuf bypy grqf mlot",
      },
      secure: true,
    });
    const mailOptions = {
      from: email,
      to: "info@siimedia.net",
      subject: `${subject}`,
      html: `
        <p><strong>Name:</strong>${name}</p>
        ${
          companyName
            ? `<p><strong>Company Name : </strong>${companyName}</p>`
            : ``
        }
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Mobile:</strong> ${mobile}</p>
        <p>${message}</p>
      `,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
      } else {
        console.log("Email sent: " + info.response);
        res.status(200).send("Enquiry submitted successfully");
      }
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

export const requestPackage = (req, res, next) => {
  try {
    const { email, name, companyName, mobile, subject, choosenPackage } =
      req.body;
    const transporter = nodemailer.createTransport({
      port: 465,
      host: "smtp.gmail.com",
      auth: {
        user: "sii.app.developer@gmail.com",
        pass: "xyuf bypy grqf mlot",
      },
      secure: true,
    });
    const mailOptions = {
      from: email,
      to: "info@siimedia.net",
      subject: `${subject}`,
      html: `
        <p><strong>Name:</strong>${name}</p>
        ${
          companyName
            ? `<p><strong>Company Name : </strong>${companyName}</p>`
            : ``
        }
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Mobile:</strong> ${mobile}</p>
        <p><strong>Choosen Package : </strong> ${choosenPackage}</p>
      `,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
      } else {
        console.log("Email sent: " + info.response);
        res.status(200).send("Enquiry submitted successfully");
      }
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
