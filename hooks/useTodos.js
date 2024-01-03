import { useQuery, useMutation, useQueryClient } from 'react-query';
import axios from 'axios';

const getTodos = async () => {
    const { data } = await axios.get('/api/todos');
    return data;
};

const createTodo = async (text) => {
    const { data } = await axios.post('/api/todos', { text });
    return data;
};

const deleteTodo = async (id) => {
    const { data } = await axios.delete(`/api/todos?tid=${id}`);
    return data;
}

const updateTodo = async (id) => {
    const { data } = await axios.put(`/api/todos?tid=${id}`);
    return data;
}

export function useTodos() {
    return useQuery('todos', getTodos);
}

export function useCreateTodo() {
    const queryClient = useQueryClient();

    return useMutation(createTodo, {
        onSuccess: () => {
            queryClient.invalidateQueries('todos');
        },
    });
}


export function useDeleteTodo() {
    const queryClient = useQueryClient();

    return useMutation(deleteTodo, {
        onSuccess: () => {
            queryClient.invalidateQueries('todos');
        },
    });
}

export function useUpdateTodo() {
    const queryClient = useQueryClient();

    return useMutation(updateTodo, {
        onSuccess: () => {
            queryClient.invalidateQueries('todos');
        },
    });
}