import baseURL from "../Api/baseURL";

export const InsertData = async (url, params) => {
    const config = {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`
        }
    }
    const res = await baseURL.post(url, params,config);
    return res.data;


}

export const useInsertDataWithImage = async (url, params) => {
    const config = {
        headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("userToken")}`
        }
    }
    const res = await baseURL.post(url, params, config);
    console.log(res)
    return res;


}

