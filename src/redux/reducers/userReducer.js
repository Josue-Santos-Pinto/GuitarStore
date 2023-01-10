import { createSlice } from "@reduxjs/toolkit";


 export const slice = createSlice({
    name:'user',
    initialState: {
        id:'',
        name: '',
        email:'',
    },
    reducers: {
        setName: (state,action) => {
            state.name = action.payload
        },
        setEmail: (state,action) => {
            state.email = action.payload
        },
        setId: (state,action) => {
            state.id = action.payload
        }
    }
 })

 export const {setName,setEmail,setId} = slice.actions
 export default slice.reducer