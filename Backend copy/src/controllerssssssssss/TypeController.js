const connectToMySQL = require("../utils/db");
const cloudinary = require('../utils/couldinary');
class TypeController {
    static async create(req, res) {
        const connection = connectToMySQL();
        const { Type_name, PriceDay, PriceMonth, PriceYear, Area, detail, remark } = req.body;

        // Extract file paths
        const images = req.files || {};
        const imgPaths = {
            img1: images['img1'] ? images['img1'][0].path : null,
            img2: images['img2'] ? images['img2'][0].path : null,
            img3: images['img3'] ? images['img3'][0].path : null,
            img4: images['img4'] ? images['img4'][0].path : null,
            img5: images['img5'] ? images['img5'][0].path : null,
            img6: images['img6'] ? images['img6'][0].path : null,
            img7: images['img7'] ? images['img7'][0].path : null
        };

        if (!Type_name) {
            return res.status(400).json({ message: "Type_name is required" });
        }

        // Define the SQL query to insert data
        const insertQuery = `
            INSERT INTO tb_type (Type_name, PriceDay, PriceMonth, PriceYear, Area, detail, remark, img1, img2, img3, img4, img5, img6, img7)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?)
        `;

        // Upload images to Cloudinary and get URLs
        const imageUrls = {};
        for (const key in imgPaths) {
            if (imgPaths[key]) {
                try {
                    const result = await cloudinary.uploader.upload(imgPaths[key]);
                    imageUrls[key] = result.secure_url;
                } catch (uploadError) {
                    connection.end();
                    return res.status(500).json({ status: "error", message: `An error occurred while uploading ${key}` });
                }
            }
        }

        // Execute the SQL query
        connection.query(insertQuery, [
            Type_name,
            PriceDay,
            PriceMonth,
            PriceYear,
            Area,
            detail,
            remark,
            imageUrls.img1 || null,
            imageUrls.img2 || null,
            imageUrls.img3 || null,
            imageUrls.img4 || null,
            imageUrls.img5 || null,
            imageUrls.img6 || null,
            imageUrls.img7 || null
        ], (err, results) => {
            connection.end();
            if (err) {
                console.error('Error inserting data into tb_type:', err);
                return res.status(500).json({ message: "An error occurred while inserting data" });
            }

            // Respond with the result of the insertion
            return res.json({
                status: "ok",
                message: 'Type data created successfully',
                data: {
                    Type_ID: results.insertId,
                    Type_name,
                    PriceDay,
                    PriceMonth,
                    PriceYear,
                    Area,
                    detail,
                    remark,
                    img1: imageUrls.img1 || null,
                    img2: imageUrls.img2 || null,
                    img3: imageUrls.img3 || null,
                    img4: imageUrls.img4 || null,
                    img5: imageUrls.img5 || null,
                    img6: imageUrls.img6 || null,
                    img7: imageUrls.img7 || null
                }
            });
        });
    }
    static async update(req, res) {
        const connection = connectToMySQL();
        const { Type_ID } = req.params;
        const { Type_name, PriceDay, PriceMonth, PriceYear, Area, detail, remark } = req.body;

        const images = req.files || {};
        const imgPaths = {
            img1: images['img1'] ? images['img1'][0].path : null,
            img2: images['img2'] ? images['img2'][0].path : null,
            img3: images['img3'] ? images['img3'][0].path : null,
            img4: images['img4'] ? images['img4'][0].path : null,
            img5: images['img5'] ? images['img5'][0].path : null,
            img6: images['img6'] ? images['img6'][0].path : null,
            img7: images['img7'] ? images['img7'][0].path : null
        };

        let updateQuery = `
            UPDATE tb_type
            SET Type_name = ?, PriceDay = ?, PriceMonth = ?, PriceYear = ?, Area = ?, detail = ?, remark = ?,
                img1 = ?, img2 = ?, img3 = ?, img4 = ?, img5 = ?, img6 = ?, img7 = ?
            WHERE Type_ID = ?
        `;

        let queryParams = [
            Type_name,
            PriceDay,
            PriceMonth,
            PriceYear,
            Area,
            detail,
            remark,
            imgPaths.img1 || null,
            imgPaths.img2 || null,
            imgPaths.img3 || null,
            imgPaths.img4 || null,
            imgPaths.img5 || null,
            imgPaths.img6 || null,
            imgPaths.img7 || null,
            Type_ID
        ];

        console.log('queryParams:', queryParams);

        for (const key in imgPaths) {
            if (imgPaths[key]) {
                try {
                    const result = await cloudinary.uploader.upload(imgPaths[key]);
                    queryParams[7 + Object.keys(imgPaths).indexOf(key)] = result.secure_url;
                } catch (uploadError) {
                    connection.end();
                    return res.status(500).json({ status: "error", message: `An error occurred while uploading ${key}` });
                }
            }
        }

        connection.query(updateQuery, queryParams, (error, results) => {
            connection.end();
            if (error) {
                console.error('Error updating data in tb_type:', error);
                return res.status(500).json({ message: "An error occurred while updating data" });
            }

            if (results.affectedRows === 0) {
                return res.status(404).json({ message: "Type_ID not found" });
            }

            return res.json({
                status: "ok",
                message: "ອັບເດດສຳເລັດ",
            });
        });
    }



    static async getAll(req, res) {
        const connection = connectToMySQL();
        try {
            // const query = 'SELECT * FROM tb_type';
            const query = `
                SELECT 
                tt.*,
                COUNT(tr.Room_ID) AS NumberOfRooms
                FROM 
                tb_type tt
                LEFT JOIN 
                tb_rooms tr ON tt.Type_ID = tr.Type_ID AND tr.Status = 1
                GROUP BY 
                tt.Type_ID, tt.Type_name;
            `;

            connection.query(query, (error, results) => {
                connection.end();
                if (error) {
                    return res.json({ message: "An error occurred" });
                }
                return res.json({
                    status: "ok",
                    message: "Type fetched successfully",
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
            const { Type_ID } = req.params;
            if (!Type_ID) {
                return res.json({ message: "ກະລຸນາປ້ອນ ID !" });
            }
            const deleteUserQuery = 'DELETE FROM tb_type WHERE Type_ID = ?';
            connection.query(deleteUserQuery, [Type_ID], (error, results) => {
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

}

module.exports = TypeController;