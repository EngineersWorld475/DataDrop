import { Button } from 'flowbite-react';
import React from 'react';

const CallToAction = () => {
  return (
    <div className="flex flex-col sm:flex-row p-3 border border-teal-500 justify-center item-center rounded-tl-3xl rounded-br-3xl text-center">
      {/* left side */}
      <div className="flex-1 justify-center flex flex-col">
        <h2 className="text-2xl">Want to learn more about Javascript?</h2>
        <p className="text-gray-500 my-2">
          Checkout these resources with 100 Javascript Projects
        </p>
        <Button
          gradientDuoTone="purpleToPink"
          className="rounded-tl-xl rounded-bl-none rounded-tr-none rounded-br-xl"
        >
          <a
            href="https://www.100jsprojects.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            100 Javascript Projects
          </a>
        </Button>
      </div>

      {/* right side */}
      <div className="p-7 flex-1">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/8/8a/Javascript.jpg"
          alt=""
        />
      </div>
    </div>
  );
};

export default CallToAction;
