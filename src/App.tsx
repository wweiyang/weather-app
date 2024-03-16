import React from "react";

function App() {
  return (
    <div>
      <h1>Today's Weather</h1>
      <form>
        <label htmlFor="city">City:</label>
        <input type="text" id="city" placeholder="Input 1" />
        <label htmlFor="country">Country:</label>
        <input type="text" id="country" placeholder="Input 2" />
        <button type="submit">Submit</button>
        <button type="button">Clear</button>
      </form>
      <div>
        <p>location placeholder</p>
        <p>title placeholder</p>
        <div>
          <p>Description:</p>
          <p>description placeholder</p>
        </div>
        <div>
          <p>Temperature:</p>
          <p>temperature placeholder</p>
        </div>
        <div>
          <p>Humidity:</p>
          <p>humidity placeholder</p>
        </div>
        <div>
          <p>Time:</p>
          <p>time placeholder</p>
        </div>
      </div>
      <div>
        <h1>Search History</h1>
      </div>
    </div>
  );
}

export default App;
