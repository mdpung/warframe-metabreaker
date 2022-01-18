import { useEffect, useState } from "react";
import { Accordion, Form, ListGroup } from "react-bootstrap";


function Filter() {
  const [activeFilters, updateActiveFilters] = useState({}); // Dictionary with Sets as values
  const [activeFilter, setActiveFilter] = useState("");
  const [primaryFields, setPrimaryFields] = useState({}); // Dictionary with objects as values. Those objects have a number as values.

  useEffect(() => {
    fetchWeaponTypeFields(
      process.env.REACT_APP_PRIMARY_JSON_ENUMERATE_STORAGE_PATH,
      data => setPrimaryFields(data)
    );
  }, []);

  const updateFilters = (list, sublist) => {
    var filters = { ...activeFilters };

    // See if list entry exists
    if (filters.hasOwnProperty(list)) {
      // We can assume a Set already exists
      // See if sublist entry exists
      // If it exists, we know we want to delete it
      if (filters[list].has(sublist)) {
        // If it's only entry, we'll delete list
        if (filters[list].size === 1) {
          delete filters[list];
          // Other values exist, so just want to remove sublist from Set
        } else {
          filters[list].delete(sublist);
        }
        // List doesn't exist, we know we want to add it
      } else {
        filters[list].add(sublist);
      }
      // List doesn't exist, create new one populated with sublist
    } else {
      const newSet = new Set();
      newSet.add(sublist);
      filters[list] = newSet;
    }

    // Update state
    updateActiveFilters(filters);
    console.log(filters);
    return true;
  }

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

  function AccordionRadioButton({ list, sublist }) {
    return (
      <ListGroup.Item>
        <div key={list}>
          <Form.Check
            label={sublist}
            type="radio"
            id={`${list}-${sublist}`}
            // The culmination of these two events actually takes quite a while.
            // Should be looked into.
            checked={activeFilter === `${list}-${sublist}`}
            onChange={event => setActiveFilter(event.target.id)}
          />
        </div>
      </ListGroup.Item>
    )
  }

  function AccordionSublistGroup({ eventKey, headerName }) {
    return (
      <Accordion.Item eventKey={eventKey}>
        <Accordion.Header>{headerName}</Accordion.Header>
        <Accordion.Body as={ListGroup} style={{ padding: 0 }}>
          {Object.keys(primaryFields[headerName]).map((field, index) => (
            <AccordionRadioButton list={headerName} sublist={field} />
          ))}
        </Accordion.Body>
      </Accordion.Item>
    )
  }

  function AccordionListGroup({ eventKey, headerName }) {
    return (
      <Form>
        <Accordion.Item eventKey={eventKey}>
          <Accordion.Header>{headerName}</Accordion.Header>
          <Accordion.Body as={ListGroup} style={{ padding: 0 }}>
            {Object.keys(primaryFields).map((field, index) => (
              <AccordionSublistGroup eventKey={`${eventKey}-${index}`} headerName={field} />
            ))}
          </Accordion.Body>
        </Accordion.Item>
      </Form>
    )
  }

  return (
    <Accordion alwaysOpen>
      <AccordionListGroup eventKey="list-0" headerName="Primary" />
      {/* <AccordionListGroup eventKey="list-1" headerName="Secondary" />
      <AccordionListGroup eventKey="list-2" headerName="Melee" />
      <AccordionListGroup eventKey="list-3" headerName="Archwing" />
      <AccordionListGroup eventKey="list-4" headerName="Robotic" /> */}
    </Accordion>
  )
}

export default Filter;