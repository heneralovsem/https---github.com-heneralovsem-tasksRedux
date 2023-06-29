import { $host } from "."


// export const createTask =  async (task) => {
//     const {data} = await $host.post('api/tasks', task)
//     return data
// }
 export const getTasks =  async () => {
    const {data} = await $host.get(`api/tasks`)
     return data
 }
//  export const deleteTask = async (id) => {
//     const {data} = await $host.delete('api/tasks/' + id)
//     return data;
// }

// export const updateTask = async (task) => {
//     const {data} = await $host.put('api/tasks/' + task.id, task)
//     return data
// }
