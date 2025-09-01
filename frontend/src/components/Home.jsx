import React from 'react'
import { Link } from 'react-router-dom'
import profile from '../assets/images/Profile.png'
import heart from '../assets/images/heart_plus.png'
import chat from '../assets/images/chat.png'
import share from '../assets/images/arrow_outward.png'
import add from '../assets/images/group_add.png'
import notif from '../assets/images/Requests.png'
const chatUsers = [
  {
    username: "Sai Raghavendra",
    message: "5 new messages"
  },
  {
    username: "Haswanthchh",
    message: "okayy"
  },
  {
    username: "User3",
    message: "Hello"
  },
  {
    username: "User4",
    message: "Yesss!!!"
  }
];
const Home = () => {
  return (
    <div className="body-section bg-[#D9D9D9] w-full ">
        <div className="HeroSection flex items-center w-full h-full p-10 justify-between ">
            <div className="left-hero bg-white w-[20rem] p-3 rounded-xl">
                <ul className='navigation-links flex flex-col gap-3'>
                    <li className='bg-[#D9D9D9] px-10 py-2 rounded-md'><Link to='/' className='w-full block'>Home</Link></li>
                    <li className='bg-[#D9D9D9] px-10 py-2 rounded-md'><Link to='/explore' className='w-full block'>Explore</Link></li>
                    <li className='bg-[#D9D9D9] px-10 py-2 rounded-md'><Link to='/notifications' className='w-full block'>Notifications</Link></li>
                    <li className='bg-[#D9D9D9] px-10 py-2 rounded-md'><Link to='/messaging' className='w-full block'>Messages</Link></li>
                    <li className='bg-[#D9D9D9] px-10 py-2 rounded-md'><Link to='/saved' className='w-full block'>Saved</Link></li>
                    <li className='bg-[#D9D9D9] px-10 py-2 rounded-md'><Link to='/job-postings' className='w-full block'>Job Postings</Link></li>
                    <li className='bg-[#D9D9D9] px-10 py-2 rounded-md'><Link to='/my-network' className='w-full block'>My Network</Link></li>
                    <li className='bg-[#D9D9D9] px-10 py-2 rounded-md'><Link to='/settings' className='w-full block'>Settings</Link></li>
                </ul>
            </div>
            <div className="middle-hero w-2xl flex flex-col gap-5 mx-7">
                <div className="post-creation w-full flex items-center bg-white justify-between p-3 rounded-xl">
                    <div className="profile-post flex items-center gap-5 ">
                        <div className="pfp bg-[#D9D9D9] rounded-full w-12 h-12">
                            <img src={profile} className=''></img>
                        </div>
                        <p className='text-gray-400'>What you looking at nigga?</p>
                    </div>
                    <button className='bg-[#D9D9D9] px-4 py-2 rounded-3xl cursor-pointer'>Post</button>
                </div>
                <div className="posts max-w-2xl bg-white p-6 flex flex-col gap-5">
                    <div className='user-info flex items-center gap-3'>
                        <div className="profileContainer w-12 h-12 bg-[#D9D9D9] rounded-full"></div>
                        <div className="user-det">
                            <h2 className='font-medium'>HashNigga</h2>
                            <p className='text-sm text-gray-400'>Getting job in 2025</p>
                        </div>
                    </div>
                    <div className="post-desc p-2 text-justify flex flex-col gap-5">
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi eos possimus, illo nobis beatae saepe, sapiente blanditiis enim laborum non ut necessitatibus a quam corrupti, animi numquam! Natus, laboriosam sapiente.
                        </p>
                        <div className="post-img w-full h-100 bg-[#D9D9D9]">
                        </div>
                    </div>
                    <div className="actions flex justify-between p-2">
                        <div className="post-interact flex gap-3">
                            <img src={heart}></img>
                            <img src={chat}></img>
                            <img src={share}></img>
                        </div>
                        <img src={add}></img>
                    </div>
                </div>
            </div>
            <div className="right-hero w-[20rem] flex flex-col justify-between h-[100vh] ">
                <div className="messages p-6 bg-white w-full rounded-xl flex flex-col gap-4">
                    <div className="notif text-xl font-semibold flex justify-between">
                        <p>Messages</p>
                        <img src={notif} className='w-6 h-6'></img>
                    </div>
                    <div className="search w-[17.3rem] h-10 bg-[#D9D9D9] rounded-3xl flex items-center p-5">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 text-gray-600 "
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M21 21l-4.35-4.35M17 10a7 7 0 11-14 0 7 7 0 0114 0z"
                            />
                        </svg>
                        <input type='search' className='w-full h-full p-3 text-[1rem] focus:outline-none focus:ring-0 focus:border-none' placeholder='Type something nigga'></input>
                    </div>
                    <div className="message-type flex justify-between">
                        <button>Primary</button>
                        <button>Groups</button>
                        <button>Friends</button>
                    </div>
                    <div className="users flex flex-col gap-3">
                        {
                            chatUsers.map((user,idx)=>{
                                return (
                                <div className={`${idx} bg-[#D9D9D9] p-3 rounded-xl flex gap-2`}>
                                    <div className="img-container w-10 h-10 rounded-full bg-white"></div>
                                    <div className="det">
                                        <p className='userName text-[1.1rem] font-medium'>{user.username}</p>
                                        <p className='text-sm text-gray-500'>{user.message}</p>
                                    </div>
                                </div>
                            )
                            })
                        }
                    </div>
                </div>
                <div className="trending p-6 bg-white w-full rounded-xl flex flex-col gap-4">
                    <h2 className='text-lg font-semibold'>Trending</h2>
                    
                </div>
            </div>
        </div>
    </div>
  )
}

export default Home