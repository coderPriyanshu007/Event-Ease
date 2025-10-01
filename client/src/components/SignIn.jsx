import { useState } from 'react';


const SignIn = ({login,loading}) => {
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  const handleSubmit = async (e) => {
    e.preventDefault();
      login(email,password);
    
  } 

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-sm md:text-base">
      <input
        type="email"
        placeholder="Email"
        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button
      type='submit'
        
        className="w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition duration-200"
        disabled={loading}
      >
        Sign In
      </button>
    </form>
  );
};

export default SignIn;
