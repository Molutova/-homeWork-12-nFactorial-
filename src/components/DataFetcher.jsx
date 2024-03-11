import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";

function DataFetcher() {
  const [counter, setCounter] = useState(0);
  const [data, setData] = useState();
  const [postId, setpostId] = useState("");

  const fetchData = useCallback(() => {
    console.log("Some data", postId);
    axios
      .get(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`)
      .then((res) => setData(res.data));
  }, [postId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  console.log(data);
  return (
    <div className="column">
      <input
        type="number"
        value={postId}
        onChange={(e) => setpostId(e.target.value)}
      />
      {/* <button onClick={fetchData}>Fetch Data</button> */}
      <ul>{data && data.map((post) => <li>{post.name}</li>)}</ul>
      <button onClick={() => setCounter(counter + 1)}>Increment</button>
      {counter}
    </div>
  );
}

export default DataFetcher;
