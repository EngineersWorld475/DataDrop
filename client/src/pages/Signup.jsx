import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import OAuth from '../components/OAuth';

const Signup = () => {
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.username || !formData.email || !formData.password) {
      setErrorMessage('Please fill out all fields');
    }
    try {
      setLoading(true);
      setErrorMessage(null);
      const res = await fetch('api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      console.log('///res', res);
      const data = await res.json();
      if (data?.success === false) {
        setErrorMessage(data?.message);
      }
      setLoading(false);
      if (res.ok) {
        navigate('/sign-in');
      }
    } catch (error) {
      setErrorMessage(err.message);
      setLoading(false);
    }
  };
  console.log(formData);
  return (
    <div className="min-h-screen mt-20">
      <div className="flex gap-7 p-3  max-w-3xl mx-auto flex-col md:flex-row md:items-center">
        {/* left side */}
        <div className="flex-1">
          <Link
            to="/"
            className="text-sm sm:text-sl font-bold dark:text-white "
          >
            <div className="text-5xl">
              <span className="px-2 py-1 bg-gradient-to-r from-red-700 via-red-600 to-red-500 rounded-lg text-white">
                Data
              </span>
              Drop
            </div>
          </Link>
          <p className="text-sm mt-5">
            This is a blog website. You can sign up with your email and password
            or with google
          </p>
        </div>
        {/* right side */}
        <div className="flex-1">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div className="">
              <Label value="Your username" />
              <TextInput
                type="text"
                placeholder="Username"
                id="username"
                onChange={handleChange}
              />
            </div>
            <div className="">
              <Label value="Your email" />
              <TextInput
                type="email"
                placeholder="name@company.com"
                id="email"
                onChange={handleChange}
              />
            </div>
            <div className="">
              <Label value="Your password" />
              <TextInput
                type="password"
                placeholder="Password"
                id="password"
                onChange={handleChange}
              />
            </div>
            <Button
              type="submit"
              gradientMonochrome="failure"
              // disabled={loading}
            >
              {loading ? (
                <>
                  <Spinner size="sm" />
                  <span className="pl-3">Loading</span>
                </>
              ) : (
                'Sign Up'
              )}
            </Button>
            <OAuth />
          </form>
          <div className="flex gap-2 text-sm mt-5">
            <span>Have an account?</span>
            <Link to={'/sign-in'} className="text-blue-500">
              Sign in
            </Link>
          </div>
          {errorMessage && (
            <Alert className="mt-5" color="failure">
              {errorMessage}
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
};

export default Signup;
