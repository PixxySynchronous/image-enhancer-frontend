import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = (props) => {
    const [credentials, setCredentials] = useState({ email: "", password: "" });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                EmailID: credentials.email,
                Password: credentials.password
            })
        });

        const json = await response.json();
        console.log(json);

        if (json.success) {
            localStorage.setItem('token', json.authToken);
            props.setIsAuthenticated(true);
            navigate("/myimages");
        } else {
            alert("Invalid credentials");
        }
    };

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    return (
        <div className='mt-10 max-w-md mx-auto bg-white p-8 rounded-lg shadow-md'>
            <h2 className='text-2xl font-semibold text-center text-gray-700 mb-6'>
                Login to access your images!
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
                        className="mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                    <p className="text-xs text-gray-500 mt-1">
                        We'll never share your email with anyone else.
                    </p>
                </div>

                <div className="mb-6">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-600">
                        Password
                    </label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        value={credentials.password}
                        onChange={onChange}
                        className="mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition duration-300"
                >
                    Submit
                </button>

                <div className="mt-4 text-center">
                    <button
                        type="button"
                        className="text-blue-600 hover:underline text-sm"
                        onClick={() => navigate('/signup')}
                    >
                        Don’t have an account? Sign up here
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Login;
