import {configureStore, createSlice} from '@reduxjs/toolkit'
import user from './Store/userSlice';
import cart from './Store/cartSlice';

export default configureStore({
    reducer: {
        user : user.reducer,
        cart : cart.reducer
    }
})