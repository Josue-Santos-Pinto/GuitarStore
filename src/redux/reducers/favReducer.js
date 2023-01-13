import { createSlice } from "@reduxjs/toolkit";

const initialState = []

 export const slice = createSlice({
    
    name:'cart',
    initialState,
    reducers: {
        addToFav(state, {payload}) {
            //   console.log(payload);
            //id is the unique id of the item
            const {id} = payload;
      
            const find = state.find(item => item.id === id);
            if (find) {
              return state.map(item =>
                item.id === id
                  ? {
                      ...item,
                      quantity: item.quantity + 1,
                    }
                  : item,
              );
            } else {
              state.push({
                ...payload,
                quantity: 1,
              });
            }
          },
         
          removeItem: (state, action) => {
            //   console.log(state);
            //   console.log(state);
            //   console.log(action);
            const itemId = action.payload;
            return state.filter(item => item.id !== itemId);
          },
        },
        
    })

 export const {addToFav,removeItem} = slice.actions
 export default slice.reducer