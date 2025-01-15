import baseURL from "../Api/baseURL";

const useDeleteData = async (url, params) => {

    const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem("userToken")}` }
    }
    const res = await baseURL.delete(url, config, params);
    return res.data;


}

export default useDeleteData;