import Item from './components/Item';
import './App.css';
import { useState } from 'react';
import { useRef } from 'react';
//let initialAlert = { msg: "", type: "" };
const App = () => {
  const [value, setValue] = useState("");
  const [items, setItems] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [EditId, setEditId] = useState(null);
  // const [alert, setAlert] = useState(initialAlert);
  const itemRef = useRef();
  const itemSubmitHandler = (e) => {
    e.preventDefault();
    let item = itemRef.current.value.trim();
    if (item.length === 0) {
      return
    }
    if (isEditing) {
      setItems(prev => prev.map(data => {
        if (data.id === EditId) {
          return { ...data, item: item }
        }
        return data;
      }))
      setValue("");
      setIsEditing(false)
    }
    let id = Math.floor(Math.random() * 1000);
    setItems(prev => [{ id: id + 1, item: item }, ...prev]);
    setValue("");
  }
  const onChangeHandler = (e) => {
    setValue(e.target.value)
  }
  const handleDelete = (id) => {
    setItems(prev => prev.filter(item => item.id !== id));
  }
  const handleEdit = (item, id) => {
    setIsEditing(true);
    setValue(item);
    setEditId(id);
  }


  return (
    <main className="App">
      <section className='Card'>
        <h3 className="heading">Grocery List</h3>

        <form onSubmit={itemSubmitHandler}>
          <input
            ref={itemRef}
            type="text"
            value={value}
            onChange={onChangeHandler}
          />
          <button type='submit'>{isEditing ? "Edit" : "Add"}</button>
        </form>
        {items.map(item =>
          <Item
            key={item.id}
            id={item.id}
            item={item.item}
            delete={handleDelete}
            edit={handleEdit}
          />)}
      </section>
    </main>
  );
}

export default App;
