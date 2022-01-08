import SubCategories from "./SubCategories";

let idNum = 0;
const Categories = ({ data }) =>
  <ul className="list-group">
    {
      Object.entries(data).map(([key, value]) =>
        <li>
          <a className="panel-block" data-toggle="collapse" data-target={"#" + idNum}>{key}</a>
          <SubCategories data={idNum, value, incrementId} />
        </li>
      )
    }
  </ul>

const incrementId = () => {
  idNum++;
}


export default Categories;