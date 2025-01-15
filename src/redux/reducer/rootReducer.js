import { combineReducers } from "redux";
import categoryReducer from "./categoryReducer";
import productReducer from "./productReducer";
import couponReducer from "./couponReducer";
import authReducer from "./authReducer";
import userReducer from "./userReducer";
import cartReducer from "./cartReducer";
import reviewReducer from "./reviewReducer";
import wishListReducer from "./wishListReducer";
import announcementReducer from "./announcementReducer";
import brandReducer from "./brandReducer";
import orderReducer from "./orderReducer";
import paymentReducer from "./paymentReducer";

export default combineReducers({
    categoryReducer: categoryReducer,
    allProduct: productReducer,
    couponReducer: couponReducer,
    authReducer: authReducer,
    userReducer: userReducer,
    cartReducer: cartReducer,
    reviewReducer: reviewReducer,
    wishListReducer: wishListReducer,
    announcementReducer: announcementReducer,
    brandReducer: brandReducer,
    orderReducer: orderReducer,
    paymentReducer: paymentReducer,
})

