import './App.css'
import './bundle.js'
import { useEffect, useState } from 'react'
import { Item } from './components/Item.js';

type Item = {
  id: string;
  name: string;
}

type Items = {
  lists: Item[];
}

function App() {

  const [items, setItems] = useState<Item[]>([])

  function callback() {
    console.log('ボトムにいます')
    handleClick()
  }

  useEffect(() => {
    console.log('useEffectが動いたぞ')
    document.removeEventListener('scroll-bottom', callback);
    document.addEventListener('scroll-bottom', callback);
    }, []);


  async function executeGet<T>(url: string): Promise<T> {
    const response = await fetch(url, { method: 'GET' })
    return response.json()
  }

  async function fether(): Promise<Items> {
    return executeGet('http://localhost:8082/lists')
  }

  async function handleClick() {
    const res = await fether()
    // res.lists.map(item => console.log(item))

    updateDate(res)
  }

  async function updateDate(res: Items) {
    setItems((prev) => prev.concat(res.lists))
  }

  return (
    <>
      <button onClick={handleClick}>
        ぼたん
      </button>
      <my-list>
        {items.map(item => {
          return <Item itemName={item.name}></Item>;
        })}
      </my-list>
    </>
  )
}

export default App
