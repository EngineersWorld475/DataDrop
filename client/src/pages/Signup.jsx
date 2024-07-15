import { Button, Label, TextInput } from 'flowbite-react';
import React from 'react';
import { Link } from 'react-router-dom';

const Signup = () => {
  return (
    <div className="min-h-screen mt-20">
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center">
        {/* left side */}
        <div className="flex-1">
          <Link
            to="/"
            className="text-sm sm:text-sl font-bold dark:text-white text-5xl"
          >
            <span className="px-2 py-1 bg-gradient-to-r from-red-700 via-red-600 to-red-500 rounded-lg text-white">
              Data
            </span>
            Drop
          </Link>
          <p className="text-sm mt-5">
            This is a blog website. You can sign up with your email and password
            or with google
          </p>
        </div>
        {/* right side */}
        <div className="flex-1">
          <form className="flex flex-col gap-4">
            <div className="">
              <Label value="Your username" />
              <TextInput type="text" placeholder="Username" id="username" />
            </div>
            <div className="">
              <Label value="Your email" />
              <TextInput
                type="text"
                placeholder="name@company.com"
                id="email"
              />
            </div>
            <div className="">
              <Label value="Your password" />
              <TextInput type="text" placeholder="Password" id="password" />
            </div>
            <Button gradientMonochrome="failure">Sign up</Button>
          </form>
          <div className="flex gap-2 text-sm mt-5">
            <span>Have an account?</span>
            <Link to={'/sign-in'} className="text-blue-500">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
