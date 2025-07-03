import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = (props) => {
  const [credentials, setCredentials] = useState({
    email: "", name: "", password: "", cpassword: ""
  });

  const { setIsAuthenticated } = props;
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (credentials.password !== credentials.cpassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/auth/Createuser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Name: credentials.name,
          EmailID: credentials.email,
          Password: credentials.password
        })
      });

      const json = await response.json();
      console.log(json);

      if (json.success) {
        localStorage.setItem('token', json.authToken);
        setIsAuthenticated(true);
        alert("Signup successful");
        navigate("");
      } else {
        alert("User with that email already exists!");
      }
    } catch (error) {
      alert("Signup failed. Please try again later.");
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className='mt-10 max-w-md mx-auto bg-white p-8 rounded-lg shadow-md'>
      <h2 className='text-2xl font-semibold text-center text-gray-700 mb-6'>
        Create your account and get started!
      </h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-600">
            Email address
          </label>
          <input
            type="email"
            name="email"
            id="email"
            value={credentials.email}
            onChange={onChange}
            required
            className="mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-600">
            Enter Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            value={credentials.name}
            onChange={onChange}
            required
            className="mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-gray-600">
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            value={credentials.password}
            onChange={onChange}
            required
            minLength={5}
            className="mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="cpassword" className="block text-sm font-medium text-gray-600">
            Confirm Password
          </label>
          <input
            type="password"
            name="cpassword"
            id="cpassword"
            value={credentials.cpassword}
            onChange={onChange}
            required
            className="mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition duration-300"
        >
          Submit
        </button>
      </form>

      <div className="text-center mt-4">
        <button
          type="button"
          className="text-blue-600 hover:underline text-sm"
          onClick={() => navigate('/login')}
        >
          Already have an account? Login here!
        </button>
      </div>
    </div>
  );
};

export default Signup;
