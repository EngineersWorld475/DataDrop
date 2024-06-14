import { Footer } from 'flowbite-react';
import React from 'react';
import { Link } from 'react-router-dom';
import {
  BsFacebook,
  BsTwitter,
  BsDribbble,
  BsGithub,
  BsWhatsapp,
  BsInstagram,
} from 'react-icons/bs';

const FooterCom = () => {
  return (
    <div>
      <Footer container className="border border-t-8 border-red-500">
        <div className="w-full max-w-7xl mx-auto">
          <div className="grid w-full justify-between sm:flex md:grid-cols-1">
            <div className="">
              <Link
                to="/"
                className="self-center whitespace-nowrap text-sm sm:text-lg font-semibold dark:text-white"
              >
                <span className="px-2 py-1 bg-gradient-to-r from-red-700 via-red-600 to-red-500 rounded-lg text-white">
                  Data
                </span>
                Drop
              </Link>
            </div>
            <div className="grid grid-cols-2 mt-2 gap-3 sm: mt-5 sm:grid sm:gap-6">
              <div>
                <Footer.Title title="ABOUT" />
                <Footer.LinkGroup col>
                  <Footer.Link
                    href="https://www.100jsprojects.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    100 JS Projects
                  </Footer.Link>
                  <Footer.Link
                    href="/about"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    DataDrop
                  </Footer.Link>
                </Footer.LinkGroup>
              </div>
              <div>
                <Footer.Title title="FOLLOW US" />
                <Footer.LinkGroup col>
                  <Footer.Link
                    href="#"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Github
                  </Footer.Link>
                  <Footer.Link
                    href="#"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Discord
                  </Footer.Link>
                </Footer.LinkGroup>
              </div>
              <div>
                <Footer.Title title="LEGAL" />
                <Footer.LinkGroup col>
                  <Footer.Link
                    href="#"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Privacy Policy
                  </Footer.Link>
                  <Footer.Link
                    href="#"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Terms &amp; Conditions
                  </Footer.Link>
                </Footer.LinkGroup>
              </div>
            </div>
          </div>
          <Footer.Divider />
          <div className="w-full sm:flex justify-between sm:items-center sm:justify-between">
            <Footer.Copyright
              href="#"
              by="DataDrop"
              year={new Date().getFullYear()}
            />
            <div className="flex gap-4">
              <Footer.Icon href="#" icon={BsFacebook} />
              <Footer.Icon href="#" icon={BsInstagram} />
              <Footer.Icon href="#" icon={BsTwitter} />
              <Footer.Icon href="#" icon={BsWhatsapp} />
              <Footer.Icon href="#" icon={BsDribbble} />
              <Footer.Icon href="#" icon={BsGithub} />
            </div>
          </div>
        </div>
      </Footer>
    </div>
  );
};

export default FooterCom;
