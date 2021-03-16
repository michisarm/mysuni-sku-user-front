import AttendEvent from '../viewModel/AttendEvent';
import { createStore } from './Store';

const [
    setAttendEventItem, 
    onAttendEventItem, 
    getAttendEventItem,
    useAttendEventItem
] = createStore<AttendEvent>(
    {
        startDateTime: [],
        endDateTime: [],
        id: '',
        name: '',
        useYn: false
    }
);

export {
    setAttendEventItem, 
    onAttendEventItem, 
    getAttendEventItem,
    useAttendEventItem
}