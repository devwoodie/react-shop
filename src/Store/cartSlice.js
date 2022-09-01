import {createSlice} from '@reduxjs/toolkit';

let cart = createSlice({
    name : 'cart',
    initialState : [

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
        },
        removeItem(state, action){
            let index = state.findIndex((a) => {return a.id == action.payload})
            state.splice(index,1)
        }
    }
});

export let { addCount, addItem, removeCount ,removeItem } = cart.actions

export default cart