import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ScrollToTop from "./scrollToTop";

import Landing from "./pages/Landing";

function App() {
  return (
    <div>
      <Router>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/:requestedMovie" element={<Landing />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;