
import React from "react";
import fLogo from "../../assets/fLogo.png";
import sLogo from "../../assets/sLogo.png";
function FooterSide() {
  return (
    <div className="w-full pt-12 px-32 pb-10" id="contact">
        <h1 className="text-white text-3xl font-semibold ">ຕິດຕໍ່ພວກເຮົາ</h1>
        <div className="flex justify-around px-32 mt-10 items-center">
          <div className="text-lg text-white">
            <p>+856 020 59 660 111</p>
            <p> +856 020 527 688 34</p>
          </div>
          <div className="text-lg text-white">
            <p>Anyiestate2020@gmail.com
            </p>
            <p> AnyiEstate@gmail.com</p>
          </div>
          <div className="text-lg text-white">
            <p>ບ້ານຈອມມະນີໃຕ້</p>
            <p> ເມືອງໄຊທານີ</p>
            <p> ແຂວງນະຄອນຫລວງວຽງຈັນ</p>
          </div>
        </div>
        <div className="w-full h-[0.5px] bg-btnn mt-5 "></div>
        <div className="flex items-center justify-center mt-10">
          <img src={fLogo} alt="" className="h-16" />
          <img src={sLogo} alt="" className="h-16" />
        </div>
      </div>
  );
}

export default FooterSide;
