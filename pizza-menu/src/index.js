import { createRoot } from 'react-dom/client'
import pizzaData from './data'
import './index.css'

function App() {
  return <div className='container'>
    <Header />
    <Menu />
    <Footer />
  </div>
}
function Header() {
  return <header className='header'>
    <h1>Fast React Pizza Co.</h1>
  </header>
}

function Pizza({ pizzaObj }) {
  // if (pizzaObj.soldOut) return null

  return <div className={`pizza ${pizzaObj.soldOut ? 'sold-out' : ''}`} >
    <img src={pizzaObj.photoName} alt={pizzaObj.photoName}></img>
    <div>
      <h3>{pizzaObj.name}</h3>
      <p>{pizzaObj.ingredients}</p>
      <p>{pizzaObj.soldOut ? 'SOLD OUT' : pizzaObj.price}</p>
    </div>
  </div >
}

// 0 会渲染 false不会渲染
function Menu() {
  const pizzas = pizzaData
  // const pizzas = []
  const pizzasLength = pizzas.length

  return <main className='menu'>
    <h2>Our menu</h2>
    {
      pizzasLength > 0 ? (<div className='pizzas'>
        {
          pizzas.map(p => (
            <Pizza key={p.name} pizzaObj={p} />
          ))
        }
      </div>) : (<p>no pizza</p>)
    }
  </main >
}

function Footer() {
  const open = 2
  const close = 20
  const hour = new Date().getHours()
  const isOpen = hour >= open && hour <= close;
  return <footer className='footer'>
    {
      isOpen ? (<Order open={open} close={close} />) : (<p>no open</p>)
    }
  </footer >
}

function Order({ open, close }) {
  return <div className='order'>
    <p>We're currently open, Order, {open}, {close}</p>
    <button className='btn'>Order</button>
  </div>
}
const root = createRoot(document.getElementById('root'));
root.render(<App />)