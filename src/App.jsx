import "./App.css";
import instance from "./axios/config";

import { useState, useEffect } from "react";

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
  const handleDelete = async (item) => {
    const res = await instance.delete(`/products/${item.id}`);
    getItens();
  };

  return (
    <div className="App">
      <h1>Lista de produtos</h1>
      <ul>
        {products.map((item) => (
          <li key={item.id}>
            {item.name} - {item.price}{" "}
            <button onClick={() => handleDelete(item)}>delet</button>
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
