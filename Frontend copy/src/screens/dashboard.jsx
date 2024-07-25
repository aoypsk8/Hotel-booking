// Home.js
import React, { useState } from "react";
import Aside from "./component/aside.jsx";
import bgCondo from "../assets/bgCon.png";
import Condo from "../assets/condo/1.jpg";
import CondoIc from "../assets/condo/condo.svg";
import myLogo from "../assets/logoM.png";


import ic_pool from "../assets/icons/pool.svg";
import ic_parking from "../assets/icons/parking.svg";
import ic_wifi from "../assets/icons/wifi.svg";
import ic_smoke from "../assets/icons/smoke.svg";
import ic_res from "../assets/icons/res.svg";
import ic_family from "../assets/icons/famaily.svg";
import ic_bar from "../assets/icons/bar.svg";
import ic_car from "../assets/icons/car.svg";

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { IoIosArrowDown } from 'react-icons/io';
import FooterSide from "./component/footer.jsx";
import { useNavigate } from "react-router-dom";
import RoomCard from "./component/RoomCard.jsx";
function Dashboard() {
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const icRecommend = [
    {
      id: 1,
      image: ic_pool,
      title: "ສະລອຍນ້ຳ",
    },
    {
      id: 2,
      image: ic_parking,
      title: "ຟຣີບ່ອນຈອດລົດ",
    },
    {
      id: 3,
      image: ic_wifi,
      title: "ຟຣີໄວຟາຍ"
    },
    {
      id: 4,
      image: ic_smoke,
      title: "ໂຮງແຮມປອດສູບຢາ",
    },
    {
      id: 5,
      image: ic_res,
      title: "ອາຫານເຊົ້າ",
    },
    {
      id: 6,
      image: ic_family,
      title: "ຫ້ອງສຳຫລັບຄອບຄົວ",
    },
    {
      id: 7,
      image: ic_res,
      title: "ຮ້ານອາຫານ",
    },
    {
      id: 8,
      image: ic_bar,
      title: "ບາ",
    }, {
      id: 9,
      image: ic_car,
      title: "ລົດຮັບສົ່ງຈາກສະຫນາມບິນ",
    },
    // Add more room types here...
  ];

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
      <div className=" bg-cover bg-no-repeat h-screen items-center flex flex-col " style={{ backgroundImage: `url(${bgCondo})` }} id="home">
        {/* Side */}
        <Aside homePage={true} />

        {/* content */}
        <h1 className="text-white text-7xl font-semibold mt-20">In A Great Hotel, You Don’t</h1>


        <h1 className="text-white text-7xl font-semibold mt-3">Just Stay, You Belong </h1>
        <h4 className="text-white text-2xl font-bold mt-7 ">ຕາມຫາປະສົບການທີ່ສົມບູນແບບໃນການພັກເຊົາ, ໂຮງແຮມທີ່ໃຫ່ຍ</h4>
        <h4 className="text-white text-2xl font-bold">ແລະ ສະອາດໃຫ້ຄິດຫາ ANYI ESTATE</h4>

        {/* search */}
        <div className="bg-white flex justify-between items-center p-7 rounded-xl mt-40">
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
          <div className="h-full w-[0.5px] bg-unSelectText mx-5"></div>
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
          <div className="h-full w-[0.5px] bg-unSelectText mx-5"></div>
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
          <div className="text-white bg-[#303338] text-xl font-semibold mx-5  px-16 py-4 rounded-lg hover:cursor-pointer " onClick={() => {
            navigate("/search");
          }}>
            ຄົ້ນຫາ
          </div>
        </div>

      </div>

      {/* Type Of Rooms */}
      <div className="bg-white pt-12 px-32 pb-28" id="rooms">
        <h1 className="text-black text-3xl font-semibold ">ຫ້ອງພັກປະເພດຕ່າງໆ</h1>
        {/* Card list */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-10 mx-60">
          {roomTypes.map((room) => (
            <RoomCard key={room.id} room={room} />
          ))}
        </div>
      </div>

      {/* a little bit detail of condo */}
      <div className="bg-primaryColor w-full flex flex-col items-center mt-20 pb-40" >
        <img src={CondoIc} alt="" className=" w-20 h-20" />
        <h4 className="text-white text-3xl font-medium mt-7">ພວກເຮົາເນັ້ນຄຸນນະພາບການບໍລິການ ແລະ ຄວາມສະອາດ</h4>
        <div className="flex justify-evenly w-full px-40 mt-28">
          <div className="flex flex-col justify-center items-center">
            <div className="flex ">
              <p className="text-white text-5xl">500,000 +</p>
            </div>
            <p className="text-white text-2xl mt-3">ລູກຄ້າ</p>
          </div>
          <div className="flex flex-col justify-center items-center">
            <div className="flex ">
              <p className="text-white text-5xl">98 % </p>
            </div>
            <p className="text-white text-2xl mt-3">ຄວາມພໍໃຈ</p>
          </div>
          <div className="flex flex-col justify-center items-center">
            <div className="flex ">
              <p className="text-white text-5xl">80 %</p>
            </div>
            <p className="text-white text-2xl mt-3">ກັບມາໃຊ້ຊ້ຳ</p>
          </div>
        </div>
      </div>


      {/* All of the image here  */}
      <div className="bg-white w-full p-20 ">
        <div className="w-full flex h-[1000px]">
          <div className="w-1/3 h-full flex flex-col">
            <div className="w-full h-1/2 p-2">
              <img className="rounded-lg h-full w-full object-cover" src={Condo} alt="" />
            </div>
            <div className="w-full h-1/2 p-2">
              <img className="rounded-lg h-full w-full object-cover" src={Condo} alt="" />
            </div>
          </div>
          <div className="w-2/3 h-full p-2">
            <img className="rounded-lg h-full w-full object-cover" src={Condo} alt="" />
          </div>
        </div>
        <div className="flex w-full h-96">
          <div className="w-1/4 h-full p-2">
            <img className="rounded-lg h-full w-full object-cover" src={Condo} alt="" />
          </div>
          <div className="w-1/4 h-full p-2">
            <img className="rounded-lg h-full w-full object-cover" src={Condo} alt="" />
          </div>
          <div className="w-1/4 h-full p-2">
            <img className="rounded-lg h-full w-full object-cover" src={Condo} alt="" />
          </div>
          <div className="w-1/4 h-full p-2 relative hover:cursor-pointer">
            <img className="rounded-lg h-full w-full object-cover" src={Condo} alt="" />
            <h1 className="absolute inset-0 flex items-center justify-center text-white text-2xl font-bold bg-black bg-opacity-40 rounded-lg m-2">
              + ຮູບພາບອື່ນໆ
            </h1>
          </div>
        </div>
      </div>


      {/* Advertiment */}
      <div className=" w-full  px-32 py-40 flex justify-around items-center">
        <div className="">
          <h1 className="text-white text-6xl font-semibold ">The best Apartment </h1>
          <h1 className="text-white text-6xl font-semibold mt-5 ">& Condo for rent. </h1>
        </div>
        <img className="rounded-lg  w-96 object-cover" src={myLogo} alt="" />
      </div>

      {/* About us  */}
      <div className="w-full bg-white pt-12 px-32 pb-28 " id="about">
        <h1 className="text-black text-3xl font-semibold ">ກ່ຽວກັບພວກເຮົາ</h1>
        <div className="flex px-28 py-12">
          <div className="">
            <div className="w-1/2 text-xl">
              ທີ່ໂຮງແຮມຂອງພວກເຮົາ,ພວກເຮົາພູມໃຈໃນການສະເຫນີການຜະສົມຜະສານ
              ຂອງຫລູຫລາ,ຄວາມສະດວກສະບາຍແລະການບໍລິການພິເສດທີ່ບໍ່ມີການປຽບ
              ທຽບ.ໂຮງແຮມຂອງພວກເຮົາຕັ້ງຢູ່ໃຈກາງເມືອງ,ໂຮງແຮມຂອງພວກເຮົາແມ່ນທາງເລືອກທີ່ສົມບູນແບບສໍາລັບນັກທຸລະກິດແລະນັກທ່ອງທ່ຽວ.
              ຕັ້ງຢູ່ບ້ານຈອມມະນີໃຕ້ ເມືອງໄຊທານີ ແຂວງນະຄອນຫລວງວຽງຈັນ</div>
            <div className="w-1/2 mt-5 text-xl">
              ທີ່ໂຮງແຮມຂອງພວກເຮົາ,ພວກເຮົາພູມໃຈໃນການສະເຫນີການຜະສົມຜະສານ
              ຂອງຫລູຫລາ,ຄວາມສະດວກສະບາຍແລະການບໍລິການພິເສດທີ່ບໍ່ມີການປຽບ
              ທຽບ.ໂຮງແຮມຂອງພວກເຮົາຕັ້ງຢູ່ໃຈກາງເມືອງ,ໂຮງແຮມຂອງພວກເຮົາແມ່ນທາງເລືອກທີ່ສົມບູນແບບສໍາລັບນັກທຸລະກິດແລະນັກທ່ອງທ່ຽວ.
              ຕັ້ງຢູ່ບ້ານຈອມມະນີໃຕ້ ເມືອງໄຊທານີ ແຂວງນະຄອນຫລວງວຽງຈັນ</div>
          </div>
          <div className="w-1/2 h-96 bg-primaryColor">map</div>
        </div>
        <h1 className="text-black text-3xl font-semibold ">ພວກເຮົາພູມໃຈສະເໜີ</h1>
        <div className="mt-10 grid grid-cols-5 gap-10 px-10">
          {icRecommend.map((ic, index) => (
            <div key={index} className="flex items-center px-2">
              <img className="rounded-lg h-5 w-5 mr-2" src={ic.image} alt="" />
              <p className="text-lg">{ic.title}</p>
            </div>
          ))}
        </div>
      </div>


      {/* footer */}
      <FooterSide />

    </div>
  );

}


export default Dashboard;
