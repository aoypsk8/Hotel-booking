import { useState, useEffect } from "react";
import ReloadButton from "../component/reload";
import AdminMenu from "./homeAdmin";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import CheckInDialog from "./manage/dialog/checkInDialog";

// Example data (replace this with your actual data source)
const initialData = [
    { id: "1", roomType: "A",roomNumber: "123A", name: "John Doe", roomBooking: "Month", amount: 1, bookingType: "Type1", checkInDate: "01/01/2024", checkOutDate: "02/01/2024",dataBooking:"03/01/2024", bookingDate: "25/12/2023", phoneNumer: "2052768831", email: "a@gmai.com", total: 1000000 },
    { id: "2", roomType: "A",roomNumber: "123A", name: "John Doe", roomBooking: "Month", amount: 1, bookingType: "Type1", checkInDate: "01/01/2024", checkOutDate: "02/01/2024",dataBooking:"03/01/2024", bookingDate: "25/12/2023", phoneNumer: "2052768831", email: "a@gmai.com", total: 1000000 },
    { id: "3", roomType: "A",roomNumber: "123A", name: "John Doe", roomBooking: "Month", amount: 1, bookingType: "Type1", checkInDate: "01/01/2024", checkOutDate: "02/01/2024",dataBooking:"03/01/2024", bookingDate: "25/12/2023", phoneNumer: "2052768831", email: "a@gmai.com", total: 1000000 },
    { id: "4", roomType: "A",roomNumber: "123A", name: "John Doe", roomBooking: "Month", amount: 1, bookingType: "Type1", checkInDate: "01/01/2024", checkOutDate: "02/01/2024",dataBooking:"03/01/2024", bookingDate: "25/12/2023", phoneNumer: "2052768831", email: "a@gmai.com", total: 1000000 },
    { id: "5", roomType: "A",roomNumber: "123A", name: "John Doe", roomBooking: "Month", amount: 1, bookingType: "Type1", checkInDate: "01/01/2024", checkOutDate: "02/01/2024",dataBooking:"03/01/2024", bookingDate: "25/12/2023", phoneNumer: "2052768831", email: "a@gmai.com", total: 1000000 },
    { id: "6", roomType: "A",roomNumber: "123A", name: "John Doe", roomBooking: "Month", amount: 1, bookingType: "Type1", checkInDate: "01/01/2024", checkOutDate: "02/01/2024",dataBooking:"03/01/2024", bookingDate: "25/12/2023", phoneNumer: "2052768831", email: "a@gmai.com", total: 1000000 },
    { id: "7", roomType: "A",roomNumber: "123A", name: "John Doe", roomBooking: "Month", amount: 1, bookingType: "Type1", checkInDate: "01/01/2024", checkOutDate: "02/01/2024",dataBooking:"03/01/2024", bookingDate: "25/12/2023", phoneNumer: "2052768831", email: "a@gmai.com", total: 1000000 },
    { id: "8", roomType: "A",roomNumber: "123A", name: "John Doe", roomBooking: "Month", amount: 1, bookingType: "Type1", checkInDate: "01/01/2024", checkOutDate: "02/01/2024",dataBooking:"03/01/2024", bookingDate: "25/12/2023", phoneNumer: "2052768831", email: "a@gmai.com", total: 1000000 },
    { id: "9", roomType: "A",roomNumber: "123A", name: "John Doe", roomBooking: "Month", amount: 1, bookingType: "Type1", checkInDate: "01/01/2024", checkOutDate: "02/01/2024",dataBooking:"03/01/2024", bookingDate: "25/12/2023", phoneNumer: "2052768831", email: "a@gmai.com", total: 1000000 },
    { id: "10", roomType: "A",roomNumber: "123A", name: "John Doe", roomBooking: "Month", amount: 1, bookingType: "Type1", checkInDate: "01/01/2024", checkOutDate: "02/01/2024",dataBooking:"03/01/2024", bookingDate: "25/12/2023", phoneNumer: "2052768831", email: "a@gmai.com", total: 1000000 },
    { id: "11", roomType: "A",roomNumber: "123A", name: "John Doe", roomBooking: "Month", amount: 1, bookingType: "Type1", checkInDate: "01/01/2024", checkOutDate: "02/01/2024",dataBooking:"03/01/2024", bookingDate: "25/12/2023", phoneNumer: "2052768831", email: "a@gmai.com", total: 1000000 },
    { id: "12", roomType: "A",roomNumber: "123A", name: "John Doe", roomBooking: "Month", amount: 1, bookingType: "Type1", checkInDate: "01/01/2024", checkOutDate: "02/01/2024",dataBooking:"03/01/2024", bookingDate: "25/12/2023", phoneNumer: "2052768831", email: "a@gmai.com", total: 1000000 },
    { id: "13", roomType: "A",roomNumber: "123A", name: "John Doe", roomBooking: "Month", amount: 1, bookingType: "Type1", checkInDate: "01/01/2024", checkOutDate: "02/01/2024",dataBooking:"03/01/2024", bookingDate: "25/12/2023", phoneNumer: "2052768831", email: "a@gmai.com", total: 1000000 },
    { id: "14", roomType: "A",roomNumber: "123A", name: "John Doe", roomBooking: "Month", amount: 1, bookingType: "Type1", checkInDate: "01/01/2024", checkOutDate: "02/01/2024",dataBooking:"03/01/2024", bookingDate: "25/12/2023", phoneNumer: "2052768831", email: "a@gmai.com", total: 1000000 },
    { id: "15", roomType: "A",roomNumber: "123A", name: "John Doe", roomBooking: "Month", amount: 1, bookingType: "Type1", checkInDate: "01/01/2024", checkOutDate: "02/01/2024",dataBooking:"03/01/2024", bookingDate: "25/12/2023", phoneNumer: "2052768831", email: "a@gmai.com", total: 1000000 },
];

const CheckInAdmin = () => {
    const [loading, setLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredSaleData, setFilteredSaleData] = useState(initialData);

    useEffect(() => {
        // Simulate fetching data
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 1000); // Simulate a 2-second fetch time
    }, []);

    useEffect(() => {
        const results = initialData.filter(item =>
            item.id.includes(searchQuery) ||
            item.roomType.includes(searchQuery) ||
            item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.bookingType.includes(searchQuery) ||
            item.checkInDate.includes(searchQuery) ||
            item.bookingDate.includes(searchQuery)
        );
        setFilteredSaleData(results);
    }, [searchQuery]);

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);

    const totalPages = Math.ceil(filteredSaleData.length / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredSaleData.slice(indexOfFirstItem, indexOfLastItem);

    // Handle next and previous page
    const nextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    // Dialog state and data
    const [visible, setVisible] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    const showDialog = (item) => {
        setSelectedItem(item);
        setVisible(true);
    };

    const hideDialog = () => {
        setVisible(false);
        setSelectedItem(null);
    };

    return (
        <>
            <AdminMenu />
            <p className="px-36 mt-10">ຄົ້ນຫາຂໍ້ມູນການຈອງ</p>
            <form className="w-full px-36 mt-5">
                <div className="flex justify-between">
                    <div className="relative">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                            <svg className="w-4 h-4 text-bgHead dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                            </svg>
                        </div>
                        <input
                            type="search"
                            className="block w-full p-4 ps-10 text-sm text-black border border-bgHead rounded-lg bg-bgColor focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="ຄົ້ນຫາ"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <ReloadButton onClick={() => setLoading(true)} loading={loading} />
                </div>
                <table className="w-full mt-10">
                    <thead>
                        <tr>
                            <th className="border border-btnn border-opacity-50 px-4 py-2 text-center font-semibold rounded-tl-lg">ລະຫັດການຈອງ</th>
                            <th className="border border-btnn border-opacity-50 px-4 py-2 text-center font-semibold">ເບີຫ້ອງ</th>
                            <th className="border border-btnn border-opacity-50 px-4 py-2 text-center font-semibold">ປະເພດຫ້ອງ</th>
                            <th className="border border-btnn border-opacity-50 px-4 py-2 text-center font-semibold">ຊື່ແລະນາມສະກຸນ</th>
                            <th className="border border-btnn border-opacity-50 px-4 py-2 text-center font-semibold">ປະເພດການຈອງ</th>
                            <th className="border border-btnn border-opacity-50 px-4 py-2 text-center font-semibold">ມື້ເຂົ້າພັກ</th>
                            <th className="border border-btnn border-opacity-50 px-4 py-2 text-center font-semibold ">ວັນທີຈອງ</th>
                            <th className="border border-btnn border-opacity-50 px-4 py-2 text-center font-semibold rounded-tr-lg">Operation</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white">
                        {currentItems.map((item) => (
                            <tr key={item.id}>
                                <td className="border border-btnn border-opacity-50 px-4 py-2 text-center font-light">{item.id}</td>
                                <td className="border border-btnn border-opacity-50 px-4 py-2 text-center font-light">{item.roomNumber}</td>
                                <td className="border border-btnn border-opacity-50 px-4 py-2 text-center font-light">{item.roomType}</td>
                                <td className="border border-btnn border-opacity-50 px-4 py-2 text-center font-light">{item.name}</td>
                                <td className="border border-btnn border-opacity-50 px-4 py-2 text-center font-light">{item.bookingType}</td>
                                <td className="border border-btnn border-opacity-50 px-4 py-2 text-center font-light">{item.checkInDate}</td>
                                <td className="border border-btnn border-opacity-50 px-4 py-2 text-center font-light">{item.bookingDate}</td>
                                <td className="border border-btnn border-opacity-50 px-4 py-2 text-center font-light hover:cursor-pointer" onClick={() => showDialog(item)}>
                                    <div className="w-full ">
                                        <div className=" flex justify-center items-center border rounded-xl border-primaryColor">
                                            <div className=" inset-y-0 start-0 flex items-center ps-3 pointer-events-none ">
                                                <svg className="w-6 h-6 text-primaryColor dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                                </svg>
                                            </div>
                                            <button
                                                type="button"
                                                className="flex items-center justify-center py-2  bg-opacity-25 rounded-lg text-primaryColor font-semibold"
                                            >
                                                <span>ກວດສອບ</span>
                                            </button>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </form>
            <div className="w-full flex justify-center px-5 mt-5">
                <div
                    className="items-center justify-center flex cursor-pointer"
                    onClick={prevPage}
                >
                    <IoIosArrowBack />
                </div>
                <div className="text-base font-light mx-5">
                    {indexOfFirstItem + 1} - {Math.min(indexOfLastItem, filteredSaleData.length)} of {filteredSaleData.length}
                </div>
                <div
                    className="items-center justify-center flex cursor-pointer"
                    onClick={nextPage}
                >
                    <IoIosArrowForward />
                </div>
            </div>
            <CheckInDialog visible={visible} hideDialog={hideDialog} data={selectedItem} />
        </>
    );
}

export default CheckInAdmin;