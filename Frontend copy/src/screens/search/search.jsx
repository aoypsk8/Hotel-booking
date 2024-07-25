import React, { useState } from "react";
import Aside from "../component/aside";
import FooterSide from "../component/footer";
import DatePicker from "react-datepicker";
import { IoIosArrowDown } from "react-icons/io";
import Condo from "../../assets/condo/1.jpg";
import RoomCard from "../component/RoomCard";

function Search() {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const roomTypes = [
        {
            id: 1,
            image: Condo,
            title: "ຫ້ອງພັກແບບໃຫ່ຍ",
            description: "ຫ້ອງພັກແບບໃຫ່ຍຈະເປັນຫ້ອງພັກທີ່ກວ້າງຂວາງ ສາມາດພັກ ຫລື ອາໄສຢູ່ໄດ້ຫລາຍຄົນ ຫ້ອງນີ້ຈະປະກອບມີ: 2 ຫ້ອງນອນ, 2 ຫ້ອງນໍ້າ .....",
            available: 3
        },
        {
            id: 2,
            image: Condo,
            title: "ຫ້ອງພັກແບບໃຫ່ຍ",
            description: "ຫ້ອງພັກແບບໃຫ່ຍຈະເປັນຫ້ອງພັກທີ່ກວ້າງຂວາງ ສາມາດພັກ ຫລື ອາໄສຢູ່ໄດ້ຫລາຍຄົນ ຫ້ອງນີ້ຈະປະກອບມີ: 2 ຫ້ອງນອນ, 2 ຫ້ອງນໍ້າ .....",
            available: 3
        },
        {
            id: 3,
            image: Condo,
            title: "ຫ້ອງພັກແບບໃຫ່ຍ",
            description: "ຫ້ອງພັກແບບໃຫ່ຍຈະເປັນຫ້ອງພັກທີ່ກວ້າງຂວາງ ສາມາດພັກ ຫລື ອາໄສຢູ່ໄດ້ຫລາຍຄົນ ຫ້ອງນີ້ຈະປະກອບມີ: 2 ຫ້ອງນອນ, 2 ຫ້ອງນໍ້າ .....",
            available: 3
        },
        {
            id: 4,
            image: Condo,
            title: "ຫ້ອງພັກແບບໃຫ່ຍ",
            description: "ຫ້ອງພັກແບບໃຫ່ຍຈະເປັນຫ້ອງພັກທີ່ກວ້າງຂວາງ ສາມາດພັກ ຫລື ອາໄສຢູ່ໄດ້ຫລາຍຄົນ ຫ້ອງນີ້ຈະປະກອບມີ: 2 ຫ້ອງນອນ, 2 ຫ້ອງນໍ້າ .....",
            available: 3
        },
        // Add more room types here...
    ];

    return (
        <div className="h-full bg-primaryColor font-sans">
            <div className="" id="home">
                {/* Side */}
                <Aside />
                {/* search */}
                <div className="w-full h-64 bg-[#D9D9D9] relative flex  justify-center ">
                    <div className="bg-white flex justify-between items-center p-7 rounded-xl mt-20 absolute">
                        <div className="">
                            <div className="flex ">
                                <p className="text-black text-xl">ມື້ເຂົ້າພັກ</p>
                            </div>
                            <DatePicker
                                selected={startDate}
                                onChange={(date) => setStartDate(date)}
                                dateFormat="MMMM d, yyyy"
                                className="text-black text-2xl border-none outline-none"
                                minDate={new Date()} // Start from today
                                // Disable typing
                                onKeyDown={(e) => e.preventDefault()}
                                // Disable input focus
                                onFocus={(e) => e.target.blur()}
                            />
                        </div>
                        <div className="h-16 w-[0.5px] bg-unSelectText mx-5"></div>
                        <div className="">
                            <div className="flex ">
                                <p className="text-black text-xl">ມື້ອອກ</p>
                            </div>
                            <DatePicker
                                selected={endDate}
                                onChange={(date) => setEndDate(date)}
                                dateFormat="MMMM d, yyyy"
                                className="text-black text-2xl border-none outline-none"
                                // Disable typing
                                onKeyDown={(e) => e.preventDefault()}
                                // Disable input focus
                                onFocus={(e) => e.target.blur()}
                                minDate={new Date()}
                            />

                        </div>
                        <div className="h-16 w-[0.5px] bg-unSelectText mx-5"></div>
                        <div className="">
                            <div className="flex justify-center items-center" >
                                <p className="text-black text-xl">ປະເພດຫ້ອງ</p>
                                <IoIosArrowDown size={20} className={`transition-transform ${isDropdownOpen ? 'rotate-180' : 'rotate-0'}`} />
                            </div>
                            <p className="text-black text-2xl hover:cursor-pointer" onClick={toggleDropdown}>2 ຕຽງນອນ</p>
                            {isDropdownOpen && (
                                <div className="absolute bg-white shadow-lg border border-gray-200 mt-2 rounded-lg">
                                    <ul>
                                        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Option 1</li>
                                        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Option 2</li>
                                        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Option 3</li>
                                    </ul>
                                </div>
                            )}
                        </div>
                        <a href="#" className="text-white bg-[#303338] text-xl font-semibold mx-5  px-16 py-4 rounded-lg hover:cursor-pointer ">
                            ຄົ້ນຫາ
                        </a>
                    </div>
                    <div className="bg-primaryColor h-36 w-full"></div>
                </div>
                {/* Type Of Rooms */}
                <div className="bg-[#D9D9D9] px-32 pb-28 w-full" id="rooms">
                    <h1 className="text-black text-3xl font-semibold ">ຫ້ອງພັກປະເພດຕ່າງໆ</h1>
                    {/* Card list */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-10 mx-60">
                        {roomTypes.map((room) => (
                            <RoomCard key={room.id} room={room} />
                        ))}
                    </div>
                </div>
            </div>

            {/* footer */}
            <FooterSide />

        </div>
    );
}

export default Search;