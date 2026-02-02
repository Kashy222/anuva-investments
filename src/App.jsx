import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Services from './pages/Services';

import Tools from './pages/Tools';
import ScheduleCall from './pages/ScheduleCall';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />

        <Route path="/tools" element={<Tools />} />
        <Route path="/schedule-call" element={<ScheduleCall />} />
      </Routes>
    </Layout>
  );
}

export default App;
