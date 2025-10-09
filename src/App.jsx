import "./App.css";
import wrapImg from "./assets/Icon wrap.png";
import axios, { Axios } from "axios";
import { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";

function App() {
  const API_URL = "https://fakestoreapi.com/products";

  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(API_URL);
      setData(response.data);
    } catch (error) {
      console.log(error);
      alert("Error fetching data");
    }
    setLoading(false);
  };

  return (
    <div className="container">
      <BrowserRouter>
        <div className="header">
          <div className="header-text-container">
            {loading && <span className="f-400 inter-f">Loading...</span>}
            <div className="our-blog-overlay">
              <small className="inter-f w-500">Our blog</small>
            </div>
            <span className="w-600 inter-f">Resources and insights</span>
            <p className="inter-f w400">
              The latest industry news, interviews, technologies, and resources.
            </p>
          </div>
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="boxs">
          {data
            .filter((item) =>
              item.title.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map((data) => (
              <div className="box" key={data.id}>
                <div className="image-container">
                  <img src={data.image} alt="" />
                </div>
                <div className="box-text-container">
                  <small className="w-600 inter-f">{data.category}</small>
                  <span className="inter-f w-600">
                    {data.title.slice(0, 50)}
                    <Link>
                      <img src={wrapImg} alt="" />
                    </Link>
                  </span>
                  <p className="inter-f w-400 ">
                    {data.description.slice(0, 50)}...
                  </p>
                </div>
                <div className="price-container">
                  <span className="w-600 inter-f">{data.price} $</span>
                </div>
              </div>
            ))}
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
