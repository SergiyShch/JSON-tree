import React, { useEffect, useState } from 'react';
import './styles.css';

export default function Item({ 
  id,
  name, 
  value, 
  expand, 
  allOpened,
  toggleFirstLevel,
}) {
  const [opened, setOpened] = useState(false);

  useEffect(() => {
    setOpened(allOpened);
  }, [allOpened]);

  const valueType = typeof(value);
  const isArray = Array.isArray(value);

  let content;

  const toggleItem = () => {
    setOpened(!opened);
    if (id) {
      toggleFirstLevel(id);
    }
  };
  
  switch (valueType) {
    case 'object':
    case 'array':
      content = (
        <div className="item">

          <div className="item-inner" onClick={toggleItem}>
            {`${name}:\xa0 ${ !opened ? isArray ? "[...]" : "{...}" : '' }`}
          </div>

          {opened && (
            <div className="box">
              {isArray ? "[" : "{"}
              {expand(value)}
              {isArray ? "]" : "}"}
            </div>
          )}

        </div>
      );
      break;
    default:
      content = (
        <div className="item">

          <div className="item-inner">
            {`${name}:\xa0${value || "\"\xa0\""}`}
          </div>

        </div>
      );
  }

  return content;
}