import { Link } from 'react-router-dom';
import axios from 'axios';  
import GraphSVG from '../components/Graph';
import { useState } from 'react';


function Home() {
  const [route,setRoute] = useState([]);
  async function handleSubmit(e){
    e.preventDefault();
    const fromValue = e.target.from.value;
    const toValue = e.target.to.value;
      try {
        const response = await axios.post('http://localhost:5000/api/auth/getroute', {To:toValue,From:fromValue});
        const data = await response.data;
        console.log(data.route);
        setRoute(data.route);
      } catch (err) {
        console.log(err)
        console.log(err.response?.data?.message || 'Login failed');
      }
  }
  return (
    <>
    <div>
      <div className='mr-78 ml-78 mt-7 p-5 flex-col justify-center items-center'>
        <nav className='flex justify-between items-center'>
          <div className='flex items-center gap-15'>
          <img src='/logo.png' className='h-16 w' ></img>
          <ul className='flex gap-8'>
            <li className='text-gray-600 font-medium cursor-pointer'>Features</li>
            <li className='text-gray-600 font-medium cursor-pointer'>Search</li>
            <li className='text-gray-600 font-medium cursor-pointer'>Reviews</li>
            <li className='text-gray-600 font-medium cursor-pointer'>FAQ's</li>
          </ul>
          </div>
          <ul className='flex gap-6'>
          <Link to="/login" ><button className='text-gray-600 font-medium cursor-pointer bg-white  text-black border-2 border-gray-600 pr-2 pl-2 pt-1 pb-1 rounded-[5px]'>Login</button></Link> 
          <Link to="/register" ><button className='text-gray-600 font-medium cursor-pointer  bg-black border-2 border-black text-white pr-2 pl-2 pt-1 pb-1 rounded-[5px]'>Register</button></Link>
          </ul>
        </nav>
        <div className='mt-32 flex items-center gap-25'>
          <div className='flex flex-col gap-5 '>
          <h1 className='text-[2.7em] font-medium '>Traffic Managment For Kaichi Dham</h1>
          <p className='text-[1.2em] text-gray-700'>Kaichi Dham experiences heavy traffic during peak seasons, managed through route diversions, designated parking, and crowd control by police and volunteers. Authorities also use signboards, surveillance, and public announcements to ensure smooth and safe movement.</p>
          </div>
          <div>
          <img src='/logo.png'  ></img>
          </div>
        </div>
        <div className='flex gap-5 mt-14'>
        <Link to="/register" ><button className='text-gray-600 font-medium cursor-pointer  bg-black border-2 border-black text-white pr-3 pl-3 pt-2 pb-2 rounded-[5px]'>Register</button></Link>
        <a href="https://www.youtube.com/watch?v=iHzzSao6ypE" target='_blank'><button className='text-gray-600 font-medium cursor-pointer bg-white  text-black border-2 border-gray-600 pr-3 pl-3 pt-2 pb-2 rounded-[5px] flex gap-2 items-center'><i class="fa-solid fa-circle-play" ></i>Live Demo</button></a> 
        </div>
        <div className='mt-22 flex flex-col gap-5'>
          <p className='text-[1.9em] font-medium'>Destination:</p>
          <form action="/submit" onSubmit={handleSubmit} className='text-[1.17em] flex items-center' >
            <label htmlFor="from" className='pl-10 pr-3 text-[1.17em]'>From: </label>
            <select required name="from" id="des_from" className='w-62 border-2 bg-blue-100 border-blue-200 rounded-2xl p-2'>
              <option value="Kwarab">Kwarab</option>
              <option value="Ramgarh">Ramgrah</option>
              <option value="Bhowali">Bhowali</option>
              <option value="Kainchi">Kainchi</option>
            </select>
            <label for="to" className='pl-20 pr-3 text-[1.17em]'>To: </label>
            <select required name="to" id="des_to" className='w-62 border-2 bg-blue-100 border-blue-200 rounded-2xl p-2'>
              <option value="Kwarab">Kwarab</option>
              <option value="Ramgarh">Ramgrah</option>
              <option value="Bhowali">Bhowali</option>
              <option value="Kainchi">Kainchi</option>
            </select>
            <br /><br />
            <button type="submit" className='ml-20 border-2 bg-black text-white p-2 rounded-2xl cursor-pointer font-medium hover:border-2 hover:border-white'>Submit</button>
          </form>
          <GraphSVG route={route}/>
        </div>
      </div>
      <div className='bg-[#171616] text-white mt-20 pr-83 pl-83 pt-30 pb-20'>
        <div className='w-[850px]'>
          <p className='text-[2.4em] font-medium'>Every feature for you to assist. Try it for yourself.</p>
          <p className='text-[1.2em] text-gray-400 mt-5'>Kaichi Dham’s traffic management features include route diversions, designated parking zones, and crowd regulation by police and volunteers. Surveillance systems and public announcements help ensure smooth and safe movement of vehicles and pilgrims.</p>
        </div>
        <div className='flex flex-col gap-10 mt-10'>
          <div className='w-[600px] cursor-pointer  bg-[#262626] pr-10 pl-10 pt-6 pb-6 rounded-3xl flex flex-col items-start-start gap-4'>
            <button className='bg-gray-700 text-gray-50 p-2 text-2xl rounded-2xl w-13 h-15'><i class="fa-solid fa-route"></i></button>
            <p className='text-[1.4em] font-bold'>Route Diversion</p>
            <p className='text-gray-400'>Route diversions at Kaichi Dham are implemented during peak periods to ease congestion and manage heavy traffic flow. Alternate paths are designated to streamline vehicle movement and reduce crowding near the temple premises.</p>
          </div>
          <div className='w-[600px] cursor-pointer hover:bg-[#262626] bg-[#1a1919] pr-10 pl-10 pt-6 pb-6 rounded-3xl flex flex-col items-start-start gap-4'>
            <button className='bg-gray-700 text-gray-50 p-2 text-2xl rounded-2xl w-13 h-15'><i class="fa-solid fa-bars-progress"></i></button>
            <p className='text-[1.4em] font-bold'>Predicting Congestion</p>
            <p className='text-gray-400'>Predicting congestion at Kaichi Dham is done using crowd estimates, past data, and real-time monitoring. This helps authorities take timely action like rerouting traffic and deploying extra personnel.</p>
          </div>
          <div className='w-[600px] cursor-pointer hover:bg-[#262626] bg-[#1a1919] pr-10 pl-10 pt-6 pb-6 rounded-3xl flex flex-col items-start-start gap-4'>
            <button className='bg-gray-700 text-gray-50 p-2 text-2xl rounded-2xl w-13 h-15'><i class="fa-solid fa-gears"></i></button>
            <p className='text-[1.4em] font-bold'>Algorithms Used</p>
            <p className='text-gray-400'>Our system uses algorithms like Dijkstra to find the shortest and fastest routes during high traffic, ensuring smooth navigation. Additionally, K-Nearest Neighbors (KNN) helps analyze patterns from past data to predict congestion and suggest optimal travel times.</p>
          </div>
          <div className='w-[600px] cursor-pointer hover:bg-[#262626] bg-[#1a1919] pr-10 pl-10 pt-6 pb-6 rounded-3xl flex flex-col items-start-start gap-4'>
            <button className='bg-gray-700 text-gray-50 p-2 text-2xl rounded-2xl w-13 h-15'><i class="fa-solid fa-scale-balanced"></i></button>
            <p className='text-[1.4em] font-bold'>Crowd Regulations</p>
            <p className='text-gray-400'>Crowd regulation at Kaichi Dham is managed through coordinated efforts by police, volunteers, and smart monitoring systems. Barricades, timed entry, and guided pathways help maintain order and ensure visitor safety during peak hours.</p>
          </div>
        </div>
      </div>
      <div className='flex flex-col justify-center items-center w-full pb-20'>
        <div className='mr-78 ml-78 mt-7 p-5 w-200 flex flex-col items-center justify-center'>
          <p className='text-4xl flex justify-center font-semibold mt-15'>Now is the time to use this feature.</p>
          <p className='text-center mt-5 text-[1.1em] text-gray-800'>Experience a smoother visit to Kaichi Dham with our website’s smart features—get live traffic updates, route suggestions, and parking info in one place. Plan ahead and enjoy a hassle-free spiritual journey!</p>
        </div>
        <div className='mr-78 ml-78 mt-7 p-5 flex flex-wrap justify-center gap-10'>
          <div className='w-80 border-2 border-gray-800 p-2 rounded-2xl'>
            <p className='text-gray-600 text-[1.2em]'><i class="fa-solid fa-scale-balanced"></i></p>
            <p className='text-[1.2em] font-semibold'>Load Balancer</p>
            <p className='text-gray-700'>Ensures efficient traffic distribution across servers to prevent overload and maintain performance.</p>
          </div>
          <div className='w-80 border-2 border-gray-800 p-2 rounded-2xl'>
            <p className='text-gray-600 text-[1.2em]'><i class="fa-solid fa-bars-progress"></i></p>
            <p className='text-[1.2em] font-semibold'>Predicting Congestion</p>
            <p className='text-gray-700'>Congestion is predicted based on past data, special events, and real-time surveillance inputs.</p>
          </div>
          <div className='w-80 border-2 border-gray-800 p-2 rounded-2xl'>
            <p className='text-gray-600 text-[1.2em]'><i class="fa-solid fa-location-dot"></i></p>
            <p className='text-[1.2em] font-semibold'>Predefined Designation</p>
            <p className='text-gray-700'>Specific parking zones and pedestrian routes are predefined to guide visitors seamlessly.</p>
          </div>
          <div className='w-80 border-2 border-gray-800 p-2 rounded-2xl'>
            <p className='text-gray-600 text-[1.2em]'><i class="fa-solid fa-bars-progress"></i></p>
            <p className='text-[1.2em] font-semibold'>Crowd Regulations</p>
            <p className='text-gray-700'>Authorities and volunteers manage crowd flow with barricades, signboards, and timed entry systems.</p>
          </div>
          <div className='w-80 border-2 border-gray-800 p-2 rounded-2xl'>
            <p className='text-gray-600 text-[1.2em]'><i class="fa-solid fa-gears"></i></p>
            <p  className='text-[1.2em] font-semibold'>Algorithm Used</p>
            <p className='text-gray-700'> Algorithms like Dijkstra for shortest path and KNN for pattern recognition optimize traffic decisions.</p>
          </div>
          <div className='w-80 border-2 border-gray-800 p-2 rounded-2xl'>
            <p className='text-gray-600 text-[1.2em]'><i class="fa-solid fa-pen-ruler"></i></p>
            <p className='text-[1.2em] font-semibold'>Design</p>
            <p className='text-gray-700'>Powered by smart tech and thoughtful design, our system brings peace to your journey, just like Kaichi Dham itself. </p>
          </div>
        </div>
      </div>
      <div className='bg-[#171616] flex flex-col items-center justify-center pt-20 pb-20 gap-5'>
        <p className='text-white text-4xl font-medium'>Get in touch and start today.</p>
        <p className='w-200 text-center text-gray-300'>Create your free account today to get real-time traffic updates, personalized route suggestions, and priority alerts for Kaichi Dham visits. Stay ahead of congestion and enjoy a smooth, peaceful experience every time. Your journey, just smarter!</p>
        <Link to="/register" ><button className='text-black font-medium cursor-pointer  bg-white border-2 border-white pr-3 pl-3 pt-2 pb-2 rounded-[5px]'>Register</button></Link>
      </div>
      <div className='mr-78 ml-78 mt-7 p-5 flex flex-wrap justify-start'>
        <div className='flex flex-col'>
          <p className='text-3xl font-medium '>Frequently asked questions</p>
          <p className='text-gray-700 font-medium mt-1'>If you have anything else you want to ask, <span className='underline'>reach out to us.</span></p>
        </div>
        <div>
          <p>What is the purpose of this website?</p>
          <p>Our website is designed to provide real-time traffic updates, route suggestions, parking information, and crowd alerts for visitors traveling to Kaichi Dham.</p>
        </div>
        <div>
          <p>Do I need to create an account to use the features?</p>
          <p>While basic traffic info is available to all, creating an account gives you access to personalized routes, saved preferences, and real-time notifications.</p>
        </div>
        <div>
          <p>Is this website affiliated with Kaichi Dham or the local authorities?</p>
          <p>We work independently but use data and insights from public sources to support a smoother and safer experience for pilgrims.</p>
        </div>
        <div>
          <p> What are the benefits of using this website?</p>
          <p>You get smarter travel planning, reduced waiting time, safe parking zones, and up-to-date info to help you avoid traffic and crowds.</p>
        </div>
        <div>
          <p>Is my personal data safe on this platform?</p>
          <p>Yes, we follow strict data privacy practices and only use your information to improve your experience—nothing is shared without consent.</p>
        </div>
        <div>
          <p>Are there any charges for using this website?</p>
          <p>No, all our core features are completely free for users.</p>
        </div>
      </div>
    </div>
    </>

  );
}

export default Home;
