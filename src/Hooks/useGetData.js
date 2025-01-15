import baseURL from "../Api/baseURL";

export const useGetData = async (url, params) => {

    const res = await baseURL.get(url, params);
    return res.data;


}


export const useGetDataToken = async (url, params) => {
    const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem("userToken")}` }
    }
    const res = await baseURL.get(url, config);
    return res.data;
}


