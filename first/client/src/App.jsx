import { useState } from 'react'
import {useQuery, gql} from '@apollo/client'

const  query=gql`
  query GetTodosWithUser{
    getTodos{
    id
      title
      completed
      user{
        id
        name
      }
    }
  }
`;
function App() {
  const {data,loading}=useQuery(query)
  if(loading)return <center><h1>Loading....</h1></center>
  return (
    <>
      <div>
        {/* {JSON.stringify(data)} */}
        <table>
          <tbody>
            {
              data.getTodos.map((todo)=>(
                <tr key={todo.id}>
                  <td>{todo.title}</td>
                  <td>{todo?.user?.name}</td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </>
  )
}

export default App
