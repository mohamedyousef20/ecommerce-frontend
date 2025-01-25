import {
    CREATE_ANNOUNCEMENT,
    GET_ALL_ANNOUNCEMENT,
    DELETE_ANNOUNCEMENT,
    GET_ERROR,
    UPDATE_ANNOUNCEMENT,
    GET_ONE_ANNOUNCEMENT,
    GET_ALL_ANNOUNCEMENT_HOME_PAGE
} from "../type"

const initial = {
    createAnnouncement: [],
    getAllAnnouncement: [],
    getAllAnnouncementHomePage: [],
    getOneAnnouncement: [],
    updateAnnouncement: [],
    deleteAnnouncement: [],
    error: [],
    loading: true,
};

const announcementReducer = (state = initial, action) => {

    switch (action.type) {


        case GET_ALL_ANNOUNCEMENT:
            return {
                ...state,
                getAllAnnouncement: action.payload,
                loading: false,
            }
        case GET_ALL_ANNOUNCEMENT_HOME_PAGE:
            return {
                ...state,
                getAllAnnouncementHomePage: action.payload,
                loading: false,
            }

        case CREATE_ANNOUNCEMENT:
            return {
                ...state,
                createAnnouncement: action.payload,
                loading: false,
            }
        case DELETE_ANNOUNCEMENT:
            return {
                ...state,
                deleteAnnouncement: action.payload,
                loading: false,
            }

        case UPDATE_ANNOUNCEMENT:
            return {
                ...state,
                updateAnnouncement: action.payload,
                loading: false,
            }
        case GET_ONE_ANNOUNCEMENT:
            return {
                ...state,
                getOneAnnouncement: action.payload,
                loading: false,
            }

        case GET_ERROR:
            return {
                error: action.payload,
                loading: true,
            }
        default:
            return state;

    }
};

export default announcementReducer