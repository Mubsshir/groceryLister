import Item from './components/Item';
import './App.css';
import { useEffect, useState } from 'react';
import { useRef } from 'react';
import Alert from './components/Alert';
let initialAlert = { show: false, msg: "Hello", type: "success" };
let localItems = JSON.parse(localStorage.getItem("gItem"));
const App = () => {
  const [value, setValue] = useState("");
  const [items, setItems] = useState(localItems || []);
  const [isEditing, setIsEditing] = useState(false);
  const [EditId, setEditId] = useState(null);
  const [alert, setAlert] = useState(initialAlert);
  const itemRef = useRef();
  const itemSubmitHandler = (e) => {
    e.preventDefault();
    let item = itemRef.current.value.trim();
    if (item.length === 0) {
      setAlert({ show: true, msg: "Empty Box", type: "error" })
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
      setAlert({ show: true, msg: "Item edited", type: "success" })
      return
    }
    let id = Math.floor(Math.random() * 1000);
    setItems(prev => [{ id: id + 1, item: item }, ...prev]);
    setValue("");
    setAlert({ show: true, msg: "Item added ", type: "success" })
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
  useEffect(() => {
    let timer = setTimeout(() => {
      setAlert(initialAlert);
    }, 3000);
    return () => { clearTimeout(timer) }
  }, [alert])
  useEffect(() => {
    localStorage.setItem("gItem", JSON.stringify(items))
  }, [items]);
  console.log(alert.show)
  return (
    <main className="App">
      <section className='Card'>
        <h3 className="heading">Grocery List</h3>
        {alert.show && <Alert list={items} data={alert} />}
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
