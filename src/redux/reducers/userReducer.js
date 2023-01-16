import { createSlice } from "@reduxjs/toolkit";


 export const slice = createSlice({
    name:'user',
    initialState: {
        uid:'',
        name: '',
        email:'',
        img:''
        
    },
    reducers: {
        
        setUID: (state,action) => {
            state.uid = action.payload
        },
        setName: (state,action) => {
            state.name = action.payload
        },
        setEmail: (state,action) => {
            state.email = action.payload
        },
        setImage: (state,action) => {
            state.img = action.payload
        }
    }
 })

 export const {setName,setEmail,setUID,setImage} = slice.actions
 export default slice.reducer