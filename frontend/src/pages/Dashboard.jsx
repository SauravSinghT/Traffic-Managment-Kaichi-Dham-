import React from 'react';

function Dashboard() {

  function handleSubmit(e){
    e.preventDefault();
    const fromValue = e.target.from.value;
    const toValue = e.target.to.value;
    console.log("From:", fromValue);
    console.log("To:", toValue);
  }

  return (
    <>
      <form action="/submit" onSubmit={handleSubmit}>
    <label for="from">From: </label>
    <select required name="from" id="des_from">
      <option value="kwaram">Kwaram</option>
      <option value="ramgarh">Ramgrah</option>
      <option value="bhowali">Bhowali</option>
      <option value="kaichi">Kaichi</option>
    </select>
    <label for="to">To: </label>
    <select required name="to" id="des_to">
      <option value="kwaram">Kwaram</option>
      <option value="ramgarh">Ramgrah</option>
      <option value="bhowali">Bhowali</option>
      <option value="kaichi">Kaichi</option>
    </select>
    <br /><br />
    <button type="submit">Submit</button>
  </form>
    </>
  );
}

export default Dashboard;

