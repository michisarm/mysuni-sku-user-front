import { createStore } from './Store';
import AdminGroupCreate from 'community/viewModel/AdminGroupCreate';

const [
    setAdminGroupCreateItem, 
    onAdminGroupCreateItem, 
    getAdminGroupCreateItem,
    useAdminGroupCreateItem
] = createStore<AdminGroupCreate>();

export {
    setAdminGroupCreateItem,
    onAdminGroupCreateItem,
    getAdminGroupCreateItem,
    useAdminGroupCreateItem,
}