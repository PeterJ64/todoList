import axios from "axios"
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function getPosts() {
    return axios
        .get("https://648881d70e2469c038fde4a0.mockapi.io/todos/")
        .then(res => res.data)
}


export function getTodoItems() {
    return axios
        .get(`https://648881d70e2469c038fde4a0.mockapi.io/todoItems`)
        .then(res => res.data)
}


const addTodoList = (name:string) => {
    return axios.post("https://648881d70e2469c038fde4a0.mockapi.io/todos", {
        name: name
    })
}

const addTodoItems = (obj:any) => {
    return axios.post("https://648881d70e2469c038fde4a0.mockapi.io/todoItems/", obj)
}

const updateStatus = (obj:any) => {
    console.log("OBJ: ",obj);
    return axios.put(`https://648881d70e2469c038fde4a0.mockapi.io/todoItems/${obj.id}`,{finished: obj.status})
}

const deleteTodoItem = ( id:string) => {
    return axios.delete(`https://648881d70e2469c038fde4a0.mockapi.io/todoItems/${id}`);
}

export const useAddTodoList = () => {
    const queryClient = useQueryClient()
    return useMutation((name:string) => addTodoList(name), {
        onSuccess: () => {
            queryClient.invalidateQueries(['todos'])
        }
    });
}

export const useAddTodoItems = () => {
    const queryClient = useQueryClient()
    return useMutation((obj:any) => addTodoItems(obj), {
        onSuccess: () => {
            queryClient.invalidateQueries(['todoItems'])
        }
    });
}

export const useUpdateStatus = () => {
    const queryClient = useQueryClient()
    return useMutation((obj:any) => updateStatus(obj), {
        onSuccess: () => {
            queryClient.invalidateQueries(['todoItems'])
        }
    });
}

export const useDeleteItem = () => {
    const queryClient = useQueryClient()
    return useMutation((id:string) => deleteTodoItem(id), {
        onSuccess: () => {
            queryClient.invalidateQueries(['todoItems'])
        }
    });
}
