const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register Controller
const register = async (req, res) => {
  try {
    console.log("hello")
    const { name, email, password } = req.body;

    // Check if user exists
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: 'User already exists' });

    // Create user
    user = new User({ name, email, password });
    await user.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Login Controller
  const login = async (req, res) => {
    
    try {
      const { email, password } = req.body;
      const admin_email = process.env.ADMIN_EMAIL;
      const admin_pass = process.env.ADMIN_PASSWORD;
      console.log(admin_email + " aaaa  " + admin_pass)
      if(email === admin_email){

        if(password===admin_pass){
          res.send({admin:"true"});
        }else{
          throw("username or password is incorrect");
        }
      }else{  
      // Validate input
      if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
      }
  
      // Find user
      const user = await User.findOne({ email });
      if (!user) {
        console.log('User not found:', email);
        return res.status(401).json({ message: 'Invalid credentials' });
      }
  
      // Debug password comparison
      console.log('Stored Hash:', user.password);
      console.log('Input Password:', password);
      
      // Check password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        console.log('Password mismatch for user:', email);
        return res.status(401).json({ message: 'Invalid credentials' });
      }
  
      // Generate token
      const token = jwt.sign({ id: user._id }, 'YOUR_SECRET_KEY', { expiresIn: '1h' });
  
      res.json({ 
        token, 
        user: { 
          id: user._id, 
          name: user.name, 
          email: user.email 
        }
      });
      }
  
    } catch (err) {
      console.error('Login Error:', err);
      res.status(500).json({ 
        message: 'Server error',
        error: err.message // Add error details
      });
    }
  };
  

module.exports={login,register}
