// pages/index.js
import TodoList from '@/components/TodoList';
import { useCreateTodo } from '@/hooks/useTodos';
import { useState } from 'react';
import {Button,Input,Card, CardBody,CardHeader,Divider} from "@nextui-org/react";
const HomePage = () => {
  const [newTodo, setNewTodo] = useState('');
  const { mutate: createTodo,isLoading } = useCreateTodo();
  const handleCreateTodo = async () => {
    if (newTodo.trim() !== '') {
      await createTodo(newTodo);
      setNewTodo('');
    }
  };

  return (
      <div className="h-screen grid justify-center items-center">
          <Card>
                <CardHeader>
                    <h1 className="text-4xl">📒Todos</h1>
                </CardHeader>
                <Divider/>
              <CardBody>
                  <div className="flex items-center w-fit gap-2 drop-shadow-2xl p-1">
                      <Input
                          type="text"
                          value={newTodo}
                          size="md"
                          onChange={(e) => setNewTodo(e.target.value)}
                      />
                      <Button onClick={handleCreateTodo} disabled={isLoading}
                              color="primary" isLoading={isLoading}>Add</Button>
                  </div>
                  <TodoList/>
              </CardBody>
          </Card>

      </div>
  );
};

export default HomePage;
