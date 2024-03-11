import React, { useState, useEffect } from "react";

/*

Разработайте компонент PostsComponent, используя кастомный хук useFetch для выполнения асинхронного запроса к API и управления состоянием загрузки.

Основные шаги:

1) Используйте кастомный хук useFetch для загрузки данных о постах с 'https://jsonplaceholder.typicode.com/posts'. Хук должен предоставлять данные о постах, состояние загрузки, сообщение об ошибке и функцию для повторной загрузки данных.
2) Отобразите заголовок "Posts".
3) Пока данные загружаются, отображайте сообщение "Loading...".
4) В случае ошибки при загрузке данных покажите соответствующее сообщение.
5) Реализуйте кнопку, которая позволяет повторно загрузить данные о постах (используйте функцию refetch из useFetch).
6) После загрузки и в случае отсутствия ошибок отобразите список постов. Для каждого поста отобразите его заголовок и текст в элементе списка (<li>).

Цель задания: Улучшить навыки работы с пользовательскими хуками, асинхронными запросами и управлением состоянием в React.


*/

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const response = await fetch(url);
      const jsonData = await response.json();
      setData(jsonData);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const refetch = () => {
    setLoading(true);
    setError(null);
    fetchData();
  };

  return { data, loading, error, refetch };
};

const PostsComponent = () => {
  const { data, loading, error, refetch } = useFetch(
    "https://jsonplaceholder.typicode.com/posts"
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!data) return null;

  return (
    <div>
      <h1>Posts</h1>
      <button onClick={refetch}>Reload</button>
      <ul>
        {data.map((post) => (
          <li key={post.id}>
            <h2>{post.title}</h2>
            <p>{post.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostsComponent;
