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
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [fetchCount, setFetchCount] = useState<number>(0)

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

  async function fetcher(): Promise<Items> {
    return executeGet('http://localhost:8082/lists')
  }

  async function handleClick() {
    setIsLoading(true)
    const res = await fetcher()
    setItems((prev) => prev.concat(res.lists))
    setIsLoading(false)
    setFetchCount((prev) => prev + 1)
  }

  return (
    <>
      <button onClick={handleClick}>
        ぼたん
      </button>
        count: {fetchCount}
      <my-list>
        {items.map(item => {
          return <Item itemName={item.name}></Item>;
        })}
        {/* { isLoading &&  <div slot='item'>ローディング中</div>} */}
        { isLoading &&  <div slot='item' className="loader">Loading...</div>} 
      </my-list>
    </>
  )
}

export default App
