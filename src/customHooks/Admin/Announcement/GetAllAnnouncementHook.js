import React, { useEffect } from 'react'
import { getAllAnnouncement } from '../../../redux/action/announcementAction';
import { useDispatch, useSelector } from 'react-redux/lib/exports';

const GetAllAnnouncementHook = () => {
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(getAllAnnouncement());
    }, [dispatch]);

    const allAnnouncements = useSelector((state) => state.announcementReducer.getAllAnnouncement);

    let announcements = [];
    try {
        if (allAnnouncements) {
            announcements = allAnnouncements;
        }
        else {
            announcements = [];
        }
    } catch (e) {
        console.log(e)
    }

    return [announcements];

}

export default GetAllAnnouncementHook
