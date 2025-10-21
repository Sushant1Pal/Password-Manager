import React from 'react'

const Navbar = () => {
  return (
    <nav className='bg-slate-700 text-white '>
      <div className="mycontainer flex justify-around px-4 h-14 items-center py-6">
        <div className="logo font-bold text-2xl">
       <span className='text-green-500'>&lt;</span>
          Pass
        <span className='text-green-500'>Man/&gt;</span>
          </div>
      {/* <ul>
        <li className='flex gap-4'>
            <a className='hover:cursor-pointer hover:font-bold ' href="/">Home</a>
            <a className='hover:cursor-pointer hover:font-bold' href="#">About</a>
            <a className='hover:cursor-pointer hover:font-bold ' href="#">Contact Us</a>
        </li>
      </ul> */}
      <button className='cursor-pointer textwhite bg-green-700 px-5 rounded-2xl flex justify-center items-center ring-white ring-1'>
        <img className="py-1" src="icons/github.svg" alt="github" />
        <div className=' font-bold'>  Github</div>
      </button>
      </div>
    </nav>
  )
}

export default Navbar
