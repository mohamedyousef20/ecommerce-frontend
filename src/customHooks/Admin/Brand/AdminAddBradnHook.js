import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux/lib/exports'
import Notification from '../../useNotification';
import { createBrand } from '../../../redux/action/brandAction';

const AdminAddBrandHook = () => {

    // get loading state

    const dispatch = useDispatch();

    //get response from server


    // states

    // image state
    const [brandImage, setBrandImage] = useState([]);
    const [brandName, setBrandName] = useState('');

    // selected image state

    // is loading state
    const [loading, setLoading] = useState(true);


    const handelName = (e) => {
        setBrandName(e.target.value);

    };
    // to convert base 64 to file
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



    //handle submit
    const handleSubmit = async (e) => {

        //  image convert it to base file
        const imgBase64ToFile = dataURLtoFile(brandImage[0], Math.random() + '.jpeg');
        // make array of images and convert it to base file
        // const imagesItems = Array.from(Array(Object.keys(brandImage).length).keys()).map(
        //     (item, index) => {
        //         return dataURLtoFile(brandImage[index], Math.random() + '.jpeg');

        //     }
        // )
        // validation on the form

        // if (announcementImage === '' || selectedFile === null) {

        //     Notification('All fields required', 'error')
        //     return;
        // }

        // formData to insert images



        const formData = new FormData();


        formData.append('name', brandName);
        formData.append('image', imgBase64ToFile);

        setLoading(true);
        await dispatch(createBrand(formData));
        setLoading(false);

    }

    // use effect dependency on loading

    useEffect(() => {
        if (loading === false) {
            setBrandName('');
            setBrandImage([]);
            setLoading(true);


            Notification('Add Brand ', 'success')


        }
    }, [loading]
    )

    return [
        brandImage,
        setBrandImage,
        brandName,
        setBrandName,
        handelName,
        handleSubmit
    ];
}

export default AdminAddBrandHook
