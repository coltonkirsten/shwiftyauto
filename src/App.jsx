import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import JobsAuth from './components/JobsAuth';
import JobApplication from './components/JobApplication';
import Applications from './components/Applications';
import { Authenticator } from '@aws-amplify/ui-react';

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
          <Route
            path="/apply"
            element={
              <Authenticator>
                <JobApplication />
              </Authenticator>
            }
          />
          <Route
            path="/applications"
            element={
              <Authenticator>
                <Applications />
              </Authenticator>
            }
          />
          <Route path="/jobs" element={<JobsAuth />} />
        </Routes>
      </div>
    </Router>
  );
}
export default App;