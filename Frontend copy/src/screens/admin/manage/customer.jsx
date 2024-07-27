import AdminMenu from "../homeAdmin";
import { useState, useEffect } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { TiPlus } from "react-icons/ti";
import ReloadButton from "../../component/reload";
import ic_edit from "../../../assets/icons/editI.svg";
import ic_delete from "../../../assets/icons/deleteI.svg";
import EditTCustomerDialog from "./dialogManage/customer/editCustomer";
import AddCustomerDialog from "./dialogManage/customer/addCustomer";
import { useDispatch, useSelector } from "react-redux";
import { DeleteCustomerA, GetAllCustomerA } from "../../../api/Customer/customerAAction";
import Swal from "sweetalert2";


const ManageCustomersAdmin = () => {
    const dispatch = useDispatch();
    const [customerData, setCustomerData] = useState([]);
    const { customer } = useSelector((state) => state.customer);

    useEffect(() => {
        dispatch(GetAllCustomerA());
        setCustomerData(customer || []);
    }, [dispatch]);

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 2000);
    }, []);

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
    const supplierArray = customer || [];
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

    //add
    const [visible, setVisible] = useState(false);
    const showDialog = () => {
        setVisible(true);
    };
    const hideDialog = () => {
        setVisible(false);
    };

    //edit
    const [selectedItem, setSelectedItem] = useState(null);
    const [visibleEdit, setVisibleEdit] = useState(false);
    const showDialogEdit = (item) => {
        setSelectedItem(item);
        setVisibleEdit(true);
    };
    const hideDialogEdit = () => {
        setVisibleEdit(false);
        setSelectedItem(null);
    };

    return (
        <>
            <AdminMenu />
            <p className="px-36 mt-10">ຂໍ້ມູນລູກຄ້າ</p>
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
                    <div className="flex">
                        <ReloadButton onClick={() => setLoading(true)} loading={loading} />
                        <button
                            type="button"
                            className="flex items-center justify-center w-32 h-12 bg-green rounded-lg text-white font-semibold ml-3"
                            onClick={showDialog}
                        >
                            <TiPlus className="text-xl mr-2" />
                            <span>New</span>
                        </button>
                    </div>
                </div>
                <table className="w-full mt-10">
                    <thead>
                        <tr>
                            <th className="border border-btnn border-opacity-50 px-4 py-2 text-center font-semibold rounded-tl-lg">ລະຫັດ</th>
                            <th className="border border-btnn border-opacity-50 px-4 py-2 text-center font-semibold">ຊື່</th>
                            <th className="border border-btnn border-opacity-50 px-4 py-2 text-center font-semibold">ນາມສະກຸນ</th>
                            <th className="border border-btnn border-opacity-50 px-4 py-2 text-center font-semibold">ເບີໂທ</th>
                            <th className="border border-btnn border-opacity-50 px-4 py-2 text-center font-semibold">Email</th>
                            <th className="border border-btnn border-opacity-50 px-4 py-2 text-center font-semibold">ເລກບັດປະຈຳໂຕ/Passport</th>
                            <th className="border border-btnn border-opacity-50 px-4 py-2 text-center font-semibold">Operation</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white">
                        {currentItems.map((item) => (
                            <tr key={item.id}>
                                <td className="border border-btnn border-opacity-50 px-4 py-2 text-center font-light">{item.Cus_ID}</td>
                                <td className="border border-btnn border-opacity-50 px-4 py-2 text-center font-light">{item.First_name}</td>
                                <td className="border border-btnn border-opacity-50 px-4 py-2 text-center font-light">{item.Last_name}</td>
                                <td className="border border-btnn border-opacity-50 px-4 py-2 text-center font-light">{item.Phone_Number}</td>
                                <td className="border border-btnn border-opacity-50 px-4 py-2 text-center font-light">{item.Email}</td>
                                <td className="border border-btnn border-opacity-50 px-4 py-2 text-center font-light">{item.Passport}</td>
                                <td className="border border-btnn border-opacity-50 py-2 text-center font-light flex justify-center">
                                    <div
                                        className="flex items-center justify-center w-16 h-7 bg-white rounded-lg text-primaryColor text-sm ml-3 border border-opacity-20 hover:cursor-pointer"
                                        onClick={() => showDialogEdit(item)}
                                    >
                                        <img src={ic_edit} alt="" className="w-5 h-5" />
                                        ແກ້ໄຂ
                                    </div>
                                    <button
                                        type="button"
                                        className="flex items-center justify-center w-16 h-7 bg-white rounded-lg text-redBottle text-sm ml-3 border border-opacity-20"
                                        onClick={() => {
                                            Swal.fire({
                                                title: "ທ່ານຕ້ອງການລົບ?",
                                                text: "ທ່ານຕ້ອງການລົບບໍ່!",
                                                icon: "warning",
                                                showCancelButton: true,
                                                confirmButtonColor: "#3085d6",
                                                cancelButtonColor: "#d33",
                                                confirmButtonText: "ລົບ  ! ",
                                                cancelButtonText: "ຍົກເລີກ",
                                            }).then(async (result) => {
                                                if (result.isConfirmed) {
                                                    dispatch(DeleteCustomerA(item.Cus_ID));
                                                }
                                            });
                                        }}
                                    >
                                        <img src={ic_delete} alt="" className="w-5 h-5" />
                                        ລົບ
                                    </button>
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
            <AddCustomerDialog visible={visible} hideDialog={hideDialog} />
            <EditTCustomerDialog visible={visibleEdit} hideDialog={hideDialogEdit} data={selectedItem} />
        </>
    );
};

export default ManageCustomersAdmin;