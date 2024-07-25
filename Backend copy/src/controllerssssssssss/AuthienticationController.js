const MiddleWare = require('../middleware/authMiddleware');
const connectToMySQL = require('../utils/db');
const cloudinary = require('../utils/couldinary');
class AuthController {
    static async login(req, res) {
        const { Phone_Number, Password } = req.body;
        if (!Phone_Number || !Password) {
            return res.json({
                message: "Please provide both phone number and password!",
            });
        }
        try {
            const connection = connectToMySQL();
            // Check if user is a customer
            const customerQuery = `
                SELECT * FROM tb_customers
                WHERE Phone_Number = ? AND Password = ?
            `;
            connection.query(customerQuery, [Phone_Number, Password], (customerError, customerResults) => {
                if (customerError) {
                    connection.end();
                    return res.json({ status: "error", message: "An error occurred" });
                }
                if (customerResults.length > 0) {
                    const customer = customerResults[0];
                    connection.end();
                    return res.json({
                        status: "ok",
                        message: "Login successful",
                        data: {
                            type: "customer",
                            details: customer
                        }
                    });
                }

                // Check if user is an employee
                const employeeQuery = `
                    SELECT * FROM tb_employees
                    WHERE Phone_Number = ? AND Password = ?
                `;
                connection.query(employeeQuery, [Phone_Number, Password], (employeeError, employeeResults) => {
                    connection.end();
                    if (employeeError) {
                        return res.json({ status: "error", message: "An error occurred" });
                    }
                    if (employeeResults.length > 0) {
                        const employee = employeeResults[0];
                        return res.json({
                            status: "ok",
                            message: "Login successful",
                            data: {
                                type: "admin",
                                details: employee
                            }
                        });
                    }

                    // No match found
                    return res.json({ status: "error", message: "ບໍ່ພົບເບີ" });
                });
            });
        } catch (error) {
            return res.json({ status: "error", message: error.message });
        }
    }


}

module.exports = AuthController;