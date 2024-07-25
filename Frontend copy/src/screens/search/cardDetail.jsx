import React, { useState } from "react";
import Aside from "../component/aside";
import FooterSide from "../component/footer";
import Condo from "../../assets/condo/1.jpg";
import BookingDialog from "../component/dialog";
function CardDetail() {
    const [visible, setVisible] = useState(false);

    const showDialog = () => {
        setVisible(true);
    };

    const hideDialog = () => {
        setVisible(false);
    };


    return (
        <div className="h-full bg-primaryColor font-sans">
            {/* Side */}
            <Aside />
            <div className="bg-[#D9D9D9]" id="home">

                {/* All of the image here  */}
                <div className=" w-full p-20 ">
                    <div className="w-full flex h-[750px]">
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
                    <div className="flex w-full h-80">
                        <div className="w-1/4 h-full p-2">
                            <img className="rounded-lg h-full w-full object-cover" src={Condo} alt="" />
                        </div>
                        <div className="w-1/4 h-full p-2">
                            <img className="rounded-lg h-full w-full object-cover" src={Condo} alt="" />
                        </div>
                        <div className="w-1/4 h-full p-2">
                            <img className="rounded-lg h-full w-full object-cover" src={Condo} alt="" />
                        </div>
                        <div className="w-1/4 h-full p-2  hover:cursor-pointer">
                            <img className="rounded-lg h-full w-full object-cover" src={Condo} alt="" />

                        </div>
                    </div>
                </div>

                {/* content detail */}
                <div className="w-full  px-20 pb-20">
                    <div className="w-full bg-white p-10 rounded-lg">
                        <div className="flex justify-between ">
                            <p className="text-black text-3xl ">ຫ້ອງພັກນ້ອຍ ປະເພດທີ່2</p>
                            <p className="text-black text-xl ">ວ່າງ ( 10 ) ຫ້ອງ</p>
                        </div>
                        <p className="text-black text-lg mt-5 ">ຂະໜາດ 8X9</p>
                        <p className="text-black text-lg mt-5 ">ຫ້ອງພັກແບບນ້ອຍຈະເປັນຫ້ອງພັກທີ່ໄວ້ອາໄສແບບຄົນມາທຳງານຫລືກັບແຟນເຖິງຈະຊື່ວ່າຫ້ອງນ້ອຍແຕ່ຫ້ອງນີ້ຈະມີດີໄຊແຕ່ລະຫ້ອງທີ່ແຕກຕ່າງກັນແລ້ວກໍ່ຍັງປະກອບໄປດ້ວຍ: 1 ຫ້ອງນອນ, 1 ຫ້ອງນໍ້າ, 1 ຫ້ອງຮັບແຂກ, 1 ຫ້ອງຄົວ. ອຸປະກອນເຟີນີ້ເຈີ້ຕ່າງໆຄົບ, ບໍ່ວ່າຈະເປັນຕູ້ເຢັນ,ຕູ້ຊັກຜ້າ,ທລທ,ໂຊຟາຕ່າງໆ❌ </p>
                        <p className="text-black text-xl font-black mt-5 ">ໝາຍເຫດ: </p>
                        <p className="text-black text-lg  mt-5 ">ຖ້າຜູ້ໃຊ້ທຳລາຍຫລືລັກເຄື່ອງອຸປະກອນເຄື່ອງໃຊ້,ເຟີນີ້ເຈີ້ແມ່ນທາງຄອນໂດເຮົາຈະປັບໃໝຕາມຂໍກຳນົດມູນລະຄ່າສິນຄ້າຫລືບາງກໍລະນີແມ່ນຈະໄດ້ດຳເນີນຄະດີຕາມກົດໝາຍທີ່ວາງອອກ.</p>
                        <div className="w-full h-[3px] bg-btnn mt-20 opacity-30"></div>

                        {/* price */}
                        <div className="flex justify-evenly mt-10">
                            <div className="flex flex-col items-center">
                                <p className="text-black text-xl ">ລາຄາ/ວັນ</p>
                                <p className="text-black text-3xl mt-3 ">LAK 850,000</p>
                            </div>
                            <div className="h-16 w-[0.5px] bg-unSelectText mx-5 opacity-30"></div>
                            <div className="flex flex-col items-center">
                                <p className="text-black text-xl ">ລາຄາ/ວັນ</p>
                                <p className="text-black text-3xl mt-3 ">LAK 850,000</p>
                            </div>
                            <div className="h-16 w-[0.5px] bg-unSelectText mx-5 opacity-30"></div>
                            <div className="flex flex-col items-center">
                                <p className="text-black text-xl ">ລາຄາ/ວັນ</p>
                                <p className="text-black text-3xl mt-3 ">LAK 850,000</p>
                            </div>
                        </div>


                        {/* Button */}
                        {/* Button */}
                        <div className="w-full flex justify-end mt-32 pb-5">
                            <div
                                className="text-white bg-primaryColor text-3xl font-semibold my-2 border px-4 py-2 rounded-lg hover:cursor-pointer w-3/12 flex justify-center items-center"
                                onClick={showDialog}
                            >
                                ຈອງເລີຍ
                            </div>
                        </div>
                        <BookingDialog visible={visible} hideDialog={hideDialog} />

                    </div>

                </div>

            </div>

            {/* footer */}
            <FooterSide />

        </div>
    );
}

export default CardDetail;