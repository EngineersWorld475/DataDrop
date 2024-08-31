import React from 'react';

const About = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-2xl mx-auto p-3 text-center">
        <div>
          <h1 className="text-3xl font-semibold text-center my-7">
            About Data Drop
          </h1>
          <div className="text-md text-gray-500 flex flex-col gap-6">
            <p>
              DataDrop is a blog that i create to share my thoughts and ideas
              with the world. I am a software engineer that i love to write
              about my experiences and things that i have learned. I hope you
              enjoy reading my blog.
            </p>
            <p>
              In this blog, you will find weekly articles and tutorials on
              topics such as web development, software engineering and
              programming languages. I am always learning and exploring new
              technologies, so be sure to check back often for new content!
            </p>
            <p>
              We encourage you to leave comments on your posts and engage with
              other readers.You can like other people's comment and reply to
              them as well. We believe that a community of learners can help
              each other grow and improve.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
