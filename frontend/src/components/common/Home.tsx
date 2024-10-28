import React, { useState } from 'react'
import { Button } from '../ui/button'
import { Video } from 'lucide-react'
import { Input } from '../ui/input'
import { useNavigate } from 'react-router-dom'

const Home = () => {
    const [channelName, setChannelName] = useState<string>('');
    const navigate = useNavigate();
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setChannelName(e.target.value);
    }

    const handleJoinRoom = () => {
        console.log(channelName);
        navigate(`/conference/${channelName}`);
    }
  return (
    <div className='min-h-[calc(100vh-90px)] flex items-center'>
        <div className='w-full flex px-40 items-center justify-between'>
            <div className='w-1/2 flex flex-col gap-y-3'>
                <h1 className='text-5xl font-semibold'>Video calls and meetings for everyone</h1>
                <p className='text-2xl'>Connect, collaborate and celebrate from anywhere with VirtualConnect</p>
                <div className='flex mt-4 justify-between'>
                    <Button className='flex items-center text-lg py-6'>
                        <Video />
                        <p>New Meeting</p>
                    </Button>
                    <div className='flex gap-x-2'>
                        <Input onChange={handleChange} placeholder='Enter Room ID' className='py-6 px-3 w-[280px]'/>
                        <Button onClick={handleJoinRoom} variant={"destructive"} className='px-10 py-6 text-lg'>Join</Button>
                    </div>
                </div>
                <div className='h-[1px] bg-gray-700 w-full mt-10'></div>
            </div>
            <div>
                <img src='https://www.gstatic.com/meet/user_edu_get_a_link_light_90698cd7b4ca04d3005c962a3756c42d.svg' alt='Virtual Connect' width={400} />
            </div>
        </div>
        
    </div>
  )
}

export default Home