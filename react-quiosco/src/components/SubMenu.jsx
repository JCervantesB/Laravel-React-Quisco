import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const SubMenu = ({ children, to, text }) => {
  const [showChildren, setShowChildren] = useState(false);

  return (
    <div 
        onClick={() => setShowChildren(!showChildren)}
    >
      <Link to={to} className="text-lg">
        {text}
      </Link>
      {showChildren && children}
    </div>
  );
};

export default SubMenu;