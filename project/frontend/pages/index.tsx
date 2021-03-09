import { GetServerSideProps, GetStaticProps } from 'next';
import Head from 'next/head'
import { useState } from 'react';
import { Todo } from '../types/todo';
import axios from 'axios'
import { Image } from '../components/Image';

export const baseDir = __dirname;
// 8081 port because of the client side's location
export const baseURL = "/api";
export default function Home({ todosDb }: { todosDb: Todo[] }) {

  const [todoInput, setTodoInput] = useState("")
  const [todos, setTodos] = useState(todosDb || []);

  const d = new Date()
  const currentDate = `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data } = await axios.post(`${baseURL}/todos/add`, { name: todoInput, done: false })
    const updatedTodos = JSON.parse(data.todos);

    setTodoInput("")
    setTodos(updatedTodos);
  }

  const handleInputFieldChange = (event: any) => {
    setTodoInput(event.target.value)
  }

  return (
    <div>
      <Head>
        <title>Todos</title>
      </Head>
      <div>
        <Image date={currentDate} />
        <form onSubmit={handleSubmit}>
          <input type="text" maxLength={140} value={todoInput} onChange={handleInputFieldChange}></input>
          <button type="submit">Create TODO</button>
        </form>
        <ul>
          {todos.map((todo: Todo) => (
            <li key={todo.id}>{todo.name}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    // 3001 because its server side => Port that the server sees
    const { data } = await axios.get("http://localhost:3001/api/todos/")
    const todosDb = JSON.parse(data.todos);
    return {
      props: {
        todosDb,
      },
    }
  } catch (error) {
    console.log(error.message);
    return {
      props: {
        todosDb: []
      }
    }
  }
}