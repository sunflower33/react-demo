import { useCallback } from "react";
import { withRouter } from "react-router-dom";
import "../asset/index.css";
function Tabs(props) {
  const setCategory = useCallback(
    (category) => {
      props.history.push(`/hooksDemo/categoryList/${category}`);
    },
    [props]
  );
  const { data } = props;
  return (
    <ul className="tabs">
      {data?.length &&
        data.map((item) => {
          return (
            <li
              className="tab-item"
              onClick={() => setCategory(item.id)}
              key={item.id}
            >
              {item.title}
            </li>
          );
        })}
    </ul>
  );
}
export default withRouter(Tabs);
