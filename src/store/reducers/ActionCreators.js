import { createAsyncThunk } from "@reduxjs/toolkit"
import { getTasks } from "../../http/tasksAPI"
import axios from "axios"
import { taskSlice } from "./TaskSlice"
import { $host } from "../../http"

//  export const fetchTasks = () => (dispatch) => {
//     try {
//          dispatch(taskSlice.actions.tasksFetching())
//          getTasks().then(data => {
//             dispatch(taskSlice.actions.tasksFetchingSuccess(data))
//          })
//     } catch (e) {
//          dispatch(taskSlice.actions.tasksFetchingError(e.message))
//      }
//  }


export const fetchTasks = createAsyncThunk(
    'task/fetchTasks',
     async (_, thunkAPI) => {
        
        try {
          //  const res = await axios('https://jsonplaceholder.typicode.com/photos')
          //  return res.data
          const data = getTasks()
          return data
         }
          catch (e) {
           return thunkAPI.rejectWithValue('Failed to load data')
          } 
          
        
         }
        
)
// export const fetchTasksTasks =  createAsyncThunk (
//     'task/fetchTasks',
//  {
//     const {data} = await $host.get(`api/tasks`)
//      return data
//  }