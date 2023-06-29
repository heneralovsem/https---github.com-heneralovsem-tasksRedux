import { createSlice } from "@reduxjs/toolkit";
import { fetchTasks } from "./ActionCreators";



const initialState = {
    tasks: [],
    isLoading: false,
    error: '',
    count: 0,

}

export const taskSlice = createSlice({
    name: 'task',
    initialState,
    reducers: {
        increment(state, action) {
            state.count += action.payload
        },

        //  tasksFetching(state, action) {
        //      state.isLoading = true;
        //  },
        //  tasksFetchingSuccess(state, action) {
        //      state.isLoading = false;
        //      state.error = ''
        //      state.tasks = action.payload
        //  },
        //  tasksFetchingError(state, action) {
        //      state.isLoading = false;
        //      state.error = action.payload
        //  },
    },
    extraReducers: (builder) =>   {
       builder.addCase(fetchTasks.pending, (state) => {
            state.isLoading = true;
        })
    //     [fetchTasks.fulfilled]: (state, action) => {
    //         state.isLoading = false;
    //         state.error = ''
    //         state.tasks = action.payload
        // },
        builder.addCase(fetchTasks.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        })
        builder.addCase(fetchTasks.fulfilled, (state, action) => {
            state.isLoading = false
            state.tasks = action.payload
          })
    },
})

export default taskSlice.reducer