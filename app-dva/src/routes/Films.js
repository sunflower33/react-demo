import { useEffect } from "react";
import { films } from "../testData/films";
import axios from "axios";

export default function Films(props) {
  const filmList = films.data.films;
  useEffect(() => {
    axios.get(
      "https://m.maizuo.com/gateway?cityId=110100&pageNum=1&pageSize=10&type=1&k=7440561",
      {
        headers: {
          "X-Client-Info":
            '{"a":"3000","ch":"1002","v":"5.2.1","e":"16842207295073683521470465","bc":"110100"}',
          "X-Host": "mall.film-ticket.film.list",
        },
      }
    ).then((res) => {
      console.log(res);
    });
    // console.log(films);
  }, []);
  return (
    <div>
      {filmList.map((item) => (
        <div
          key={item.filmId}
          onClick={() => {
            props.history.push(`/detail/${item.filmId}`);
          }}
        >
          {item.name}
        </div>
      ))}
    </div>
  );
}
