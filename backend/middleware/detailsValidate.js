import { validationResult } from "express-validator";

// If any error occurred in Express Validator its shows the error
export const detailsValidate = async (req, res, next) => {
    // Handling validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            message: "Validation Failed",
            errors: errors.array().map(err => ({
                field: err.param,
                message: err.msg
            }))
        });
    }
    next();
}