import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/items/")
      .then(response => {
        console.log('Data received:', response.data); // Add logging
        setItems(response.data);
      })
      .catch(error => {
        console.error("Error fetching data:", error.response || error);  // Improved error logging
      });
  }, []);

  return (
    <div>
      <h1>Items</h1>
      <ul>
        {items.map(item => (
          <li key={item.id}>{item.name}: {item.description}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
