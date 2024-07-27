import React, { useEffect, useState } from "react";
import Aside from "../component/aside";
import FooterSide from "../component/footer";
import BookingDialog from "../component/dialog";
import { useSelector } from "react-redux";
import { getUserData } from "../../api/authAction";


function formatNumber(number) {
    return new Intl.NumberFormat("en-US").format(number);
  }
function CardDetail() {
    const [userData, setUserData] = useState(null);
    const [typeDetailData, setTypeDetailData] = useState([]);
    const { typeDetail } = useSelector((state) => state.typedetail);

    useEffect(() => {
        const user = getUserData();
        setTypeDetailData(typeDetail || []);
        if (user) {
            setUserData(user);
            console.log(user.details.Cus_ID);
        } else {
            setUserData({ details: null });
            console.log('User data is not available.');
        }
    }, [typeDetail]);

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
                {/* All of the image here */}
                <div className=" w-full p-20 ">
                    <div className="w-full flex h-[750px]">
                        <div className="w-1/3 h-full flex flex-col">
                            <div className="w-full h-1/2 p-2">
                                <img className="rounded-lg h-full w-full object-cover" src={typeDetail.img1} alt="" />
                            </div>
                            <div className="w-full h-1/2 p-2">
                                <img className="rounded-lg h-full w-full object-cover" src={typeDetail.img2} alt="" />
                            </div>
                        </div>
                        <div className="w-2/3 h-full p-2">
                            <img className="rounded-lg h-full w-full object-cover" src={typeDetail.img3} alt="" />
                        </div>
                    </div>
                    <div className="flex w-full h-80">
                        <div className="w-1/4 h-full p-2">
                            <img className="rounded-lg h-full w-full object-cover" src={typeDetail.img4} alt="" />
                        </div>
                        <div className="w-1/4 h-full p-2">
                            <img className="rounded-lg h-full w-full object-cover" src={typeDetail.img5} alt="" />
                        </div>
                        <div className="w-1/4 h-full p-2">
                            <img className="rounded-lg h-full w-full object-cover" src={typeDetail.img6} alt="" />
                        </div>
                        <div className="w-1/4 h-full p-2 hover:cursor-pointer">
                            <img className="rounded-lg h-full w-full object-cover" src={typeDetail.img7} alt="" />
                        </div>
                    </div>
                </div>

                {/* content detail */}
                <div className="w-full px-20 pb-20">
                    <div className="w-full bg-white p-10 rounded-lg">
                        <div className="flex justify-between">
                            <p className="text-black text-3xl">{typeDetail.Type_name}</p>
                            {typeDetail.NumberOfRooms != null ? <p className="text-black text-xl">ວ່າງ ({typeDetail.NumberOfRooms}) ຫ້ອງ</p> : ""}
                        </div>
                        <p className="text-black text-lg mt-5">ຂະໜາດ {typeDetail.Area}</p>
                        <p className="text-black text-lg mt-5">{typeDetail.detail}</p>
                        <p className="text-black text-xl font-black mt-5">ໝາຍເຫດ:</p>
                        <p className="text-black text-lg mt-5">{typeDetail.remark}</p>
                        <div className="w-full h-[3px] bg-btnn mt-20 opacity-30"></div>

                        {/* price */}
                        <div className="flex justify-evenly mt-10">
                            <div className="flex flex-col items-center">
                                <p className="text-black text-xl">ລາຄາ/ວັນ</p>
                                <p className="text-black text-3xl mt-3">{formatNumber(typeDetail.PriceDay)}</p>
                            </div>
                            <div className="h-16 w-[0.5px] bg-unSelectText mx-5 opacity-30"></div>
                            <div className="flex flex-col items-center">
                                <p className="text-black text-xl">ລາຄາ/ເດືອນ</p>
                                <p className="text-black text-3xl mt-3">{formatNumber(typeDetail.PriceMonth)}</p>
                            </div>
                            <div className="h-16 w-[0.5px] bg-unSelectText mx-5 opacity-30"></div>
                            <div className="flex flex-col items-center">
                                <p className="text-black text-xl">ລາຄາ/ປີ</p>
                                <p className="text-black text-3xl mt-3">{formatNumber(typeDetail.PriceYear)}</p>
                            </div>
                        </div>

                        {/* Button */}
                        <div className="w-full flex justify-end mt-32 pb-5">
                            <div
                                className="text-white bg-primaryColor text-3xl font-semibold my-2 border px-4 py-2 rounded-lg hover:cursor-pointer w-3/12 flex justify-center items-center"
                                onClick={showDialog}
                            >
                                ຈອງເລີຍ
                            </div>
                        </div>
                        {userData && userData.details && (
                            <BookingDialog
                                visible={visible}
                                hideDialog={hideDialog}
                                data={typeDetail}
                                Cus_ID={userData.details.Cus_ID}
                            />
                        )}
                    </div>
                </div>
            </div>
            {/* footer */}
            <FooterSide />
        </div>
    );
}

export default CardDetail;
