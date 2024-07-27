const connectToMySQL = require("../utils/db");
const cloudinary = require('../utils/couldinary');
class EmployeeController {
    static async create(req, res) {
        const connection = connectToMySQL();
        const { Emp_FirstName, Emp_LastName, Phone_Number, Emp_Address, Password } = req.body;
        const Emp_Profile = req.file ? req.file.path : null;

        console.log(Emp_Profile);
        if (!Emp_FirstName || !Emp_LastName || !Phone_Number || !Emp_Address || !Password ) {
            return res.json({
                message: "Please provide all required fields!",
            });
        }
        try {
            // Check if phone number already exists in both customers and employees
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

                // Insert new employee record
                const insertQuery = `
                    INSERT INTO tb_employees (Emp_FirstName, Emp_LastName, Phone_Number, Emp_Address, Emp_Profile, Password)
                    VALUES (?, ?, ?, ?, ?, ?)
                `;

                if (Emp_Profile) {
                    try {
                         //upload image
                         await cloudinary.uploader.upload(Emp_Profile);
                         const result = await cloudinary.uploader.upload(Emp_Profile);
                         const imageUrl = result.secure_url;

                        connection.query(insertQuery, [Emp_FirstName, Emp_LastName, Phone_Number, Emp_Address, imageUrl, Password], (insertError, insertResults) => {
                            connection.end();
                            if (insertError) {
                                return res.json({ status: "error", message: "An error occurred while registering" });
                            }

                            return res.json({
                                status: "ok",
                                message: "Employee registered successfully",
                                data: {
                                    Emp_ID: insertResults.insertId,
                                    Emp_FirstName,
                                    Emp_LastName,
                                    Phone_Number,
                                    Emp_Address,
                                    Emp_Profile: imageUrl
                                }
                            });
                        });
                    } catch (uploadError) {
                        
                        connection.end();
                        return res.json({ status: "error", message: "An error occurred while uploading image" });
                    }
                } else {
                    connection.end();
                    return res.json({ message: "Please provide an image" });
                }
            });
        } catch (error) {
            connection.end();
            return res.json({ message: error.message });
        }
    }
    // Read All Employees
    static async getAll(req, res) {
        const connection = connectToMySQL();
        try {
            const query = 'SELECT * FROM tb_employees';
            connection.query(query, (error, results) => {
                connection.end();
                if (error) {
                    return res.json({ message: "An error occurred" });
                }
                return res.json({
                    status: "ok",
                    message: "Employees fetched successfully",
                    data: results,
                });
            });
        } catch (error) {
            connection.end();
            return res.json({ message: error.message });
        }
    }

    static async delete(req, res) {
        try {
            const connection = connectToMySQL();
            const { Emp_ID } = req.params;
            if (!Emp_ID) {
                return res.json({ message: "ກະລຸນາປ້ອນ ID !" });
            }
            const deleteUserQuery = 'DELETE FROM tb_employees WHERE Emp_ID = ?';
            connection.query(deleteUserQuery, [Emp_ID], (error, results) => {
                if (error) {
                    return res.json({ message: "ເກີດຂໍ້ຜິດພາດ" });
                }
                if (results.affectedRows === 0) {
                    return res.json({ message: "ບໍ່ພົບ ID !" });
                }
                connection.end();
                return res.json({
                    status: "ok",
                    message: "ລຶບຜູ້ໃຊ້ສຳເລັດ",
                });
            });
        } catch (error) {
            return res.json({ message: error.message });
        }
    }

    static async update(req, res) {
        try {
            const connection = connectToMySQL();
            const { Emp_ID } = req.params;
            const { Emp_FirstName, Emp_LastName, Phone_Number, Password ,Emp_Address} = req.body;
            const Profile_img = req.file ? req.file.path : null;

            let updateQuery = 'UPDATE tb_employees SET Emp_FirstName = ?, Emp_LastName = ?, Phone_Number = ?, Password=? ,Emp_Address=?';
            let queryParams = [Emp_FirstName, Emp_LastName, Phone_Number, Password,Emp_Address];

            if (Profile_img) {
                const result = await cloudinary.uploader.upload(Profile_img);
                const imageUrl = result.secure_url;
                updateQuery += ', Emp_Profile = ?';
                queryParams.push(imageUrl);
            }

            updateQuery += ' WHERE Emp_ID = ?';
            queryParams.push(Emp_ID);

            connection.query(updateQuery, queryParams, (error, results) => {
                if (error) {
                    return res.json({ message: "ເກີດຂໍ້ຜິດພາດ",error });
                }
                if (results.affectedRows === 0) {
                    return res.json({ message: "ບໍ່ພົບ ID !" });
                }
                connection.end();
                return res.json({
                    status: "ok",
                    message: "ອັບເດດສຳເລັດ",
                });
            });
        } catch (error) {
            return res.json({ message: error.message });
        }
    }


}

module.exports = EmployeeController;
