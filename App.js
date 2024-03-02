// src/CustomerList.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [customers, setCustomers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
 const [searchTerm, setSearchTerm] = useState('');
 const [sortOption, setSortOption] = useState('date'); // Default sort option

  useEffect(() => {
    fetchCustomers();
  }, [currentPage, searchTerm, sortOption]);

  const fetchCustomers = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/customers?page=${currentPage}&limit=20&search=${searchTerm}&sort=${sortOption}`);
      setCustomers(response.data);
    } catch (error) {
      console.error('Error fetching customers:', error);
    }
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };
 const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };
 const handleSearch = () => {
    // Trigger search when the Search button is clicked
    fetchCustomers();
  };
 const handleSortChange = (event) => {
    setSortOption(event.target.value);
  };

  return (
    <div className="table-container">
      <h1>Customer List</h1>
	 <div className="search-sort-container">
        <div className="search-container">
          <input
            type="text"
            placeholder="Search by name or location..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <button onClick={handleSearch}>Search</button>
        </div>
        <div className="sort-container">
          <label htmlFor="sort">Sort by:</label>
          <select id="sort" value={sortOption} onChange={handleSortChange}>
            <option value="date">Date</option>
            <option value="time">Time</option>
          </select>
        </div>
      </div>

      <table className="table">
        <thead>
          <tr>
            <th>S.No</th>
            <th>Name</th>
            <th>Age</th>
            <th>Phone</th>
            <th>Location</th>
            <th>Date</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => (
            <tr key={customer.sno}>
              <td>{customer.sno}</td>
              <td>{customer.customer_name}</td>
              <td>{customer.age}</td>
              <td>{customer.phone}</td>
              <td>{customer.location}</td>
              <td>{customer.date}</td>
              <td>{customer.time}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <button onClick={handlePrevPage} disabled={currentPage === 1}>Previous Page</button>
        <button onClick={handleNextPage}>Next Page</button>
      </div>
    </div>
  );
}

export default App;
