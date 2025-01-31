import { useDispatch, useSelector } from 'react-redux/lib/exports';
import { editAnnouncement, getOneAnnouncement } from '../../../redux/action/announcementAction';
import { useEffect, useState } from 'react';
import Notification from '../../useNotification';

const EditAnnouncementHook = (id) => {
    const [announcementTitle, setAnnouncementTitle] = useState('');
    const [announcementDesc, setAnnouncementDesc] = useState('');
    const [announcementImage, setAnnouncementImage] = useState('');
    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getOneAnnouncement(id));
    }, [dispatch, id]);

    const announcement = useSelector((state) => state.announcementReducer.getOneAnnouncement);
    useEffect(() => {
        if (announcement) {
            setAnnouncementTitle(announcement.title || '');
            setAnnouncementDesc(announcement.desc || '');
            setAnnouncementImage(announcement.image || '');
        }
    }, [announcement]);

    const handleTitleChange = (e) => setAnnouncementTitle(e.target.value);
    const handleDescChange = (e) => setAnnouncementDesc(e.target.value);


    const dataURLtoFile = (dataurl, filename = 'image.jpg') => {
        try {
            if (!dataurl) throw new Error('Invalid Data URL');

            const [header, base64] = dataurl.split(',');
            if (!header || !base64) throw new Error('Malformed Data URL');

            const mimeMatch = header.match(/:(.*?);/);
            if (!mimeMatch) throw new Error('MIME type not found in Data URL');
            const mimeType = mimeMatch[1];

            const binaryStr = atob(base64);
            const len = binaryStr.length;
            const uint8Array = new Uint8Array(len);

            for (let i = 0; i < len; i++) {
                uint8Array[i] = binaryStr.charCodeAt(i);
            }

            return new File([uint8Array], filename, { type: mimeType });
        } catch (error) {
            console.error('Error converting Data URL to File:', error.message);
            return null; // Return null if there's an error
        }
    };



    const handleSubmit = async () => {


        const formData = new FormData();
        if (announcementTitle) formData.append('title', announcementTitle);
        if (announcementDesc) formData.append('desc', announcementDesc);

        if (announcementImage) {
            const imageFile = dataURLtoFile(announcementImage, 'announcement_image.jpeg');
            if (imageFile) {
                // console.log("1")
                formData.append('image', imageFile);
            } else {
                console.error('Failed to convert Data URL to File.');
            }
        } else {
            Notification('No image selected.','warn');
        }
        try {
            setLoading(true);
            await dispatch(editAnnouncement(id, formData));
            setLoading(false);
            Notification('Announcement updated successfully!');
        } catch (error) {
            setLoading(false);
            console.error('Error updating announcement:', error);
            Notification('Failed to update announcement!');
        }
    };
    return [
        announcementTitle,
        setAnnouncementTitle,
        announcementDesc,
        setAnnouncementDesc,
        announcementImage,
        setAnnouncementImage,
        loading,
        setLoading,
        handleTitleChange,
        handleDescChange,
        handleSubmit

    ]
}

export default EditAnnouncementHook
