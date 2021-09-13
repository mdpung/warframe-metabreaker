import React from 'react';
import './App.css';


function App() {
  const [primaryWeaponCount, setPrimaryWeaponCount] = React.useState('N/A');
  const [secondaryWeaponCount, setSecondaryWeaponCount] = React.useState('N/A');
  const [meleeWeaponCount, setMeleeWeaponCount] = React.useState('N/A');
  const [archwingWeaponCount, setArchwingWeaponCount] = React.useState('N/A');
  const [roboticWeaponCount, setRoboticWeaponCount] = React.useState('N/A');

  const getWeaponCount = (weaponTypePath, action) => {
    fetch(weaponTypePath, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    }).then(response =>
      response.json()
    ).then(data => {
      const count = data.length;
      console.log("Fetched weapon json of length " + count);
      // setWeaponCounts({ weaponType: count });
      action(count);
    });
  }

  const getWeaponCounts = () => {
    getWeaponCount(process.env.REACT_APP_PRIMARY_JSON_PRE_STORAGE_PATH, count => setPrimaryWeaponCount(count));
    getWeaponCount(process.env.REACT_APP_SECONDARY_JSON_PRE_STORAGE_PATH, count => setSecondaryWeaponCount(count));
    getWeaponCount(process.env.REACT_APP_MELEE_JSON_PRE_STORAGE_PATH, count => setMeleeWeaponCount(count));
    getWeaponCount(process.env.REACT_APP_ARCHWING_JSON_PRE_STORAGE_PATH, count => setArchwingWeaponCount(count));
    getWeaponCount(process.env.REACT_APP_ROBOTIC_JSON_PRE_STORAGE_PATH, count => setRoboticWeaponCount(count));
  }

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={getWeaponCounts}>Get Weapon Counts</button>
        {
          <div>
            <h3>
              Primary - {primaryWeaponCount}
            </h3>
            <h3>
              Secondary - {secondaryWeaponCount}
            </h3>
            <h3>
              Melee - {meleeWeaponCount}
            </h3>
            <h3>
              Archwing - {archwingWeaponCount}
            </h3>
            <h3>
              Robotic - {roboticWeaponCount}
            </h3>
          </div>
        }
      </header>
    </div>
  );
}

export default App;