import "./App.css";
import instance from "./axios/config";

import { useState, useEffect } from "react";

const url = "http://localhost:3000/products";

function App() {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  const getItens = async () => {
    try {
      const res = await instance.get("/products");
      const data = res.data;
      setProducts(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getItens();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const itens = { name, price };

    try {
      const res = await instance.post("/products", {
        ...itens,
      });

      products.push(itens);
      setName("");
      setPrice("");
    } catch (error) {
      console.log(error.message);
    }
  };

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

      <div className="add-product">
        <form onSubmit={handleSubmit}>
          <label>
            Nome:
            <input
              type="text"
              value={name}
              name="name"
              onChange={(e) => setName(e.target.value)}
            />
          </label>

          <label>
            Preço:
            <input
              type="number"
              value={price}
              name="price"
              onChange={(e) => setPrice(e.target.value)}
            />
          </label>

          <input type="submit" value="Criar" />
        </form>
      </div>
    </div>
  );
}

export default App;
