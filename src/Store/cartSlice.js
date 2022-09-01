import {createSlice} from '@reduxjs/toolkit';

let cart = createSlice({
    name : 'cart',
    initialState : [
        {id : 0, name : 'White and Black', count : 2},
        {id : 2, name : 'Grey Yordan', count : 1},
    ],
    reducers : {
        addCount(state, action){
            let index = state.findIndex((a) => {return a.id == action.payload})
            state[index].count++;
        },
        addItem(state, action){
            state.push(action.payload)
        },
        removeCount(state, action){
            let index = state.findIndex((a) => {return a.id == action.payload})
            state[index].count--;
        }
    }
});

export let { addCount, addItem, removeCount } = cart.actions

export default cart