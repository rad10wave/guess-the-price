import React, { ChangeEventHandler, FormEventHandler, useState } from "react";
import "./App.css";
import { Product } from "./Components/Product";
import { Table } from "./Components/Table";
import { products, teams } from "./constant";



function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalPages = products.length;
  const teamSelected = (currentIndex % 3) + 1;
  const [accuracyData, setAccuracyData] = useState([0.0, 0.0, 0.0]);
  const [inputValue, setInputValue] = useState("");

  const goToNextPage = () => {
    setCurrentIndex((prevIndex) => Math.min(prevIndex + 1, totalPages - 1));
  };

  const goToPrevPage = () => {
    setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    let tempAccData = [...accuracyData];
    const actualPrice = products[currentIndex].price;
    let answer = 0;

    if (actualPrice === Number(inputValue)) {
      answer = 10;
    } else {
      // calculate the difference between the input value and the actual price out of 10
      const diff = (Math.abs(actualPrice - Number(inputValue)) / actualPrice) * 10;

      // if the difference is less than 10, set the answer to 10 minus the difference otherwise, set the answer to 0
      answer = (diff < 10) ? 10 - diff : 0;
    }
    tempAccData[teamSelected - 1] = Number((tempAccData[teamSelected - 1] + answer).toFixed(2));
    setAccuracyData(tempAccData);
    alert("Correct price is: ₹" + products[currentIndex].price.toLocaleString());
    setInputValue("");
    goToNextPage();
  };


  const handleInputChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setInputValue(event.target.value);
  };

  return (
    <div className="App">
      <h3 style={{ background: teamSelected === 1 ? "#59C173A6" : teamSelected === 2 ? "#a17fe0A6" : "#b92b27A6", width: "fit-content", padding: "4px" }}>
        Team: {teams[teamSelected - 1]}
      </h3>

      <Product
        key={products[currentIndex].id}
        name={products[currentIndex].name}
        image={products[currentIndex].image}
        description={products[currentIndex].description}
        price={products[currentIndex].price}
      />

      <div style={{ display: "flex", justifyContent: "center" }}>
        <button className={"btn"} onClick={goToPrevPage} disabled={currentIndex === 0}> Previous </button>
        <button className={"btn"} onClick={goToNextPage} disabled={currentIndex === totalPages - 1}> Next </button>
      </div>

      <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
        <form onSubmit={handleSubmit}>
          <label>
            Input price: 
            <input className="label" type="text" value={inputValue} onChange={handleInputChange} />
          </label>
          <button type="submit" className={"btn"}>
            Submit
          </button>
        </form>
      </div>

      <Table rows={accuracyData} />
    </div>
  );
}

export default App;
