import { useEffect, useState } from "react";
import Categories from "./Categories/Categories";


function Filter() {

  const [primaryFields, setPrimaryFields] = useState({});

  useEffect(() => {
    fetchWeaponTypeFields(
      process.env.REACT_APP_PRIMARY_JSON_ENUMERATE_STORAGE_PATH,
      data => setPrimaryFields(data)
    );
  }, []);

  // Fetch the enumerated statistic fields for a weapon type
  const fetchWeaponTypeFields = (weaponTypePath, action) => {
    fetch(weaponTypePath, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    }).then(response =>
      response.json()
    ).then(data => {
      action(data)
    })
  }

  return (
    <div>
      <nav className="panel">
        <p className="panel-heading">
          Filters
        </p>
        <div className="panel-block">
          <p className="control has-icons-left">
            <input className="input" type="text" placeholder="Search" />
            <span className="icon is-left">
              <i className="fas fa-search" aria-hidden="true"></i>
            </span>
          </p>
        </div>
        <p className="panel-tabs">
          <a className="is-active">Primary</a>
          <a>Secondary</a>
          <a>Melee</a>
          <a>Archwing</a>
          <a>Robotic</a>
        </p>
        <aside className="menu filter-panel">
          <Categories data={primaryFields} />
        </aside>
        <div className="panel-block">
          <button className="button is-link is-outlined is-fullwidth">
            Reset all filters
          </button>
        </div>
      </nav>
    </div>
  )
}

export default Filter;