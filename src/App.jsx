import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Jobs from './components/Jobs';
import JobApplication from './components/JobApplication';
import Applications from './components/Applications';

function App() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Router>
      <div className="App">
        <AppBar position="static">
          <Toolbar>
            <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="h6" component="div">
                Shwifty Automotive
              </Typography>
              <Tabs
                value={value}
                onChange={handleChange}
                textColor="inherit"
                indicatorColor="secondary"
              >
                <Tab label="Home" component={Link} to="/" />
                <Tab label="Jobs" component={Link} to="/jobs" />
              </Tabs>
            </Box>
          </Toolbar>
        </AppBar>

        <Routes>
          <Route
            path="/"
            element={<Typography variant="h4" sx={{ textAlign: 'center', mt: 4 }}>Welcome Home</Typography>}
          />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/apply" element={<JobApplication />} />
          <Route path="/applications" element={<Applications />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;