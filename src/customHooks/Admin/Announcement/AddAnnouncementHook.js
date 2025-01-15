import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux/lib/exports'
import Notification from '../../useNotification';
import { createAnnouncement } from '../../../redux/action/announcementAction';

const AddAnnouncementHook = () => {

    // get loading state

    const dispatch = useDispatch();

    //get response from server


    // states

    // image state
    const [announcementImage, setAnnouncementImage] = useState([]);
    // selected image state
    const [announcementTitle, setAnnouncementTitle] = useState('');
    const [announcementDesc, setAnnouncementDesc] = useState('');
    // is loading state
    const [loading, setLoading] = useState(true);
    console.log('announcementImage', announcementImage)
    // handle name
    const handelTitle = (e) => {
        setAnnouncementTitle(e.target.value);

    };
    const handelDesc = (e) => {
        setAnnouncementDesc(e.target.value);

    }
    // to convert base 64 to file
    function dataURLtoFile(dataurl, filename) {

        var arr = dataurl.split(','),
            mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]),
            n = bstr.length,
            u8arr = new Uint8Array(n);

        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }

        return new File([u8arr], filename, { type: mime });
    }

    //handle submit
    const handleSubmit = async (e) => {

        //  image convert it to base file
        const imgBase64ToFile = dataURLtoFile(announcementImage[0], Math.random() + '.jpeg');
        // make array of images and convert it to base file
        const imagesItems = Array.from(Array(Object.keys(announcementImage).length).keys()).map(
            (item, index) => {
                return dataURLtoFile(announcementImage[index], Math.random() + '.jpeg');

            }
        )
        // validation on the form

        // if (announcementImage === '' || selectedFile === null) {

        //     Notification('All fields required', 'error')
        //     return;
        // }

        // formData to insert images



        const formData = new FormData();

        formData.append('title', announcementTitle);
        formData.append('desc', announcementDesc);
        formData.append('image', imgBase64ToFile);
     
        setLoading(true);
        await dispatch(createAnnouncement(formData));
        setLoading(false);


    }

    // use effect dependency on loading

    useEffect(() => {
        if (loading === false) {
            setAnnouncementTitle('');
            setAnnouncementDesc('');
            setAnnouncementImage([]);
            setLoading(true);


            Notification('Add annoucment ', 'success')


        }
    }, [loading]
    )

    return [
        announcementImage,
        setAnnouncementImage,
        announcementTitle,
        handelTitle,
        handelDesc,
        announcementDesc,
        handleSubmit
    ];
}

export default AddAnnouncementHook
