import React from 'react';
import './App.css';


function App() {
  const [weaponCounts, setWeaponCounts] = React.useState(0);

  const getWeaponCount = (weaponType, weaponTypePath) => {
    fetch(weaponTypePath, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    }).then(function (response) {
      const json = response.json();
      console.log(json);
      const count = json.length;
      console.log("Fetched weapon json of length " + count);
      const counts = weaponCounts[weaponType] = count;
      setWeaponCounts(counts);
    });
  }

  const getWeaponCounts = () => {
    console.log("Primary stoage path: " + process.env.REACT_APP_PRIMARY_JSON_PRE_STORAGE_PATH);
    getWeaponCount('primary', process.env.REACT_APP_PRIMARY_JSON_PRE_STORAGE_PATH);
    getWeaponCount('secondary', process.env.REACT_APP_SECONDARY_JSON_PRE_STORAGE_PATH);
    getWeaponCount('melee', process.env.REACT_APP_MELEE_JSON_PRE_STORAGE_PATH);
    getWeaponCount('archwing', process.env.REACT_APP_ARCHWING_JSON_PRE_STORAGE_PATH);
    getWeaponCount('robotic', process.env.REACT_APP_ROBOTIC_JSON_PRE_STORAGE_PATH);
  }

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={getWeaponCounts}>Get Weapon Counts</button>
        {
          !weaponCounts || Object.keys(weaponCounts).length === 0
            ? <p>No results</p>
            : <div>
              {Object.entries(weaponCounts).map(([key, value]) => {
                return (
                  <h3>
                    {key} - {value}
                  </h3>
                )
              })}
            </div>
        }
      </header>
    </div>
  );
}

export default App;
