import { Link } from 'react-router-dom';  

function handleSubmit(e){
  e.preventDefault();
  const fromValue = e.target.from.value;
  const toValue = e.target.to.value;
  console.log("From:", fromValue);
  console.log("To:", toValue);
}
function Home() {
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
        <div className='mt-22 flex flex-col gap-5'>
          <p className='text-[1.9em] text-[#01B8DA] font-medium'>Destination:</p>
          <form action="/submit" onSubmit={handleSubmit} className='text-[1.17em] flex items-center' >
            <label for="from" className='pl-10 pr-3 text-[1.17em]'>From: </label>
            <select required name="from" id="des_from" className='w-62 border-2 bg-blue-100 border-blue-200 rounded-2xl p-2'>
              <option value="kwaram">Kwaram</option>
              <option value="ramgarh">Ramgrah</option>
              <option value="bhowali">Bhowali</option>
              <option value="kaichi">Kaichi</option>
            </select>
            <label for="to" className='pl-20 pr-3 text-[1.17em]'>To: </label>
            <select required name="to" id="des_to" className='w-62 border-2 bg-blue-100 border-blue-200 rounded-2xl p-2'>
              <option value="kwaram">Kwaram</option>
              <option value="ramgarh">Ramgrah</option>
              <option value="bhowali">Bhowali</option>
              <option value="kaichi">Kaichi</option>
            </select>
            <br /><br />
            <button type="submit" className='ml-20 border-2 bg-black text-white p-2 rounded-2xl cursor-pointer font-medium hover:border-2 hover:border-white'>Submit</button>
          </form>
        </div>
      </div>
      <div className='bg-[#171616] text-white mt-40 pr-83 pl-83 pt-45'>
        <div className='w-[850px]'>
          <p className='text-[2.4em] font-medium'>Every feature for you to assist. Try it for yourself.</p>
          <p className='text-[1.2em] text-gray-400 mt-5'>Kaichi Dham’s traffic management features include route diversions, designated parking zones, and crowd regulation by police and volunteers. Surveillance systems and public announcements help ensure smooth and safe movement of vehicles and pilgrims.</p>
        </div>
      </div>
    </div>
    </>

  );
}

export default Home;
