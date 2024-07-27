// import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { createType, deleteType, getAllType, search, updateType } from "./typeApi";
import { addType } from "../../slice/typeSlice";
import { addSearch } from "../../slice/searchSlice";
export const GetAlltype = () => async (dispatch) => {
  try {
    const type = await getAllType();
    console.log(type.data);
    if (type.status == "ok") {
      dispatch(addType(type.data));
      return true;
    }
  } catch (error) {
    Swal.fire(error.message);
    return false;
  }
};

export const CreateTypeProduct =
  (formData) => async (dispatch) => {
    try {
      Swal.fire({
        title: "Loading",
        text: "Please wait...",
        allowOutsideClick: false,
        onBeforeOpen: () => {
          Swal.showLoading();
        },
      });

      const type = await createType(formData);
      if (type.status === "ok") {
        dispatch(GetAlltype());
        Swal.fire("Success", type.message, "success");
        return true;
      } else {
        Swal.close();

        Swal.fire("Error", type.message, "error");
        return false;
      }
    } catch (error) {
      Swal.close();

      Swal.fire("Error", error.message, "error");
      return false;
    }
  };
export const DeleteType = (id) => async (dispatch) => {
  try {
    const type = await deleteType(id);
    console.log(type);
    if (type.status === "ok") {
      Swal.fire("success", type.message, "success");
      dispatch(GetAlltype());
      return true;
    } else {
      Swal.fire(type.message);
    }
  } catch (error) {
    Swal.fire("Error", error.message, "error");
    return false;
  }
};


export const UpdateType =
  (Type_ID, formData) =>
    async (dispatch) => {
      try {
        // Show loading popup
        Swal.fire({
          title: "Loading",
          text: "Please wait...",
          allowOutsideClick: false,
          onBeforeOpen: () => {
            Swal.showLoading();
          },
        });

        const type = await updateType(
          Type_ID, formData
        );
        if (type.status === "ok") {
          dispatch(GetAlltype());
          Swal.fire("Success", type.message, "success");
          return true;
        } else {
          Swal.close();
          Swal.fire("Error", type.message, "error");
          return false;
        }
      } catch (error) {
        Swal.close();
        Swal.fire("Error", error.message, "error");
        return false;
      }
    };
export const Search = (fromDate, toDate, typeroom_id) => async (dispatch) => {
  try {
    const type = await search(fromDate, toDate, typeroom_id);
    console.log(type.data);
    if (type.status == "ok") {
      dispatch(addSearch(type.data));
      return true;
    }
  } catch (error) {
    Swal.fire(error.message);
    return false;
  }
};