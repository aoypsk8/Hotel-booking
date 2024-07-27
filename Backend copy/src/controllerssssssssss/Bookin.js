const cloudinary = require('../utils/couldinary');
const connectToMySQL = require('../utils/db');
class BookingController {
    static async searchAvailableRooms(req, res) {
        const connection = connectToMySQL();
        const { fromDate, toDate, typeRoom_ID } = req.body;

        try {
            const query = `
                SELECT t.*,r.*
                FROM tb_type t
                JOIN tb_rooms r ON r.Type_ID = t.Type_ID
                LEFT JOIN tb_booking b ON r.Room_ID = b.Room_ID 
                AND (
                    (b.Check_IN BETWEEN ? AND ?) 
                    OR (b.Check_OUT BETWEEN ? AND ?) 
                    OR (b.Check_IN <= ? AND b.Check_OUT >= ?)
                )
                WHERE b.Room_ID IS NULL
                GROUP BY t.Type_ID, t.Type_name
                HAVING COUNT(r.Room_ID) > 0;

            `;
            connection.query(query, [typeRoom_ID, fromDate, toDate, fromDate, toDate, fromDate, toDate], (error, results) => {
                connection.end();
                if (error) {
                    return res.json({ message: "An error occurred", error });
                }
                return res.json({
                    status: "ok",
                    message: "Available rooms fetched successfully",
                    data: results,
                });
            });
        } catch (error) {
            connection.end();
            return res.json({ message: error.message });
        }
    }



    static async getAll(req, res) {
        const connection = connectToMySQL();
        try {
            const query = `
                SELECT 
                    b.*, 
                    c.First_name, 
                    c.Last_name, 
                    c.Phone_Number, 
                    t.Type_name
                FROM 
                    tb_booking b
                JOIN 
                    tb_customers c ON b.Cus_ID = c.Cus_ID
                JOIN 
                    tb_type t ON b.Type_ID = t.Type_ID
            `;
            connection.query(query, (error, results) => {
                connection.end();
                if (error) {
                    return res.json({ message: "An error occurred", error });
                }
                return res.json({
                    status: "ok",
                    message: "Booking fetched successfully",
                    data: results,
                });
            });
        } catch (error) {
            connection.end();
            return res.json({ message: error.message });
        }
    }

    static async getAllWait(req, res) {
        const connection = connectToMySQL();
        try {
            const query = `
                SELECT 
                    b.*, 
                    c.First_name, 
                    c.Last_name, 
                    c.Phone_Number, 
                    t.Type_name
                FROM 
                    tb_booking b
                JOIN 
                    tb_customers c ON b.Cus_ID = c.Cus_ID
                JOIN 
                    tb_type t ON b.Type_ID = t.Type_ID
                WHERE Status = 1 
            `;
            connection.query(query, (error, results) => {
                connection.end();
                if (error) {
                    return res.json({ message: "An error occurred", error });
                }
                return res.json({
                    status: "ok",
                    message: "Booking fetched successfully",
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
            const { Type_ID, Cus_ID, Type_Booking, Check_IN, Check_OUT, Status } = req.body;
            const query = `INSERT INTO tb_booking (Type_ID, Cus_ID, Type_Booking, Check_IN, Check_OUT, Status) VALUES (?, ?, ?, ?, ?, ?)`;
            connection.query(query, [Type_ID, Cus_ID, Type_Booking, Check_IN, Check_OUT, Status], (error, results) => {
                connection.end();
                if (error) {
                    return res.json({ message: "An error occurred", error });
                }
                return res.json({
                    status: "ok",
                    message: "Booking successfully",
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
        const { Booking_ID } = req.params;
        const { Room_ID, Status } = req.body;
        try {
            const query = `UPDATE tb_booking SET Room_ID = ?, Status = ? WHERE Booking_ID = ?`;
            connection.query(query, [Room_ID, Status, Booking_ID], (error, results) => {
                connection.end();
                if (error) {
                    return res.json({ message: "An error occurred", error });
                }
                return res.json({
                    status: "ok",
                    message: "Booking updated successfully",
                    data: results,
                });
            });
        } catch (error) {
            connection.end();
            return res.json({ message: error.message });
        }
    }
    static async updateStatus(req, res) {
        const connection = connectToMySQL();
        const { Booking_ID } = req.params;
        const { Status } = req.body;
        try {
            const query = `UPDATE tb_booking SET Status = ? WHERE Booking_ID = ?`;
            connection.query(query, [Status, Booking_ID], (error, results) => {
                connection.end();
                if (error) {
                    return res.json({ message: "An error occurred", error });
                }
                return res.json({
                    status: "ok",
                    message: "Booking updated successfully",
                    data: results,
                });
            });
        } catch (error) {
            connection.end();
            return res.json({ message: error.message });
        }
    }

    // static async delete(req, res) {
    //     try {
    //         const connection = connectToMySQL();
    //         const { EQ_ID } = req.params;

    //         const deleteUserQuery = 'DELETE FROM tb_equipment WHERE EquipmentID =  ?';
    //         connection.query(deleteUserQuery, [EQ_ID], (error, results) => {
    //             if (error) {
    //                 return res.json({ message: "ເກີດຂໍ້ຜິດພາດ" });
    //             }
    //             if (results.affectedRows === 0) {
    //                 return res.json({ message: "ບໍ່ພົບ ID !" });
    //             }
    //             connection.end();
    //             return res.json({
    //                 status: "ok",
    //                 message: "ລຶບສຳເລັດ",
    //             });
    //         });
    //     } catch (error) {
    //         return res.json({ message: error.message });
    //     }
    // }

    static async getAllWaitCheckIn(req, res) {
        const connection = connectToMySQL();
        try {
            const query = `
            SELECT DISTINCT
                b.Booking_ID, b.Type_ID, b.Cus_ID, b.Room_ID, b.Type_Booking, b.Check_IN, b.Check_OUT, b.Status,b.Create_Date,
                c.First_name, c.Last_name, c.Phone_Number,c.Email,
                t.Type_name,t.PriceDay,t.PriceMonth,t.PriceYear,
                r.Room_Number
            FROM 
                tb_booking b
            JOIN 
                tb_customers c ON b.Cus_ID = c.Cus_ID
            JOIN 
                tb_type t ON b.Type_ID = t.Type_ID
            LEFT JOIN 
                tb_rooms r ON b.Room_ID = r.Room_ID
            WHERE 
                b.Status = 2
        `;

            connection.query(query, (error, results) => {
                connection.end();
                if (error) {
                    return res.json({ message: "An error occurred", error });
                }

                // Calculate total for each booking
                const dataWithTotal = results.map(booking => {
                    let total = 0;
                    const checkInDate = new Date(booking.Check_IN);
                    const checkOutDate = new Date(booking.Check_OUT);
                    const daysBooked = Math.ceil((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24)); // Calculate the number of days booked

                    if (booking.Type_Booking === 1) {
                        total = booking.PriceDay * daysBooked;
                    } else if (booking.Type_Booking === 2) {
                        total = booking.PriceMonth;
                    } else if (booking.Type_Booking === 3) {
                        total = booking.PriceYear;
                    }
                    return { ...booking, total, daysBooked };
                });

                return res.json({
                    status: "ok",
                    message: "Booking fetched successfully",
                    data: dataWithTotal,
                });
            });
        } catch (error) {
            connection.end();
            return res.json({ message: error.message });
        }
    }



    static async getAllWaitCheckOut(req, res) {
        const connection = connectToMySQL();
        try {
            const query = `
            SELECT DISTINCT
                b.Booking_ID, b.Type_ID, b.Cus_ID, b.Room_ID, b.Type_Booking, b.Check_IN, b.Check_OUT, b.Status,b.Create_Date,
                c.First_name, c.Last_name, c.Phone_Number,c.Email,
                t.Type_name,t.PriceDay,t.PriceMonth,t.PriceYear,
                r.Room_Number
            FROM 
                tb_booking b
            JOIN 
                tb_customers c ON b.Cus_ID = c.Cus_ID
            JOIN 
                tb_type t ON b.Type_ID = t.Type_ID
            LEFT JOIN 
                tb_rooms r ON b.Room_ID = r.Room_ID
            WHERE 
                b.Status = 3
        `;

            connection.query(query, (error, results) => {
                connection.end();
                if (error) {
                    return res.json({ message: "An error occurred", error });
                }

                // Calculate total for each booking
                const dataWithTotal = results.map(booking => {
                    let total = 0;
                    const checkInDate = new Date(booking.Check_IN);
                    const checkOutDate = new Date(booking.Check_OUT);
                    const daysBooked = Math.ceil((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24)); // Calculate the number of days booked

                    if (booking.Type_Booking === 1) {
                        total = booking.PriceDay * daysBooked;
                    } else if (booking.Type_Booking === 2) {
                        total = booking.PriceMonth;
                    } else if (booking.Type_Booking === 3) {
                        total = booking.PriceYear;
                    }
                    return { ...booking, total, daysBooked };
                });

                return res.json({
                    status: "ok",
                    message: "Booking fetched successfully",
                    data: dataWithTotal,
                });
            });
        } catch (error) {
            connection.end();
            return res.json({ message: error.message });
        }
    }

    static async updateStatusCheckOut(req, res) {
        const connection = connectToMySQL();
        const { Booking_ID } = req.params;
        const { Status, equipmentIds = [] } = req.body; // Default to empty array if undefined
        console.log(Status);
        // Validate equipmentIds to ensure it's an array
        if (!Array.isArray(equipmentIds)) {
            connection.end();
            return res.status(400).json({ message: "Invalid equipment IDs" });
        }

        // Initialize equipment IDs array with default values
        const equipmentArray = [null, null, null, null, null];
        // Assign equipment IDs to the equipmentArray
        for (let i = 0; i < equipmentIds.length && i < 5; i++) {
            equipmentArray[i] = equipmentIds[i];
        }

        console.log(equipmentIds); // Debugging log

        try {
            const query = `
            UPDATE tb_booking 
            SET Status = ?, 
                EquipmentID1 = ?, 
                EquipmentID2 = ?, 
                EquipmentID3 = ?, 
                EquipmentID4 = ?, 
                EquipmentID5 = ? 
            WHERE Booking_ID = ?;
        `;
            connection.query(query, [Status, ...equipmentArray, Booking_ID], (error, results) => {
                connection.end();
                if (error) {
                    return res.status(500).json({ message: "An error occurred", error });
                }
                return res.json({
                    status: "ok",
                    message: "Check-OUT successfully",
                    data: results,
                });
            });
        } catch (error) {
            connection.end();
            return res.status(500).json({ message: error.message });
        }
    }

    static async getAllHistory(req, res) {
        const connection = connectToMySQL();
        const Cus_ID = req.params.Cus_ID; // Extract Cus_ID from route parameters
    
        try {
            // Base query with parameterized query placeholder
            const query = `
                SELECT 
                    b.*, 
                    c.*, 
                    t.*
                FROM tb_booking b
                JOIN tb_customers c ON b.Cus_ID = c.Cus_ID
                JOIN tb_type t ON b.Type_ID = t.Type_ID
                WHERE b.Cus_ID = ?
            `;
            
            connection.query(query, [Cus_ID], (error, results) => {
                connection.end();
                if (error) {
                    return res.json({ message: "An error occurred", error });
                }
                return res.json({
                    status: "ok",
                    message: "Booking fetched successfully",
                    data: results,
                });
            });
        } catch (error) {
            connection.end();
            return res.json({ message: error.message });
        }
    }
    


    static async getAllPayment(req, res) {
        const connection = connectToMySQL();
    
        try {
            // SQL query to select specific columns
            const query = `
                SELECT 
                    b.Booking_ID, 
                    b.Type_ID, 
                    b.Cus_ID, 
                    b.Room_ID, 
                    b.Type_Booking, 
                    b.Check_IN, 
                    b.Check_OUT, 
                    b.Status, 
                    b.Create_Date,
                    c.First_name AS name, 
                    c.Last_name AS surname, 
                    c.Phone_Number, 
                    c.Email,
                    t.Type_name, 
                    t.PriceDay, 
                    t.PriceMonth, 
                    t.PriceYear,
                    r.Room_Number
                FROM tb_booking b
                JOIN tb_customers c ON b.Cus_ID = c.Cus_ID
                JOIN tb_type t ON b.Type_ID = t.Type_ID
                LEFT JOIN tb_rooms r ON b.Room_ID = r.Room_ID
            `;
    
            connection.query(query, (error, results) => {
                connection.end();
                if (error) {
                    return res.json({ message: "An error occurred", error });
                }
    
                // Calculate total for each booking
                const dataWithTotal = results.map(booking => {
                    let total = 0;
                    const checkInDate = new Date(booking.Check_IN);
                    const checkOutDate = new Date(booking.Check_OUT);
                    const daysBooked = Math.ceil((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24)); // Calculate the number of days booked
    
                    if (booking.Type_Booking === 1) {
                        total = booking.PriceDay * daysBooked;
                    } else if (booking.Type_Booking === 2) {
                        total = booking.PriceMonth;
                    } else if (booking.Type_Booking === 3) {
                        total = booking.PriceYear;
                    }
                    return { ...booking, total, daysBooked };
                });
    
                return res.json({
                    status: "ok",
                    message: "Payment history fetched successfully",
                    data: dataWithTotal,
                });
            });
        } catch (error) {
            connection.end();
            return res.json({ message: error.message });
        }
    }
    
    
    
}

module.exports = BookingController;