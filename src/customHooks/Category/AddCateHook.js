import { useEffect, useState } from 'react'
import Notification from '../useNotification'
import { useDispatch, useSelector } from 'react-redux/lib/exports'
import { createCategory } from '../../redux/action/categoryAction'

const AddCateHook = () => {

    // get loading state

    const dispatch = useDispatch();

    //get response from server
    const res = useSelector(state => state.categoryReducer.category);


    // states

    // image state
    const [categoryImage, setCategoryImage] = useState([]);
    // selected image state
    const [selectedFile, setSelectedFile] = useState(null);
    // category name state
    const [categoryName, setCategoryName] = useState('');
    // is loading state
    const [loading, setLoading] = useState(true);
    // handle name
    const handelName = (e) => {
        setCategoryName(e.target.value);

    }

    // // handle image
    // const handelImage = (e) => {
    //     const file = e.target.files;
    //     console.log(file)

    //     if (file) {
    //         setCategoryImage(URL.createObjectURL(file));
    //         setSelectedFile(e.target.files[0])
    //     }
    //     else {
    //         console.log('error')
    //     }
    //     console.log(selectedFile)


    // }
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
        const imgBase64ToFile = dataURLtoFile(categoryImage[0], Math.random() + '.jpeg');
        // make array of images and convert it to base file
        const imagesItems = Array.from(Array(Object.keys(categoryImage).length).keys()).map(
            (item, index) => {
                return dataURLtoFile(categoryImage[index], Math.random() + '.jpeg');

            }
        )
        // validation on the form

        // if (categoryName === '' || selectedFile === null) {

        //     Notification('All fields required', 'error')
        //     return;
        // }

        // formData to insert images

        const formData = new FormData();

        formData.append('name', categoryName);
        formData.append('image', imgBase64ToFile);
        setLoading(true);
        await dispatch(createCategory(formData));
        setLoading(false);



    }

    // use effect dependency on loading

    useEffect(() => {
        if (loading === false) {
            setCategoryName('');
            setCategoryImage();
            setLoading(true);

            if (res && res.status === 200) {

                Notification('Add category ', 'success')

            }
            else {
                Notification('error', 'done')

            }

        }
    }, [loading]
    )

    return [categoryImage, setCategoryImage, handelName, categoryName, handleSubmit];
}

export default AddCateHook
