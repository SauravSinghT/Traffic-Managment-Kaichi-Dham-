import { Link } from 'react-router-dom';  

function Home() {
  return (
    <>
      <div>
      <h1>Welcome to the Home Page!</h1>
      <p>This is the main landing page of your app.</p>
      <nav>
        <Link to="/login">Login</Link> | 
        <Link to="/register">Register</Link>
      </nav>
    </div>
    </>

  );
}

export default Home;
