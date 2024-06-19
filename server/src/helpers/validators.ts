import { body } from "express-validator";
const passMsg = 'Not valid password \n Password must to contain at least: \n 1 number \n 1 symbol \n 1 uppercase letter'
export const registerValidation = [
    body("email").isEmail().withMessage("Not a valid e-mail address"),
    body("password").trim().isLength({ min: 4, max: 20 }).matches(/^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>])(?=.*\d).+$/).withMessage(passMsg),
    body('name').notEmpty().withMessage("Not a valid name"),
    body('surname').notEmpty().withMessage("Not a valid surname"),
    body('phone').isLength({min:9, max:13}).withMessage("Not a valid phone"),
    body('tin').isLength({min:14, max:14}).withMessage("Not a INN"),
    body('address').notEmpty().withMessage("Please provide an address"),
    body('role').notEmpty().withMessage("Please select a role")
];
