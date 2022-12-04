import "./App.css";

import { useState, useEffect } from "react";

const url = "http://localhost:3000/products";

function App() {
  const [products, setProducts] = useState([]);

  const fetchData = async () => {
    const res = await fetch(url);

    const data = await res.json();

    setProducts(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="App">
      <h1>Lista de produtos</h1>
      <ul>
        {products.map((item) => (
          <li key={item.id}>
            {item.name} - {item.price}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
