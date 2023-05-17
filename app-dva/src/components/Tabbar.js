import { NavLink } from "dva/router";
import style from "./Tabbar.css";
export default function Tabbar() {
  return (
    <ul className={style.tabbar_list}>
      <li className={style.tabbar_item}>
        <NavLink to="/film" activeClassName={style.active}>
          films
        </NavLink>
      </li>
      <li className={style.tabbar_item}>
        <NavLink to="/cinema" activeClassName={style.active}>
          Cinema
        </NavLink>
      </li>
      <li className={style.tabbar_item}>
        <NavLink to="/center" activeClassName={style.active}>
          Center
        </NavLink>
      </li>
    </ul>
  );
}
