import React from 'react';
import { Link } from 'react-router-dom';

const tools = [
  { name: 'enhance', label: 'Enhance Image', params: {} },
  { name: 'remove_bg', label: 'Remove Background', params: { bg: 'white' } },
  { name: 'compress', label: 'Compress Image', params: { compression_level: 75 } },
  { name: 'colorize', label: 'Colorize Image', params: {} },
  { name: 'remove_watermark', label: 'Remove Watermark', params: { auto: true } },
];

const HomeButtons = ({ setActiveSection, setToolConfig }) => {
  return (
    <div className="px-4 py-10 max-w-6xl mx-auto">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <p className="text-lg text-gray-700 leading-relaxed max-w-3xl mx-auto">
          Unlock the full potential of your photos with our suite of AI-powered tools — enhance details, remove backgrounds, compress large files, colorize black & white images, or erase unwanted watermarks. Log in to save your results and access them anytime.
        </p>
        <Link to="/login">
          <div className="mt-6 inline-block bg-blue-600 text-white px-6 py-3 rounded-full shadow-md hover:bg-blue-700 transition font-medium">
            Log in or sign up to save your enhanced images
          </div>
        </Link>
      </div>

      {/* Tool Cards */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {tools.map((tool) => (
          <button
            key={tool.name}
            onClick={() => {
              setActiveSection('tools');
              setToolConfig({ name: tool.name, params: tool.params });
            }}
            className="bg-white rounded-2xl shadow-md p-6 text-left hover:shadow-xl border border-gray-100 transition"
          >
            <h2 className="text-xl font-semibold text-gray-900">{tool.label}</h2>
          </button>
        ))}
      </div>
    </div>
  );
};

export default HomeButtons;
