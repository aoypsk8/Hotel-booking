const connectToMySQL = require("../utils/db");
const cloudinary = require('../utils/couldinary');
class CustomerController {
    static async create(req, res) {
        const connection = connectToMySQL();
        const { First_name, Last_name, Phone_Number, Email, Passport, Password } = req.body;
        const Cus_Profile = req.file ? req.file.path : null;
        if (!First_name || !Last_name || !Phone_Number || !Email || !Passport || !Password) {
            return res.json({
                message: "Please provide all required fields!",
            });
        }
        try {
            const checkPhoneNumberQuery = `
                SELECT Phone_Number FROM tb_customers WHERE Phone_Number = ?
                UNION
                SELECT Phone_Number FROM tb_employees WHERE Phone_Number = ?
            `;
            connection.query(checkPhoneNumberQuery, [Phone_Number, Phone_Number], async (error, results) => {
                if (error) {
                    connection.end();
                    console.log(error);
                    return res.json({ message: "An error occurred" });
                }
                if (results.length > 0) {
                    connection.end();
                    return res.json({ message: "This phone number is already in use!" });
                }

                if (Cus_Profile) {
                    // Insert new customer record
                    const insertQuery = `
                INSERT INTO tb_customers (First_name, Last_name, Phone_Number, Email, Passport, Password, Cus_Profile)
                VALUES (?, ?, ?, ?, ?, ?, ?)
            `;
                    // Upload image
                    try {
                        //upload image
                        await cloudinary.uploader.upload(Cus_Profile);
                        const result = await cloudinary.uploader.upload(Cus_Profile);
                        const imageUrl = result.secure_url;

                        connection.query(insertQuery, [First_name, Last_name, Phone_Number, Email, Passport, Password, imageUrl], (insertError, insertResults) => {
                            connection.end();
                            if (insertError) {
                                return res.json({ status: "error", message: "An error occurred while registering" });
                            }
                            return res.json({
                                status: "ok",
                                message: "ລົງທະບຽນສຳເລັດ",
                                data: {
                                    Cus_ID: insertResults.insertId,
                                    First_name,
                                    Last_name,
                                    Phone_Number,
                                    Email,
                                    Passport,
                                    Cus_Profile: imageUrl
                                }
                            });
                        });
                    } catch (uploadError) {
                        connection.end();
                        return res.json({ status: "error", message: "An error occurred while uploading image" });
                    }
                } else {
                    // Insert new customer record
                    const insertQuery = `
                INSERT INTO tb_customers (First_name, Last_name, Phone_Number, Email, Passport, Password)
                VALUES (?, ?, ?, ?, ?, ?)
            `;
                    connection.query(insertQuery, [First_name, Last_name, Phone_Number, Email, Passport, Password], (insertError, insertResults) => {
                        connection.end();
                        if (insertError) {
                            return res.json({ status: "error", message: "An error occurred while registering" });
                        }
                        return res.json({
                            status: "ok",
                            message: "Customer registered successfully",
                            data: {
                                Cus_ID: insertResults.insertId,
                                First_name,
                                Last_name,
                                Phone_Number,
                                Email,
                                Passport,
                            }
                        });
                    });
                }
            });
        } catch (error) {
            connection.end();
            return res.json({ message: error.message });
        }
    }
    // Read All Customers
    static async getAll(req, res) {
        const connection = connectToMySQL();
        try {
            const query = 'SELECT * FROM tb_customers';
            connection.query(query, (error, results) => {
                connection.end();
                if (error) {
                    return res.json({ message: "An error occurred" });
                }
                return res.json({
                    status: "ok",
                    message: "Customers fetched successfully",
                    data: results,
                });
            });
        } catch (error) {
            connection.end();
            return res.json({ message: error.message });
        }
    }

    // Read Single Customer
    static async getById(req, res) {
        const connection = connectToMySQL();
        const { Cus_ID } = req.params;
        try {
            const query = 'SELECT * FROM tb_customers WHERE Cus_ID = ?';
            connection.query(query, [Cus_ID], (error, results) => {
                connection.end();
                if (error) {
                    return res.json({ message: "An error occurred" });
                }
                if (results.length === 0) {
                    return res.json({ message: "Customer not found" });
                }
                return res.json({
                    status: "ok",
                    message: "Customer fetched successfully",
                    data: results[0],
                });
            });
        } catch (error) {
            connection.end();
            return res.json({ message: error.message });
        }
    }

    // Update Customer
    static async update(req, res) {
        const connection = connectToMySQL();
        const { Cus_ID } = req.params;
        const { First_name, Last_name, Phone_Number, Email, Passport, Password } = req.body;
        const Cus_Profile = req.file ? req.file.path : null;

        console.log(Cus_ID);
        console.log(First_name);
        console.log(Last_name);
        console.log(Phone_Number);
        console.log(Email);
        console.log(Passport);
        console.log(Password);
        console.log(Cus_Profile);
        try {
            let updateQuery = `
                UPDATE tb_customers
                SET First_name = ?, Last_name = ?, Phone_Number = ?, Email = ?, Passport = ?, Password = ?
            `;
            const params = [First_name, Last_name, Phone_Number, Email, Passport, Password];

            if (Cus_Profile) {
                const result = await cloudinary.uploader.upload(Cus_Profile);
                const imageUrl = result.secure_url;

                updateQuery += ', Cus_Profile = ?';
                params.push(imageUrl);
            }

            updateQuery += ' WHERE Cus_ID = ?';
            params.push(Cus_ID);

            connection.query(updateQuery, params, (error, results) => {
                if (error) {
                    console.log(error);
                    return res.json({ status: "error", message: "An error occurred while updating" ,error});
                }
                if (results.affectedRows === 0) {
                    return res.json({ message: "Customer not found" });
                }
                try {
                    const query = 'SELECT * FROM tb_customers WHERE Cus_ID = ?';
                    connection.query(query, [Cus_ID], (error, results2) => {
                        connection.end();
                        if (error) {
                            return res.json({ message: "An error occurred",error });
                        }
                        return res.json({
                            status: "ok",
                            message: "Customer updated successfully",
                            data: {
                                type: "customer",
                                details: results2[0]
                            }
                        });
                    });
                } catch (error) {
                    connection.end();
                    console.log(error);
                    return res.json({ message: error.message });
                }

            });
        } catch (error) {
            connection.end();
            console.log(error);
            return res.json({ message: error.message });
        }
    }

    // Delete Customer
    static async delete(req, res) {
        const connection = connectToMySQL();
        const { Cus_ID } = req.params;
        try {
            const query = 'DELETE FROM tb_customers WHERE Cus_ID = ?';
            connection.query(query, [Cus_ID], (error, results) => {
                connection.end();
                if (error) {
                    return res.json({ status: "error", message: "An error occurred while deleting" });
                }
                if (results.affectedRows === 0) {
                    return res.json({ message: "Customer not found" });
                }
                return res.json({
                    status: "ok",
                    message: "Customer deleted successfully",
                });
            });
        } catch (error) {
            connection.end();
            return res.json({ message: error.message });
        }
    }

}

module.exports = CustomerController;
