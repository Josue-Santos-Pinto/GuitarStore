import { createSlice } from "@reduxjs/toolkit";


 export const slice = createSlice({
    name:'user',
    initialState: {
        key:'',
        name: '',
        email:'',
        img:''
        
    },
    reducers: {
        
        setGlobalKey: (state,action) => {
            state.key = action.payload
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

 export const {setName,setEmail,setGlobalKey,setImage} = slice.actions
 export default slice.reducer