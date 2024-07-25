import React, { useEffect, useState } from "react";
import Aside from "../component/aside";
import FooterSide from "../component/footer";
import Condo from "../../assets/condo/1.jpg";
import { useNavigate } from "react-router-dom";
import { getUserData } from "../../api/authAction";
import { useDispatch } from "react-redux";
import { UpdateCustomer } from "../../api/newwwwwwwwwwwwwww/customer/CustomerAction";

function Profile() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState("");

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const user = await getUserData();
                console.log("Fetched user data:", user);
                setUserData(user);
    
                if (user && user.details && user.details.Cus_Profile) {
                    setImagePreview(user.details.Cus_Profile);
                }
            } catch (error) {
                console.error("Failed to fetch user data", error);
            }
        };
    
        fetchUserData();
    }, []); // Empty dependency array ensures it runs once when component mounts
    
    useEffect(() => {
        if (imageFile) {
            setImagePreview(URL.createObjectURL(imageFile));
        }
    }, [imageFile]);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

  

        try {
            const success = await dispatch(UpdateCustomer( e.target.firstName.value,e.target.lastName.value,  e.target.phoneNumber.value, e.target.passport.value, e.target.email.value, e.target.password.value, imageFile,userData.details.Cus_ID));
            if (success) {
                navigate("/");
            }
        } catch (error) {
            console.error("Failed to update customer", error);
        }
    };

    if (!userData) {
        return <div>Loading...</div>; // Or any other loading indicator
    }

    const { details } = userData;

    return (
        <div className="h-full bg-primaryColor font-sans">
            <Aside />
            <div className="bg-[#D9D9D9]" id="home">
                <div className="w-full px-[600px] py-20">
                    <div className="w-full bg-white p-10 rounded-3xl ">
                        <div className="w-full flex justify-center">
                            <p className="text-xl">ຂໍ້ມູນໂປຣໄຟຣ໌</p>
                        </div>
                        <div className="w-full flex justify-center mt-2">
                            <div className="w-32 h-32 rounded-full bg-unSelectText ">
                                <img src={imagePreview || Condo} className="w-full h-full bg-cover" alt="Profile" />
                            </div>
                        </div>
                        <form className="mx-auto" onSubmit={handleSubmit}>
                            <input type="file" id="image" onChange={handleFileChange} className="hidden" />
                            <label htmlFor="image" className="cursor-pointer bg-gray-200 p-2 rounded-lg text-center block">
                                Click here to upload a new profile picture
                            </label>
                            <div className="mb-5">
                                <label htmlFor="firstName" className="block mb-2 text-sm font-medium text-subTextColor">ຊື່ :</label>
                                <input name="firstName" type="text" className="bg-gray-50 border border-btnn text-subTextColor text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" defaultValue={details.First_name || ""} required />
                            </div>
                            <div className="mb-5">
                                <label htmlFor="lastName" className="block mb-2 text-sm font-medium text-subTextColor">ນາມສະກຸນ :</label>
                                <input name="lastName" type="text" className="bg-gray-50 border border-btnn text-subTextColor text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" defaultValue={details.Last_name || ""} required />
                            </div>
                            <div className="mb-5">
                                <label htmlFor="phoneNumber" className="block mb-2 text-sm font-medium text-subTextColor">ເບີໂທ :</label>
                                <input name="phoneNumber" type="number" className="bg-gray-50 border border-btnn text-subTextColor text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" defaultValue={details.Phone_Number || ""} required />
                            </div>
                            <div className="mb-5">
                                <label htmlFor="passport" className="block mb-2 text-sm font-medium text-subTextColor">ເລກບັດປະຈຳໂຕ :</label>
                                <input name="passport" type="number" className="bg-gray-50 border border-btnn text-subTextColor text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" defaultValue={details.Passport || ""} required />
                            </div>
                            <div className="mb-5">
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-subTextColor">ລະຫັດຜ່ານ :</label>
                                <input name="password" type="number" className="bg-gray-50 border border-btnn text-subTextColor text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" defaultValue={details.Password || ""} required />
                            </div>
                            <div className="mb-5">
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-subTextColor">Your email</label>
                                <input name="email" type="email" className="bg-gray-50 border border-btnn text-subTextColor text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" defaultValue={details.Email || ""} required />
                            </div>
                            <div className="w-full flex justify-center ">
                                <button type="button" className="text-black bg-redBottle text-xl font-semibold my-2 px-4 py-2 rounded-lg hover:cursor-pointer w-6/12 flex justify-center items-center" onClick={() => navigate("/")}>
                                    ຍົກເລີກ
                                </button>
                                <div className="w-5 h-1"></div>
                                <button type="submit" className="text-black bg-scueess text-xl font-semibold my-2 px-4 py-2 rounded-lg hover:cursor-pointer w-6/12 flex justify-center items-center">
                                    ບັນທືກ
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <FooterSide />
        </div>
    );
}

export default Profile;
