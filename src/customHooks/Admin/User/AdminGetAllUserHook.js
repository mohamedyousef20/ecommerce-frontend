import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux/lib/exports';
import { getAllUser } from '../../../redux/action/userAction';

const AdminGetAllUserHook = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllUser());
    }, []);

    const allUsers = useSelector((state) => state.userReducer.user);
// console.log('users',allUsers)
    let users = [];
    try {
        if (allUsers) {
            users = allUsers;
        }
        else {
            users = [];
        }
    } catch (e) {
        // console.log(e)
    }

    return [users];

}

export default AdminGetAllUserHook
