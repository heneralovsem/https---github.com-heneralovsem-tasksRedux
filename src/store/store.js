import { combineReducers, configureStore } from "@reduxjs/toolkit"
import taskReducer from "./reducers/TaskSlice"
import { taskAPI } from "../services/TasksService"


const rootReducer = combineReducers({
    taskReducer,
    [taskAPI.reducerPath]: taskAPI.reducer
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) => 
            getDefaultMiddleware().concat(taskAPI.middleware)
    })
}


