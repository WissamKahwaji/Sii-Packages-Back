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

export const editAboutData = async (req, res, next) => {
  try {
    const {
      ourVision,
      ourMission,
      ourValues,
      ourVision_ar,
      ourMission_ar,
      ourValues_ar,
    } = req.body;
    const data = await AboutModel.findOne();
    if (!data) {
      return res.status(404).json({ message: "data not found" });
    }
    if (ourVision) data.ourVision = ourVision;
    if (ourMission) data.ourMission = ourMission;
    if (ourValues) data.ourValues = ourValues;
    if (ourVision_ar) data.ourVision_ar = ourVision_ar;
    if (ourVision_ar) data.ourVision_ar = ourVision_ar;
    if (ourVision_ar) data.ourVision_ar = ourVision_ar;
    const updatedData = await data.save();
    return res.status(200).json(updatedData);
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
    const mailTransport = nodemailer.createTransport({
      host: "mail.siimedia.net",
      secure: true,
      secureConnection: true,
      tls: {
        ciphers: "SSLv3",
      },
      requireTLS: true,
      port: 465,
      debug: true,
      connectionTimeout: 10000,
      auth: {
        user: "info@siimedia.net",
        pass: "pass@Info",
      },
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
    const mailOptions2 = {
      from: "info@siimedia.net",
      to: email,
      subject: "Enquiry submitted successfully",
      html: `
      <p>Welcome To Sii Media</p>
      <p>Your enquiry has been submitted successfully</p>
        <p><strong>Your Name:</strong>${name}</p>
        ${
          companyName
            ? `<p><strong>Your Company Name : </strong>${companyName}</p>`
            : ``
        }
        <p><strong>Your Email:</strong> ${email}</p>
        <p><strong>Your Mobile:</strong> ${mobile}</p>
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
        mailTransport.sendMail(mailOptions2, (error, inf) => {
          if (error) {
            console.log(error);
          } else {
            console.log("success");
          }
        });
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
