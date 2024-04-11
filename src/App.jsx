import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { faCheckSquare } from '@fortawesome/free-solid-svg-icons';
import { faRectangleXmark } from '@fortawesome/free-solid-svg-icons';


function App() {

  const [todos, setTodos] = useState(() => {
    return JSON.parse(localStorage.getItem('todos')) || []
  });
  const [todo, setTodo] = useState("");
  const [editId, setEditId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [showPopup, setshowPopup] = useState(false);

  const addTodo = () => {
    if (todo) {
      setTodos([...todos, { id: Date.now(), title: todo, completed: false }]);
      setTodo("");
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter") addTodo();
  }

  const toggleTodo = (id) => {
    const newTodos = todos.map(todo => {
      if (todo.id == id) return { ...todo, completed: !todo.completed };
      return todo;
    })
    setTodos(newTodos);
  }

  const removeTodo = (id) => {
    const newTodos = todos.filter(todo => todo.id != id)
    setTodos(newTodos);
  }

  const startEdit = (id, title) => {
    setEditId(id);
    setEditTitle(title);
  }

  const saveEdit = (id) => {
    const newTodos = todos.map(todo => {
      if (todo.id == id) return { ...todo, title: editTitle };
      return todo;
    })
    setTodos(newTodos);
    setEditId(null);
    setEditTitle("");
  }

  const cancelEdit = () => {
    setEditId(null);
    setEditTitle("");
  }

  const handleClearAll = () => {
    setshowPopup(true);
  }

  const handleNo = () => {
    setshowPopup(false);
  }
  const handleYes = () => {
    setTodos([]);
    setshowPopup(false);
  }

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);


  return (
    <>
      <div className='font-sans flex justify-center items-center flex-col'>
        <h1 className='my-6  text-3xl'>ToDo - App</h1>
        <hr className="border-gray-400 w-full" />
        <div className={showPopup ? 'space-x-4 mt-6 pointer-events-none' : 'space-x-4 mt-6'}>
          <input
            type='text'
            placeholder='Enter todo'
            className=' text-base rounded border-2 border-white text-black h-8 bg-gray-400 placeholder-white'
            value={todo}
            onChange={e => setTodo(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button className='bg-green-600 w-20 rounded border-2 h-8' onClick={addTodo}>Add</button>
          {todos?.length > 0 && <button className='bg-red-600 w-20 rounded border-2 h-8' onClick={handleClearAll}>Clear all</button>}
        </div>
        {showPopup && <div className='border w-5/12 h-40 flex justify-center items-center rounded-lg absolute bg-black top-1/3'>
          <h1>Are you sure you want to clear all todos?</h1>
          <button className='mx-10 border-2 rounded border-white  bg-green-600 w-20' onClick={handleNo}>No</button>
          <button className='border-2 rounded border-white  bg-red-600 w-20' onClick={handleYes}>Yes</button>
        </div>}
        <div className={showPopup ? 'my-10 pointer-events-none' : 'my-10'}>
          {todos.map((todo) => (
            <div key={todo.id} className='rounded border-2 w-auto my-2 px-4 h-16 flex items-center bg-neutral-900 hover:border-2 hover:border-green-600 transition-transform hover:scale-105'>
              {editId == todo.id ?
                <>
                  <input
                    type="text"
                    className="w-2/3 bg-transparent border-b border-gray-500 focus:outline-none mr-20"
                    value={editTitle}
                    onChange={e => setEditTitle(e.target.value)}
                  />
                  <div className="inline-block border-2 border-green-500 mr-4 rounded-3xl w-10 h-10 flex justify-center items-center cursor-pointer">
                    <FontAwesomeIcon icon={faCheckSquare} className='text-green-500 size-5' onClick={() => saveEdit(todo.id)} />
                  </div>
                  <div className="inline-block border-2 border-red-600 rounded-3xl w-10 h-10 flex justify-center items-center cursor-pointer">
                    <FontAwesomeIcon icon={faRectangleXmark} className='text-red-500 size-5' onClick={() => cancelEdit(todo.id)} />
                  </div>
                </>
                :
                <>
                  <input type="checkbox" checked={todo?.completed} id={`checkbox-${todo.id}`} className="mr-2 h-5 w-6" onChange={() => toggleTodo(todo.id)} />
                  <label
                    htmlFor={`checkbox-${todo.id}`}
                    className={todo.completed ? "cursor-pointer w-96 line-through text-green-500" : "cursor-pointer w-96"}
                  >{todo.title}</label>
                  <div className="inline-block border-2 border-blue-500 mr-4 rounded-3xl w-10 h-10 flex justify-center items-center cursor-pointer">
                    <FontAwesomeIcon icon={faPenToSquare} className='text-blue-500 size-5' onClick={() => startEdit(todo.id, todo.title)} />
                  </div>
                  <div className="inline-block border-2 border-red-600 rounded-3xl w-10 h-10 flex justify-center items-center cursor-pointer">
                    <FontAwesomeIcon icon={faTrashCan} className='text-red-500 size-5' onClick={() => removeTodo(todo.id)} />
                  </div>
                </>
              }
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default App
