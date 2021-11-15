
import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2"

function Graph() {
  const [primaryFields, setPrimaryFields] = useState({});
  const [primaryDataset, setPrimaryDataSet] = useState({});

  const [labels, setLabels] = useState(['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange']);
  const [weaponData, setWeaponData] = useState([12, 19, 3, 5, 2, 3]);
  const [activeFilter, setActiveFilter] = useState(new WeaponStatsField("Utility", "Accuracy"));

  useEffect(() => {
    // Initialize page by fetching all the stats for each weapon by type.
    // Update the state based on type everytime it fetches a weapon.
    fetchWeaponTypeDataset(
      process.env.REACT_APP_PRIMARY_JSON_PRE_STORAGE_PATH,
      process.env.REACT_APP_PRIMARY_JSON_STATS_STORAGE_BASE_PATH,
      // Unable to manipulate current state object, must copy it and then overwrite it.
      data => setPrimaryDataSet(prevFormDate => ({ ...prevFormDate, [data.name]: data.stats }))
    );
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

  // Fetch all the weapons of a type and their stats
  const fetchWeaponTypeDataset = (weaponTypePath, weaponTypeStatsPath, action) => {
    fetch(weaponTypePath, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    }).then(response =>
      response.json()
    ).then(data =>
      // Return an array of all the weapon names
      data.map(element => element.name)
    ).then(weaponNames => {
      // Iterate through each weapon name and fetch stats page corresponding to the weapon
      weaponNames.forEach(weapon => {
        // Fetch weapon stats
        fetch(weaponTypeStatsPath + weapon + "-stats.json", {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        }).then(response =>
          response.json()
        ).then(weaponStats =>
          // Call the function that will update the state with name of weapon and its corresponding stats
          action({ name: weapon, stats: weaponStats })
        );
      });
    });
  }

  const data = {
    labels: labels,
    datasets: [
      {
        label: '# of Votes',
        data: weaponData,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    indexAxis: 'y',
    // Elements options apply to all of the options unless overridden in a dataset
    // In this case, we are setting the border of each horizontal bar to be 2px wide
    elements: {
      bar: {
        borderWidth: 2,
      },
    },
    responsive: true,
    plugins: {
      legend: {
        position: 'right',
      },
      title: {
        display: true,
        text: 'Weapon statistics',
      },
    },
  };

  return (
    <div className="container">
      Dataset size: {Object.keys(primaryDataset).length}
      <br></br>
      # of Fields: {Object.keys(primaryFields).length}
      <Bar data={data} options={options} />
      <div>
        <ul></ul>
      </div>
    </div>
  )
}

class WeaponStatsField {
  constructor(category, subCategory) {
    this.category = category;
    this.subCategory = subCategory;
  }
}

export default Graph