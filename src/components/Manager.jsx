import React from 'react'
import { useRef, useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';




const Manager = () => {

    const ref = useRef()
    const passwordRef = useRef()
    const [form, setform] = useState({ site: "", username: "", password: "" })
    const [passwordArray, setpasswordArray] = useState([])

    useEffect(() => {
        let passwords = localStorage.getItem("passwords")
        if (passwords) {
            setpasswordArray(JSON.parse(passwords))
        }

    }, [])


    const copyText = (text) => {
        toast('Copied to Clipboard', {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
        navigator.clipboard.writeText(text)
    }




    const showPassword = () => {
        passwordRef.current.type = "text"
        if (ref.current.src.includes("icons/neye.svg")) {
            ref.current.src = "icons/eye.svg"
            passwordRef.current.type = "password"
        }
        else {
            ref.current.src = "icons/neye.svg"
            passwordRef.current.type = "text"
        }
    }

    const savePassword = () => {
        if (form.site.length >= 1 && form.username.length >= 1 && form.password.length >= 1) {


            setpasswordArray([...passwordArray, { ...form, id: uuidv4() }])
            localStorage.setItem("passwords", JSON.stringify([...passwordArray, { ...form, id: uuidv4() }]))
            setform({ site: "", username: "", password: "" })
            toast('Password Saved!', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
        else {
            toast('Fill all credentials');
        }

    }
    const deletePassword = (id) => {
        let c = confirm("Do you really want to delete this Password?")
        if (c) {
            setpasswordArray(passwordArray.filter(item => item.id !== id))
            localStorage.setItem("passwords", JSON.stringify(passwordArray.filter(item => item.id !== id)))
        }
        toast('Password Deleted!', {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
    }

    const editPassword = (id) => {
        console.log("edit passwword with id", id)
        setform(passwordArray.filter(i => i.id === id)[0])
        setpasswordArray(passwordArray.filter(item => item.id !== id))
    }

    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }



    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
            <div class="absolute top-0 z-[-2] h-screen w-[99vw] rotate-180 transform bg-white bg-[radial-gradient(60%_120%_at_50%_50%,transparent_0,rgba(150,255,220,0.5)_100%)]"></div>

            <div className="p-3 md:px-30 md:mycontainer min-h-[84.6vh]">
                <h1 className='text-4xl font-bold text-center'>
                    <span className='text-green-500'>&lt;</span>
                    <span>Pass</span>
                    <span className='text-green-500'>Man/&gt;</span>
                </h1>
                <p className='text-violet-300 text-lg text-center '>Secure credential storage</p>

                <div className='text-black flex flex-col  gap-8 items-center'>

                    <input value={form.site} onChange={handleChange} placeholder='Enter URL' className='bg-white rounded-full border border-green-300 w-full p-4 py-1' type="text" name='site' id='site' />
                    <div className='flex flex-col md:flex-row justify-between w-full gap-8'>
                        <input value={form.username} onChange={handleChange} placeholder='Enter Username' className='bg-white rounded-full border border-green-300 w-full p-4 py-1' type="text" name='username' id='username' />
                        <div className="relative">

                            <input ref={passwordRef} value={form.password} onChange={handleChange} placeholder='Enter Password' className='bg-white rounded-full border border-green-300 w-full p-4 py-1' type="password" name='password' id='password' />
                            <span className='absolute right-1 top-1 cursor-pointer' onClick={showPassword} >
                                <img ref={ref} className='p-1' src="icons/eye.svg" alt="eye" />
                            </span>
                        </div>
                    </div>

                    <button onClick={savePassword} className='flex justify-center items-center gap-2 bg-green-400 rounded-full px-4 border border-green-300 py-2 w-fit hover:bg-green-200'>
                        <animated-icons
                            src="https://animatedicons.co/get-icon?name=Plugin&style=minimalistic&token=c35872bb-2ea9-4cf2-857b-d402cb8bb06e"
                            trigger="hover"
                            width="23px"
                            height="23px"
                        ></animated-icons>

                        Save Password</button>
                </div>
                <div className="passwords">
                    <h2 className='font-bold text-2xl py-4'>Your Passwords</h2>
                    {passwordArray.length === 0 && <div>No Passwords Saved</div>}
                    {passwordArray.length != 0 &&
                        <table className="table-fixed w-full rounded-md overflow-hidden mb-10">
                            <thead className=' bg-green-500 text-white'>
                                <tr>
                                    <th className='py-2'>URL</th>
                                    <th className='py-2'>Username</th>
                                    <th className='py-2'>Password</th>
                                    <th className='py-2'>Actions</th>
                                </tr>
                            </thead>
                            <tbody className='bg-green-50'>
                                {passwordArray.map((item, index) => {

                                    return <tr key={index}>
                                        <td className='py-2 border border-white text-center'>
                                            <div className='flex items-center justify-center gap-5'>
                                                <span><a href={item.site} target="_blank">{item.site}</a></span>
                                                <div className='cursor-pointer' onClick={() => { copyText(item.site) }}>
                                                    <animated-icons
                                                        src="https://animatedicons.co/get-icon?name=copy&style=minimalistic&token=047dcf87-b84c-41c5-b2c6-5d33d94222ee"
                                                        trigger="hover"
                                                        width="33px"
                                                        height="33px"
                                                    ></animated-icons>
                                                </div>
                                            </div>
                                        </td>

                                        <td className='py-2 border border-white text-center'>
                                            <div className='flex items-center justify-center gap-5'>

                                                <span>{item.username}</span>
                                                <div className='cursor-pointer ' onClick={() => { copyText(item.username) }}>
                                                    <animated-icons
                                                        src="https://animatedicons.co/get-icon?name=copy&style=minimalistic&token=047dcf87-b84c-41c5-b2c6-5d33d94222ee"
                                                        trigger="hover"
                                                        width="33px"
                                                        height="33px"
                                                    ></animated-icons>
                                                </div>
                                            </div>
                                        </td>

                                        <td className='py-2 border border-white text-center justify-center '>
                                            <div className='flex items-center justify-center gap-5'>
                                                <span>{item.password}</span>
                                                <div className='cursor-pointer' onClick={() => { copyText(item.password) }}>
                                                    <animated-icons
                                                        src="https://animatedicons.co/get-icon?name=copy&style=minimalistic&token=047dcf87-b84c-41c5-b2c6-5d33d94222ee"
                                                        trigger="hover"
                                                        width="33px"
                                                        height="33px"
                                                    ></animated-icons>
                                                </div>
                                            </div>
                                        </td>

                                        <td className='py-2 border border-white text-center justify-center '>
                                            <div className='flex items-center justify-center gap-5'>
                                                <div className='cursor-pointer flex gap-5 ' >

                                                    <div onClick={() => { deletePassword(item.id) }}>
                                                        <animated-icons
                                                            src="https://animatedicons.co/get-icon?name=delete&style=minimalistic&token=c1352b7b-2e14-4124-b8fd-a064d7e44225"
                                                            trigger="hover"
                                                            width="33px"
                                                            height="33px"

                                                        ></animated-icons>
                                                    </div>

                                                    <div onClick={() => { editPassword(item.id) }}>
                                                        <animated-icons
                                                            src="https://animatedicons.co/get-icon?name=edit&style=minimalistic&token=bef79568-d828-4e67-a904-60a1bb446375"
                                                            trigger="hover"
                                                            width="33px"
                                                            height="33px"
                                                        ></animated-icons>
                                                    </div>
                                                </div>
                                            </div>




                                        </td>
                                    </tr>
                                })}

                            </tbody>
                        </table>
                    }
                </div>
            </div>
        </>
    )
}

export default Manager
