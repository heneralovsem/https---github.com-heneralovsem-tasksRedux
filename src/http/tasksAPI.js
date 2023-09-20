import { $host } from "."

 export const getTasks =  async () => {
    const {data} = await $host.get(`api/tasks`)
     return data
 }
