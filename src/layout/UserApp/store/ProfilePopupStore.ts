import { createStore } from './Store';
import ProfilePopupModel from 'layout/UserApp/model/ProfilePopupModel';

const [
    setProfilePopupModel,
    onProfilePopupModel,
    getProfilePopupModel,
    useProfilePopupModel
] = createStore<ProfilePopupModel>();

export {
    setProfilePopupModel,
    onProfilePopupModel,
    getProfilePopupModel,
    useProfilePopupModel
}