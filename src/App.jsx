import { useState, useCallback, useEffect, useRef } from 'react'


function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  //useRef hook
  const passwordref = useRef(null)

  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (numberAllowed) str += "0123456789"
    if (charAllowed) str += "!@#$%^&*-_+=[]{}~`"

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
      
    }

    setPassword(pass)


  }, [length, numberAllowed, charAllowed, setPassword])

  useEffect(() => {
    passwordGenerator()
  },[length, numberAllowed,charAllowed,passwordGenerator])

  const copytoclipboard = useCallback(() => {
    passwordref.current?.select();
    passwordref.current?.setSelectionRange(0,100);
    window.navigator.clipboard.writeText(password)
  },[password])

  return (
    <>
      <div className='w-full  max-w-md mx-auto shadow-md rounded-lg p-2 my-8 text-orange-500 bg-grey-700 bg-slate-600'>
        <h1 className='text-white text-center py-1'>Password Generator</h1>
        <div className=' flex flex-shadow rounded-lg overflow-hidden mb-4'>
          <input type="text" value={password} className='outline-none w-full py-1 px-3' placeholder='password' ref={passwordref} readOnly />

          <button className='bg-blue-700 w-20 outline-none p-1 hover:bg-sky-700 '
          onClick={copytoclipboard}> copy</button>
        </div>
        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input type="range"
            min={4}
            max={100}
            value={length}
            className='cursor-pointer' 
            onChange={(e)=> {setLength(e.target.value)}}/>
            <label htmlFor="">Length {length}</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input className='cursor-pointer' type="checkbox"
            defaultChecked={numberAllowed}
            onChange={()=> {
              setNumberAllowed((prev)=> !prev);
            }}
             /> 
             <label htmlFor="numberinput">Number</label>
            <input className='cursor-pointer' type="checkbox"
            defaultChecked={charAllowed}
            onChange={()=> {
              setCharAllowed((prev)=> !prev);
            }}
             /> 
             <label htmlFor="numberinput">Character</label>
             </div>
        </div>
      </div>
    </>
  )
}

export default App
