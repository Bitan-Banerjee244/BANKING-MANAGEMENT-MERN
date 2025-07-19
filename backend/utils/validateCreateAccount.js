import { body } from "express-validator";

// Implementing Express Validator for Ultimate Checking
export const validateCreateAccount = [
  // ✅ Full Name
  body("fullName")
    .trim()
    .notEmpty().withMessage("Full name is required")
    .isLength({ min: 3 }).withMessage("Full name must be at least 3 characters"),

  // ✅ Email
  body("email")
    .trim()
    .notEmpty().withMessage("Email is required")
    .isEmail().withMessage("Invalid email format"),

  // ✅ Phone
  body("phone")
    .trim()
    .notEmpty().withMessage("Phone number is required")
    .isMobilePhone().withMessage("Invalid phone number"),

  // ✅ Address
  body("address")
    .trim()
    .notEmpty().withMessage("Address is required"),

  // ✅ Gender
  body("gender")
    .trim()
    .toLowerCase()
    .notEmpty().withMessage("Gender is required")
    .isIn(["male", "female", "other"]).withMessage("Invalid gender"),

  // ✅ Initial Deposit
  body("initialDeposit")
    .notEmpty().withMessage("Initial deposit is required")
    .isFloat({ min: 1000 }).withMessage("Minimum deposit must be at least ₹1000"),

  // ✅ PIN
  body("pin")
    .notEmpty().withMessage("PIN is required")
    .isLength({ min: 4, max: 6 }).withMessage("PIN must be 4-6 digits")
    .isNumeric().withMessage("PIN must be a number"),

  body("dob")
    .notEmpty().withMessage("Date of birth is required"),
];
