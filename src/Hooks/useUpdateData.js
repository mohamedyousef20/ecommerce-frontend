
import baseURL from "../Api/baseURL";



export const useUpdateData = async (url, params) => {
    const config = {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`
        }
    }
    const res = await baseURL.patch(url, params, config);
    return res.data;


}



export const useUpdateDataWithImage = async (url, params) => {

    const config = {
        headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("userToken")}`
        }
    }

    const res = await baseURL.patch(url, params, config);
    return res;


}