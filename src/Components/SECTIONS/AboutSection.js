import React from 'react';

const AboutSection = () => (
  <div className="bg-white shadow-xl rounded-xl p-8 text-left text-gray-700 border-l-4 border-indigo-600">
    <h2 className="text-3xl font-semibold text-indigo-600 mb-4">About Us</h2>
    <p className="text-base leading-relaxed">
      This website is a <strong>Summer Project</strong> developed using <strong>React.js</strong> and <strong>Tailwind CSS</strong>. 
      It utilizes AI-powered APIs to offer a suite of tools for enhancing, compressing, colorizing, and editing images directly from your browser.
    </p>
    <p className="mt-4">
      Our mission is to simplify advanced image editing through a clean interface and smart automation — no software installation required.
    </p>
    <p className="mt-4 text-sm italic text-gray-500">
      — Created with passion by @PixxySynchronous
    </p>
  </div>
);

export default AboutSection;
