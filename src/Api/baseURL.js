import axios from "axios"

// base URL by axios


// https://ecommerce-backend-750z2uu1r-mohamedyousefs-projects.vercel.app

const baseURL = axios.create({
    baseURL: 'https://ecommerce-backend-750z2uu1r-mohamedyousefs-projects.vercel.app'
});

// export const PulicRequest = axios.create({
//     baseURL: 'http://localhost:2222'
// });

// export const UserRequest = axios.create({
//     baseURL: 'http://localhost:2222',
//     headers:{token:'Bearer'}
// });

export default baseURL