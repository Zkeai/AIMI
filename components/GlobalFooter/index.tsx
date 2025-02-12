import React from "react";

const Footer = () => {
  return (
    <div className="flex justify-between px-3 py-2">
      <div className="flex space-x-4">
        <div className="text-sm">狙击新币</div>
        <div className="text-sm">邀请返佣</div>
      </div>
      <div className="flex space-x-4">
        <div className="text-sm">使用教程</div>
        <div className="text-sm">关于AIMI</div>
        <div className="flex space-x-2">
          <span className="text-sm">推特icon</span>
          <span className="text-sm">TeleGram icon</span>
        </div>
      </div>
    </div>
  );
};

export default Footer;
