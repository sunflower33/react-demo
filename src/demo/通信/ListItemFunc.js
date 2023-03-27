export default function ListItem(props) {
  return (
    <ul>
      {props.list.map((item, index) => (
        <li key={item.id}>
          <input
            type="checkbox"
            checked={item.checked}
            onChange={() => props.checkHandler(index)}
          />
          <span style={{ textDecoration: item.checked ? "line-through" : "" }}>
            {item.text}
          </span>
          <button onClick={props.deleteHandler.bind(this, index)}>
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}
