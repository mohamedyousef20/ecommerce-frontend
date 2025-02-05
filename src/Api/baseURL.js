import axios from "axios"

// base URL by axios


// const baseURL = axios.create({
//     baseURL: `https://ecommerce-backend-iidjv063i-mohamedyousefs-projects.vercel.app`
// });

const baseURL = axios.create({
    baseURL: 'http://localhost:2222'
});

// export const PulicRequest = axios.create({
//     baseURL: 'http://localhost:2222'
// });

// export const UserRequest = axios.create({
//     baseURL: 'http://localhost:2222',
//     headers:{token:'Bearer'}
// });

export default baseURL