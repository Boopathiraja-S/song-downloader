import React from 'react'
import Headeimg2 from "../assets/spotify2.png"
import { FaUserCheck } from "react-icons/fa";

const Header = () => {
    return (
        <div className='bg-gray-950 text-white mb-10'>
            <div className='p-5  mx-0 md:mx-3 flex justify-between items-center'>
                <div className='flex items-center gap-2'>
                    <img src={Headeimg2} className='w-7 md:w-10' />
                    <h1 className='font-bold text-sm md:text-xl'>Spotify - Music Download</h1>
                </div>
                <div className='text-xl md:text-3xl cursor-pointer'>
                    <FaUserCheck/>
                </div>

            </div>
        </div>
    )
}

export default Header