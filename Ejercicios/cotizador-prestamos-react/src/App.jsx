import { useState } from 'react'
import './App.css'
import Header from './components/Header'

function App () {
  const [cantidad, setCantidad] = useState(10000)
  const MIN = 0
  const MAX = 20000
  const STEP = 100

  function handleChange (e) {
    setCantidad(+e.target.value)
  }

  function handleClickDecremento () {
    const valor = cantidad - STEP
    setCantidad(valor)
  }

  return (
    <>
      <div className='my-20 max-w-lg mx-auto bg-white shadow p-10'>
        <Header />

        <div className='flex justify-between my-6'>
          <button
            type='button'
            className='h-10 w-10 flex items-center justify-center font-bold text-white
            text-2xl bg-lime-500 rounded-full hover:outline-none hover:ring-2
          hover:ring-offset-2 hover:ring-lime-500'
            onClick={handleClickDecremento}
          >-
          </button>
          <button
            type='button'
            className='h-10 w-10 flex items-center justify-center font-bold text-white
            text-2xl bg-lime-500 rounded-full hover:outline-none hover:ring-2
          hover:ring-offset-2 hover:ring-lime-500'
          >+
          </button>
        </div>

        <input
          className='w-full h-6 bg-gray-200 accent-lime-500 hover:accent-lime-600'
          type='range'
          onChange={handleChange}
          min={MIN}
          max={MAX}
          step={STEP}
          value={cantidad}
        />

        <p className='text-center my-10 text-5xl font-extrabold text-indigo-600'>{cantidad}</p>
      </div>
    </>

  )
}

export default App
