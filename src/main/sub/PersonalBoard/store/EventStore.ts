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

const [
    setAttendCountItem, 
    onAttendCountItem, 
    getAttendCountItem,
    useAttendCountItem
] = createStore<any>([])

export {
    setAttendEventItem, 
    onAttendEventItem, 
    getAttendEventItem,
    useAttendEventItem,
    setAttendCountItem, 
    onAttendCountItem, 
    getAttendCountItem,
    useAttendCountItem
}