import React from 'react';

const ToolTitle = ({ activeSection, toolConfig }) => {
  const titles = {
    home: "Welcome to AI Image Enhancer",
    about: "About This Project",
    enhance: "AI Image Enhancer",
    remove_bg: "AI Background Removal",
    compress: "AI Image Compression",
    colorize: "AI Image Colorization",
    remove_watermark: "AI Watermark Removal"
  };

  const getTitle = () => {
    if (activeSection === "tools") return titles[toolConfig.name] || "";
    return titles[activeSection];
  };

  return <h1 className="text-5xl font-extrabold mb-6 text-gray-900">{getTitle()}</h1>;
};

export default ToolTitle;
