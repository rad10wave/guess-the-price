import React from "react";
import { teams } from "../constant";

export const Table: React.FC<{ rows: number[] }> = ({ rows }) => {
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