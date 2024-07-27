const cloudinary = require('../utils/couldinary');
const connectToMySQL = require('../utils/db');
class EquipmentController {
    static async getAll(req, res) {
        const connection = connectToMySQL();
        try {
            const query = 'SELECT * FROM tb_equipment';
            connection.query(query, (error, results) => {
                connection.end();
                if (error) {
                    return res.json({ message: "An error occurred", error });
                }
                return res.json({
                    status: "ok",
                    message: "Equipment fetched successfully",
                    data: results,
                });
            });
        } catch (error) {
            connection.end();
            return res.json({ message: error.message });
        }
    }

    static async create(req, res) {
        const connection = connectToMySQL();
        try {
            const { EquipmentName, price, amount } = req.body;
            const query = `INSERT INTO tb_equipment (EquipmentName, price, amount) VALUES (?, ?, ?)`;
            connection.query(query, [EquipmentName, price, amount], (error, results) => {
                connection.end();
                if (error) {
                    return res.json({ message: "An error occurred", error });
                }
                return res.json({
                    status: "ok",
                    message: "Equipment created successfully",
                    data: results,
                });
            });
        } catch (error) {
            connection.end();
            return res.json({ message: error.message });
        }
    }

    static async update(req, res) {
        const connection = connectToMySQL();
        const { EQ_ID } = req.params;
        const { EquipmentName, price, amount } = req.body;
        try {
            const query = `UPDATE tb_equipment SET EquipmentName = ?, price = ?, amount = ? WHERE EquipmentID = ?`;
            connection.query(query, [EquipmentName, price, amount, EQ_ID], (error, results) => {
                connection.end();
                if (error) {
                    return res.json({ message: "An error occurred", error });
                }
                return res.json({
                    status: "ok",
                    message: "Equipment updated successfully",
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
            const { EQ_ID } = req.params;

            const deleteUserQuery = 'DELETE FROM tb_equipment WHERE EquipmentID =  ?';
            connection.query(deleteUserQuery, [EQ_ID], (error, results) => {
                if (error) {
                    return res.json({ message: "ເກີດຂໍ້ຜິດພາດ" });
                }
                if (results.affectedRows === 0) {
                    return res.json({ message: "ບໍ່ພົບ ID !" });
                }
                connection.end();
                return res.json({
                    status: "ok",
                    message: "ລຶບສຳເລັດ",
                });
            });
        } catch (error) {
            return res.json({ message: error.message });
        }
    }

}

module.exports = EquipmentController;