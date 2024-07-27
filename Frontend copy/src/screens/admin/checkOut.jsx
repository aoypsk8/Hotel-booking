import { useState, useEffect } from "react";
import ReloadButton from "../component/reload";
import AdminMenu from "./homeAdmin";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import CheckInDialog from "./manage/dialog/checkInDialog";
import { useDispatch, useSelector } from "react-redux";
import { GetAllBookingWaitCheckOut } from "../../api/booking/bookingAction";
import CheckOutDialog from "./manage/dialog/checkOutDialog";

const CheckOutAdmin = () => {
    const dispatch = useDispatch();
    const [bookingData, setBookingData] = useState([]);
    const { booking } = useSelector((state) => state.booking);

    useEffect(() => {
        dispatch(GetAllBookingWaitCheckOut());
        setBookingData(booking || []);
    }, [dispatch]);

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
    const supplierArray = booking || [];
    const totalPages = Math.ceil(supplierArray.length / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = supplierArray.slice(indexOfFirstItem, indexOfLastItem);


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
            <p className="px-36 mt-10">ຄົ້ນຫາຂໍ້ມູນ</p>
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
                        />
                    </div>
                </div>
                <table className="w-full mt-10">
                    <thead>
                        <tr>
                            <th className="border border-btnn border-opacity-50 px-4 py-2 text-center font-semibold rounded-tl-lg">ລະຫັດແຈ້ງເຂົ້າ</th>
                            <th className="border border-btnn border-opacity-50 px-4 py-2 text-center font-semibold">ເບີຫ້ອງ</th>
                            <th className="border border-btnn border-opacity-50 px-4 py-2 text-center font-semibold">ຊື່ແລະນາມສະກຸນ</th>
                            <th className="border border-btnn border-opacity-50 px-4 py-2 text-center font-semibold">ເບີໂທລູກຄ້າ</th>
                            <th className="border border-btnn border-opacity-50 px-4 py-2 text-center font-semibold rounded-tr-lg">Operation</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white">
                        {currentItems.map((item) => (
                            <tr key={item.id}>
                                <td className="border border-btnn border-opacity-50 px-4 py-2 text-center font-light">{item.Booking_ID}</td>
                                <td className="border border-btnn border-opacity-50 px-4 py-2 text-center font-light">{item.Room_Number}</td>
                                <td className="border border-btnn border-opacity-50 px-4 py-2 text-center font-light">{item.First_name + item.First_name}</td>
                                <td className="border border-btnn border-opacity-50 px-4 py-2 text-center font-light">{item.Phone_Number}</td>
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
                    {indexOfFirstItem + 1} -{" "}
                    {Math.min(indexOfLastItem, supplierArray.length)} of{" "}
                    {supplierArray.length}
                </div>
                <div
                    className="items-center justify-center flex cursor-pointer"
                    onClick={nextPage}
                >
                    <IoIosArrowForward />
                </div>
            </div>
            <CheckOutDialog visible={visible} hideDialog={hideDialog} data={selectedItem} />
        </>
    );
}

export default CheckOutAdmin;


