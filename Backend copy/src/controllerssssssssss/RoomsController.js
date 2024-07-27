const connectToMySQL = require("../utils/db");
const cloudinary = require('../utils/couldinary');
class RoomsController {
    static async getAll(req, res) {
        const connection = connectToMySQL();
        try {
            const query = `
            SELECT tr.*, tt.Type_ID,tt.Type_name, tt.PriceDay, tt.PriceMonth, tt.PriceYear 
            FROM tb_rooms AS tr 
            JOIN tb_type AS tt ON tr.Type_ID = tt.Type_ID
        `;

            connection.query(query, (error, results) => {
                connection.end();
                if (error) {
                    return res.json({ message: "An error occurred" });
                }
                return res.json({
                    status: "ok",
                    message: "Rooms fetched successfully",
                    data: results,
                });
            });
        } catch (error) {
            connection.end();
            return res.json({ message: error.message });
        }
    }
    static async getAllWhereType(req, res) {
        const connection = connectToMySQL();
        const { Type_ID } = req.params;
        try {
            const query = `
            SELECT tr.*, tt.Type_ID,tt.Type_name, tt.PriceDay, tt.PriceMonth, tt.PriceYear 
            FROM tb_rooms AS tr 
            JOIN tb_type AS tt ON tr.Type_ID = tt.Type_ID
            WHERE tr.Type_ID =${Type_ID} AND  tr.Status =1
        `;

            connection.query(query, (error, results) => {
                connection.end();
                if (error) {
                    return res.json({ message: "An error occurred" });
                }
                return res.json({
                    status: "ok",
                    message: "Rooms fetched successfully",
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
        const { Type_ID, Room_Number } = req.body;
        try {
            const query = 'INSERT INTO tb_rooms (Type_ID, Room_Number,Status) VALUES (?, ?, true)';
            connection.query(query, [Type_ID, Room_Number], (error, results) => {
                connection.end();
                if (error) {
                    return res.json({ message: "An error occurred", error });
                }
                return res.json({
                    status: "ok",
                    message: "Rooms created successfully",
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
        const { Type_ID, Room_Number, Status } = req.body;
        const { Room_ID } = req.params;
        try {
            const query = `UPDATE tb_rooms SET Type_ID = ?, Room_Number = ? , Status = ? WHERE Room_ID = ${Room_ID}`;
            connection.query(query, [Type_ID, Room_Number, Status], (error, results) => {
                connection.end();
                if (error) {
                    return res.json({ message: "An error occurred", error });
                }
                return res.json({
                    status: "ok",
                    message: "Rooms Update successfully",
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
            const { Room_ID } = req.params;
            if (!Room_ID) {
                return res.json({ message: "ກະລຸນາປ້ອນ ID !" });
            }
            const deleteUserQuery = 'DELETE FROM tb_rooms WHERE Room_ID = ?';
            connection.query(deleteUserQuery, [Room_ID], (error, results) => {
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
    static async updateStatus(req, res) {
        const connection = connectToMySQL();
        const { Status } = req.body;
        const { Room_ID } = req.params;
        try {
            const query = `UPDATE tb_rooms SET  Status = ? WHERE Room_ID = ${Room_ID}`;
            connection.query(query, [Status], (error, results) => {
                connection.end();
                if (error) {
                    return res.json({ message: "An error occurred", error });
                }
                return res.json({
                    status: "ok",
                    message: "Rooms Update successfully",
                    data: results,
                });
            });
        } catch (error) {
            connection.end();
            return res.json({ message: error.message });
        }
    }
}

module.exports = RoomsController;