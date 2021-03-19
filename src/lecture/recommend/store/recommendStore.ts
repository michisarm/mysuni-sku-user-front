import { createStore } from './Store';

const [
    setRecentlyStudyChannelItem, 
    onRecentlyStudyChannelItem, 
    getRecentlyStudyChannelItem,
    useRecentlyStudyChannelItem
] = createStore<any[]>([]);

export {
    setRecentlyStudyChannelItem, 
    onRecentlyStudyChannelItem, 
    getRecentlyStudyChannelItem,
    useRecentlyStudyChannelItem
}