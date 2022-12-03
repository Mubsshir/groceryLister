import Item from './components/Item';
import './App.css';

const App = () => {
  return (
    <main className="App">
      <section className='Card'>
        <h3 className="heading">Grocery List</h3>
        <form action="">
          <input type="text" />
          <button type='submit'>Add</button>
        </form>
        <Item />
      </section>
    </main>
  );
}

export default App;
