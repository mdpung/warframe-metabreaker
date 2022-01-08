const SubCategories = ({ id, data, incrementId }) =>
  <ul id={id} className="sub-category collapse">
    {
      Object.keys(data).map(subCategory =>
        <li>
          <label className="panel-block">
            <input type="checkbox" />
            {subCategory}
          </label>
        </li>
      )
    }
  </ul>

export default SubCategories;