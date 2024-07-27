import AdminMenu from "./homeAdmin";
import { useState, useEffect } from "react";
import ReloadButton from "../component/reload";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import CheckInNowDialog from "./manage/dialog/CheckInNowDialog";
import { useDispatch, useSelector } from "react-redux";
import { GetAllBookingWait } from "../../api/booking/bookingAction";

  const formatDate = (isoDateString) => {
    const date = new Date(isoDateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`; // Format as DD-MM-YYYY
  };


const CheckInNowAdmin = () => {
    const dispatch = useDispatch();
    const [bookingData, setBookingData] = useState([]);
    const { booking } = useSelector((state) => state.booking);

    useEffect(() => {
        dispatch(GetAllBookingWait());
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
            <p className="px-36 mt-10">ຄົ້ນຫາຂໍ້ມູນການຈອງ</p>
            <form className="w-full px-36 mt-5">
                <table className="w-full mt-10">
                    <thead>
                        <tr>
                            <th className="border border-btnn border-opacity-50 px-4 py-2 text-center font-semibold rounded-tl-lg">ລະຫັດການຈອງ</th>
                            <th className="border border-btnn border-opacity-50 px-4 py-2 text-center font-semibold">ປະເພດຫ້ອງ</th>
                            <th className="border border-btnn border-opacity-50 px-4 py-2 text-center font-semibold">ຊື່ແລະນາມສະກຸນ</th>
                            <th className="border border-btnn border-opacity-50 px-4 py-2 text-center font-semibold">ປະເພດການຈອງ</th>
                            <th className="border border-btnn border-opacity-50 px-4 py-2 text-center font-semibold">ມື້ເຂົ້າພັກ</th>
                            <th className="border border-btnn border-opacity-50 px-4 py-2 text-center font-semibold ">ວັນທີຈອງ</th>
                            <th className="border border-btnn border-opacity-50 px-4 py-2 text-center font-semibold ">ສະຖານະ</th>
                            <th className="border border-btnn border-opacity-50 px-4 py-2 text-center font-semibold rounded-tr-lg">Operation</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white">
                        {currentItems.map((item) => (
                            <tr key={item.id}>
                                <td className="border border-btnn border-opacity-50 px-4 py-2 text-center font-light">{item.Booking_ID}</td>
                                <td className="border border-btnn border-opacity-50 px-4 py-2 text-center font-light">{item.Type_name}</td>
                                <td className="border border-btnn border-opacity-50 px-4 py-2 text-center font-light">{item.First_name + item.First_name}</td>
                                <td className="border border-btnn border-opacity-50 px-4 py-2 text-center font-light">{item.Type_Booking === 1 ? "ເປັນມື້" : item.status === 2 ? "ເປັນເດືອນ" : "ເປັນປີ"}</td>
                                <td className="border border-btnn border-opacity-50 px-4 py-2 text-center font-light">{formatDate(item.Check_IN)}</td>
                                <td className="border border-btnn border-opacity-50 px-4 py-2 text-center font-light">{formatDate(item.Create_Date)}</td>
                                <td className="border border-btnn border-opacity-50 px-4 py-2 text-center font-black text-yellowBottle">
                                    ລໍຖ້າດຳເນີນການ
                                </td>
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
            <CheckInNowDialog visible={visible} hideDialog={hideDialog} data={selectedItem} />
        </>
    );
};

export default CheckInNowAdmin;