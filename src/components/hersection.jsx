import React from 'react';
import Building from '../assets/building.png';
import Dashboard from './Dashboard';

const HeroSection = () => {
    return (
        <div>
            <div className='flex bg-gradient-to-r from-[#edcb8b] to-white h-[600px]'>
            <div className='flex-1 flex items-center justify-center p-4'>
                <p className='text-black font-bold text-[72px] ml-[100px]'>
                    TRACK YOUR PROGRESS
                </p>
            </div>
            <div className='flex-1 flex items-center justify-center overflow-hidden '>
                <img
                    src={Building}
                    alt='Hero Image'
                    className='transform scale-150  h-auto object-cover'
                />
            </div>
           
        </div>
        <Dashboard/>
        <div className=' h-900px'>

        </div>
       
        </div>
    );
}

export default HeroSection;
