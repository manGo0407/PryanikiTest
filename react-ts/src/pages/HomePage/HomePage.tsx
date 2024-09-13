import axios from "axios";
import { useEffect, useState } from "react";

export default function HomePage() {
  const [apiData, setApiData] = useState([]);

  const host = "https://test.v5.pryaniky.com";

  useEffect(() => {
    const getData = async () => {
      try {
        const authToken = localStorage.getItem("token");
        console.log('eto authToken v localStorage ===> ',authToken);
        const response = await axios.get(
          `${host}/ru/data/v3/testmethods/docs/userdocs/get`,
          {
            headers: {
              "x-auth": authToken, // Передаем токен в заголовке запроса
            },
          }
        );
        console.log("eto response v HomePage====>", response.data);
        // setApiData(response.data)
        console.log(apiData);

        if (response.status === 200 && response.data) {
          setApiData(response.data); // Обновляем состояние с данными для таблицы
        } else {
          console.error("Ошибка получения данных:", response.data.error_text);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);

  return <div>HomePage</div>;
}
