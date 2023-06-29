import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"

export const taskAPI = createApi({
    reducerPath: 'taskAPI',
    baseQuery: fetchBaseQuery({baseUrl: process.env.REACT_APP_API_URL}),
    tagTypes: ['Task'],
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
    })
})