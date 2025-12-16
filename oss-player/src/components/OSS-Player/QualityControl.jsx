import React, { useState } from 'react';
import { usePlayer } from './hooks';
import { MdHighQuality } from "react-icons/md"; // Ícone HD

export const QualityControl = () => {
  const { qualities, currentQuality, handleChangeQuality } = usePlayer();
  const [showMenu, setShowMenu] = useState(false);

  if (!qualities || qualities.length <= 1) return null;

  const toggleMenu = () => setShowMenu(!showMenu);

  const handleSelect = (qualityObj) => {
    handleChangeQuality(qualityObj);
    setShowMenu(false);
  };

  return (
    <div className="quality-control-wrapper" style={{ position: 'relative', marginRight: '8px' }}>
      {showMenu && (
        <ul className="speed-menu">
          {qualities.map((q) => (
            <li 
              key={q.label} 
              onClick={() => handleSelect(q)}
              className={currentQuality?.label === q.label ? 'active' : ''}
            >
              {q.label}
            </li>
          ))}
        </ul>
      )}

      <button onClick={toggleMenu} title="Qualidade" className="quality-button">
        <MdHighQuality size={20} />
      </button>
    </div>
  );
};