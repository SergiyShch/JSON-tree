import React, { useEffect, useState } from 'react';
import logo from '../logo.svg';
import './styles.css';
import file from '../sample.json';

import Item from './Item';

function App() {
  const [allOpened, setAllOpened] = useState(false);
  const [firstLevel, setFirstLevel] = useState([]);

  useEffect(() => {
    const init = Object.keys(file).map((el, ind) => ({
      id: ind,
      name: el,
      value: file[el],
      opened: false,
    }))

    setFirstLevel(init);
  }, []);

  const toggleFirstLevel = (id) => {
    let updated = [...firstLevel];
    updated[id].opened = !updated[id].opened;
    setFirstLevel(updated);
  }

  const toggleAll = () => {
    if (allOpened) {
      setFirstLevel(firstLevel.map((item) => ({ ...item, opened: false})));
    }
    setAllOpened(!allOpened);
  }

  const expand = (data, level) => {
    return Object.keys(data).map(item => (
      <Item
        key={item} 
        name={item} 
        value={data[item]} 
        expand={expand} 
        allOpened={allOpened}
      />
    ))
  }
  
  return (
    <div className="app">
      <header className="header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1 className="title">JSON tree</h1>
      </header>

      <div className="action">
        {firstLevel.find((item) => item.opened) && (
          <button className="action-btn" onClick={toggleAll}>
            <span>{!allOpened ? 'Expand all' : 'CollapseAll'}</span>
          </button>
        )}
      </div>

      <div className="main">
        <span className="bracers">{`{`}</span>
        {firstLevel && 
          firstLevel.map((item) => 
            <Item
              id={item.id}
              key={item.name}
              name={item.name}
              value={item.value}
              expand={expand}
              toggleFirstLevel={toggleFirstLevel}
              allOpened={allOpened}
            />
          )}
        <span className="bracers">{`}`}</span>
      </div>
    </div>
  );
}

export default App;
