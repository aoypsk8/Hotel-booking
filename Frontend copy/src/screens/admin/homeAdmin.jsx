import React, { useEffect, useState } from 'react';
import { Menubar } from 'primereact/menubar'; // Import Menubar from PrimeReact
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { getUserData, logoutUser } from '../../api/authAction';
import { useDispatch } from 'react-redux';
import log from "../../assets/icons/logout.svg";

const AdminMenu = () => {
    const [userData, setUserData] = useState({});
    const dispatch = useDispatch();
    const navigate = useNavigate(); // Initialize useNavigate
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [imagePreview, setImagePreview] = useState('');

    // Fetch user data on component mount
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const user = await getUserData();
                console.log("Fetched user data:", user);
                setUserData(user || {});

                if (user && user.details && user.details.Emp_Profile) {
                    setImagePreview(user.details.Emp_Profile);
                }
            } catch (error) {
                console.error("Failed to fetch user data", error);
            }
        };

        fetchUserData();
    }, []);

    const items = [
        {
            label: "ໜ້າຫຼັກ",
            icon: "pi pi-home",
            to: "/admin",
        },
        {
            label: "ແຈ້ງເຂົ້າ",
            icon: "pi pi-arrow-up-left",
            to: "/admin/checkIN",
        },
        {
            label: "ແຈ້ງອອກ",
            icon: "pi pi-arrow-down-right",
            to: "/admin/return",
        },
        {
            label: "ຈັດການຂໍ້ມູນ",
            icon: "pi pi-cog",
            items: [
                { label: "ຂໍ້ມູນຫ້ອງ", to: "/admin/manage/rooms" },
                { label: "ປະເພດຫ້ອງ", to: "/admin/manage/type" },
                { label: "ຂໍ້ມູນລູກຄ້າ", to: "/admin/manage/customer" },
                { label: "ຂໍ້ມູນພະນັກງານ", to: "/admin/manage/employee" },
                { label: "ຂໍ້ມູນອຸປະກອນ", to: "/admin/manage/equipment" },
            ],
        },
        {
            label: "ກວດສອບການຈອງ",
            icon: "pi pi-check-square",
            to: "/admin/CheckCus",
        },
        {
            label: "ລາຍງານ",
            icon: "pi pi-chart-pie",
            items: [
                { label: "ລາຍງານຂໍໍໍໍມູນລູກຄ້າ", to: "/admin/report/customer" },
                { label: "ລາຍງານຂໍໍໍໍມູນພະນັກງານ", to: "/admin/report/employee" },
                { label: "ລາຍງານການຈອງ", to: "/admin/report/checkInNow" },
                { label: "ລາຍງານການແຈ້ງເຂົ້າ", to: "/admin/report/return" },
                { label: "ລາຍງານການແຈ້ງອອກ", to: "/admin/report/out" },
                { label: "ລາຍງານການຊຳລະເງີນ", to: "/admin/report/pay" },
                { label: "ລາຍງານອຸປະກອນ", to: "/admin/report/equipment" },
            ],
        },
    ];

    const handleCommand = (item, mainIndex, subIndex) => {
        console.log(`Clicked item: Main index: ${mainIndex}, Sub index: ${subIndex}`);
        console.log(item);
        if (item.to) {
            console.log(`Navigating to: ${item.to}`);
            navigate(item.to); // Navigate to the route
        } else if (item.items) {
            console.log(`Submenu items:`, item.items);
        }
    };

    // Map over items to set command with indices
    const mappedItems = items.map((item, mainIndex) => ({
        ...item,
        command: () => handleCommand(item, mainIndex, -1), // Handle top-level items
        items: item.items
            ? item.items.map((subItem, subIndex) => ({
                ...subItem,
                command: () => handleCommand(subItem, mainIndex, subIndex), // Handle submenu items
            }))
            : undefined,
    }));

    return (
        <div className="admin-menu border border-b-1 border-bgHead">
            <Menubar
                model={mappedItems}
                end={
                    <div className="flex items-center hover:cursor-pointer" onClick={() => setDropdownOpen(!dropdownOpen)}>
                        <div className="w-8 h-8 bg-bgbg rounded-full">
                            {imagePreview && <img src={imagePreview} alt="Profile" />}
                        </div>
                        {/* <p className="text-black text-xl font-semibold">{userData.details?.Emp_Firstname || 'User'}</p>
                        <p className="text-black text-sm">{userData.type || 'Type'}</p> */}
                        <div className="ml-3">
                            <p className="text-black text-xl font-semibold">{userData.details?.Emp_FirstName}</p>
                            <p className="text-black text-sm">{userData.type}</p>
                        </div>
                        {dropdownOpen && (
                            <div className="absolute right-0  w-48 bg-white shadow-lg rounded-lg mt-32">
                                <a
                                    href="#"
                                    className="block px-4 py-2 text-black hover:bg-btnn opacity-50 flex items-center"
                                    onClick={() => {
                                        dispatch(logoutUser());
                                        navigate("/");
                                    }}
                                >
                                    <img src={log} alt="Logout" />
                                    <p>Logout</p>
                                </a>
                            </div>
                        )}
                    </div>}
            />
        </div>
    );
};

export default AdminMenu;
