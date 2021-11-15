import React from 'react';
import './App.scss';
import Graph from "../Graph/Graph"



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
      1``
      const count = data.length;
      console.log("Fetched weapon json of length " + count);
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
      <div className="columns">
        <div className="column is-four-fifths">
          <div className="box">
            <Graph />
          </div>
        </div>
        <div className="column">
          <nav class="panel">
            <p class="panel-heading">
              Filters
            </p>
            <div className="panel-block">
              <p class="control has-icons-left">
                <input class="input" type="text" placeholder="Search" />
                <span class="icon is-left">
                  <i class="fas fa-search" aria-hidden="true"></i>
                </span>
              </p>
            </div>
            <p class="panel-tabs">
              <a class="is-active">Primary</a>
              <a>Secondary</a>
              <a>Melee</a>
              <a>Archwing</a>
              <a>Robotic</a>
            </p>
            <aside class="menu">
              <ul className="menu-list">
                <li>
                  <a class="is-active">Utilities</a>
                  <ul>
                    <li>
                      <label class="panel-block">
                        <input type="checkbox" />
                        remember me
                      </label>
                    </li>
                    <li>
                      <label class="panel-block">
                        <input type="checkbox" />
                        remember me
                      </label>
                    </li>
                    <li>
                      <label class="panel-block">
                        <input type="checkbox" />
                        remember me
                      </label>
                    </li>
                  </ul>
                </li>
                <li><a>Auto</a></li>
                <li><a>Burst</a></li>
              </ul>
            </aside>
            <div className="panel-block">
              <button class="button is-link is-outlined is-fullwidth">
                Reset all filters
              </button>
            </div>
          </nav>
        </div>
      </div>

      <button class="button is-primary" onClick={getWeaponCounts}>Get Weapon Counts</button>
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
    </div>
  );
}

export default App;