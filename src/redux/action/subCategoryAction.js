// export const createSubCategory = () => async (dispatch) => {

const { default: useGetData } = require("../../Hooks/useGetData")
const { GET_SUB_CATEGORY } = require("../type")
const { GET_ERROR } = require("../type")

//     try {
//         const response = await userInser('/api/vi/category', formData)

//         dispatch({
//             type: CREATE_CATEGORY,
//             payload: response,
//             loading: true
//         })
//     }

//     catch (err) {
//         dispatch({
//             type: GET_ERROR,
//             payload: err.response ? err.response.data : { message: 'An error occurred' },
//         })
//     }
// }


// get all subcategory belong to category

const getSubcateOnCategory = (id) => async (dispatch) => {
    try {
        const response = await useGetData(`/api/vi/category/${id}/subcategories`)

        dispatch({
            type: GET_SUB_CATEGORY,
            payload: response,
            loading: true
        })
    }

    catch (err) {
        dispatch({
            type: GET_ERROR,
            payload: err.response ? err.response.data : { message: 'An error occurred' },
        })
    }

}

