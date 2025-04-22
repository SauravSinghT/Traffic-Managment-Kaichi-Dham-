import React from 'react';

function Dashboard() {

  function handleSubmit(e){
    e.preventDefault();
    console.log(e.target)
  }

  return (
    <>
      <form action="/submit" onSubmit={handleSubmit}>
    <label for="from">From: </label>
    <select required name="From" id="des_from">
      <option value="Kwarab">Kwarab</option>
      <option value="Ramgarh">Ramgarh</option>
      <option value="Bhowali">Bhowali</option>
      <option value="Kainchi">Kainchi</option>
    </select>
    <label for="to">To: </label>
    <select required name="To" id="des_to">
      <option value="Kwarab">Kwarab</option>
      <option value="Ramgarh">Ramgarh</option>
      <option value="Bhowali">Bhowali</option>
      <option value="Kainchi">Kainchi</option>
    </select>
    <br /><br />
    <button type="submit">Submit</button>
  </form>
    </>
  );
}

export default Dashboard;

