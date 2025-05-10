import { body } from "express-validator";
const passMsg =
    "Not valid password. Password must to contain at least: 1 number 1 symbol 1 uppercase letter";
export const registerValidation = [
    body("email").isEmail().withMessage("Not a valid e-mail address"),
    body("password")
        .trim()
        .isLength({ min: 4, max: 20 })
        .withMessage("Password must be 4-20 symbols")
        .matches(/^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>])(?=.*\d).+$/)
        .withMessage(passMsg),
    body("name").notEmpty().withMessage("Not a valid name"),
    body("surname").notEmpty().withMessage("Not a valid surname"),
    body("phone")
        .isLength({ min: 9, max: 13 })
        .withMessage("Not a valid phone"),
    body("tin").isLength({ min: 14, max: 14 }).withMessage("Not a INN"),
    body("address").notEmpty().withMessage("Please provide an address"),
    body("role").notEmpty().withMessage("Please select a role"),
    body("legal_registered.region")
        .notEmpty()
        .withMessage("Please provide a region"),
    body("legal_registered.street")
        .notEmpty()
        .withMessage("Please provide a street"),
    body("legal_registered.house")
        .notEmpty()
        .withMessage("Please provide a house"),
    body("legal_registered.city")
        .notEmpty()
        .withMessage("Please provide a city"),
    body("legal_registered.district")
        .notEmpty()
        .withMessage("Please provide a district"),
];

export const loanValidation = [
    body("tool")
        .isLength({ min: 3, max: 20 })
        .withMessage("Tool name must be 3-20 symbols"),
    body("serialNumber")
        .isLength({ min: 8, max: 20 })
        .withMessage("Serial Number must be 8-20 symbols"),
    body("loanDate").notEmpty().withMessage("Loan Date is empty"),
];
