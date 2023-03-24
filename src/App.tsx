import React, { ChangeEventHandler, FormEventHandler, useState } from "react";
import "./App.css";
import { Product } from "./Product";
import { products, teams } from "./constant";

const Table: React.FC<{ rows: number[] }> = ({ rows }) => {
  const columns = teams;

  const headerCells = columns.map((column, index) => {
    return <th key={index}>{column}</th>;
  });
  const rowValue = rows.map((rowData, rowIndex) => {
    return <td key={rowIndex}>{rowData}</td>;
  });
  return (
    <table>
      <thead>
        <tr>{headerCells}</tr>
      </thead>
      <tbody>
        <tr>{rowValue}</tr>
      </tbody>
    </table>
  );
};

function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalPages = products.length;
  const teamSelected = (currentIndex % 3) + 1;
  console.log({ teamSelected });
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
    let tempAccData = accuracyData;
    const actualPrice = products[currentIndex].price;
    let answer = 0;
    if (actualPrice === Number(inputValue)) {
      answer = 10;
    } else {
      const diff = (Math.abs(actualPrice - Number(inputValue)) / actualPrice) * 10;
      if (diff < 10) {
        answer = 10 - diff;
      } else {
        answer = 0;
      }
    }
    tempAccData[teamSelected - 1] += Number(answer.toFixed(2));
    setAccuracyData(tempAccData);
    alert("Correct price is: ₹" + products[currentIndex].price.toLocaleString());
    setInputValue("");
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
        key={currentIndex}
        name={products[currentIndex].name}
        image={products[currentIndex].image}
        description={products[currentIndex].description}
        price={products[currentIndex].price}
      />
      <div style={{ display: "flex", justifyContent: "center" }}>
        <button className={"btn"} onClick={goToPrevPage} disabled={currentIndex === 0}>
          Previous
        </button>
        <button className={"btn"} onClick={goToNextPage} disabled={currentIndex === totalPages - 1}>
          Next
        </button>
      </div>
      <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
        <form onSubmit={handleSubmit}>
          <label>
            Input value:
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
