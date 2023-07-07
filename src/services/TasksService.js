import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"

export const taskAPI = createApi({
    reducerPath: 'taskAPI',
    baseQuery: fetchBaseQuery({baseUrl: process.env.REACT_APP_API_URL}),
    tagTypes: ['Task', 'CompletedTask'],
    endpoints: (build) => ({
        fetchAllTasks: build.query({
            query: () => ({
                url: `api/tasks`,
                
            }),
            providesTags: result => ['Task']
        }),
        createTask: build.mutation({
            query: (task) => ({
                url: `api/tasks`,
                method: 'POST',
                body: task
            }),
            invalidatesTags: ['Task']
        }),
        updateTask: build.mutation({
            query: (task) => ({
                url: `api/tasks/${task.id}`,
                method: 'PUT',
                body: task
            }),
            invalidatesTags: ['Task']
        }),
        deleteTask: build.mutation({
            query: (id) => ({
                url: `api/tasks/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Task']
        }),
        fetchCompletedTasks: build.query({
            query: () => ({
                url: `api/tasks/completed`,
                
            }),
            providesTags: result => ['CompletedTask']
        }),
        completeTask: build.mutation({
            query: (task) => ({
                url: `api/tasks/completed`,
                method: 'POST',
                body: task
            }),
            invalidatesTags: ['CompletedTask']
        }),
    })
})