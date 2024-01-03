// components/TodoList.js
import { useTodos,useDeleteTodo,useUpdateTodo } from '@/hooks/useTodos';
import {Button,Dropdown,DropdownTrigger,DropdownMenu,DropdownItem} from "@nextui-org/react";
const TodoList = () => {
    const { data: todos, isLoading } = useTodos();
    const { mutate: deleteTodo,isLoading:isDeleteTodoLoading } = useDeleteTodo();
    const { mutate: updateTodo,isLoading:isUpdateTodoLoading } = useUpdateTodo();
    const handleDeleteTodo = async (id) => {
        await deleteTodo(id);
    }
    const handleUpdateTodo = async (id) => {
        await updateTodo(id);
    }

    if (isLoading) {
        return <p>Loading...</p>;
    }

    return (
        <div className="space-y-2 p-2 h-64 overflow-y-scroll">

            {
                todos.length === 0 ? <div className="h-full grid justify-center items-center">
                        <p>There are no todos</p>
                </div> :
                    todos.map((todo) => (
                        <div className="px-2 py-1 bg-gray-100 rounded-md flex justify-between items-center" key={todo._id}>
                            <p>{todo.text}</p>
                            <Dropdown>
                                <DropdownTrigger>
                                    {
                                        todo.completed ? <Button color="success" size="sm">✅</Button> :
                                            <Button color="primary" size="sm" isLoading={isDeleteTodoLoading||isUpdateTodoLoading}>⋮</Button>
                                    }
                                </DropdownTrigger>
                                <DropdownMenu>
                                    {
                                        !todo.completed && <DropdownItem color="primary" onClick={()=>handleUpdateTodo(todo._id)}>✅</DropdownItem>
                                    }
                                    <DropdownItem color="danger" className="text-danger" onClick={()=>handleDeleteTodo(todo._id)}>Delete</DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                        </div>
                    ))
            }
        </div>
    );
};

export default TodoList;
