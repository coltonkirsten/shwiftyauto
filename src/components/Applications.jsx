import React from 'react';
import { useState, useEffect } from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';

function Applications() {
    const [applications, setApplications] = useState([]);

    useEffect(() => {
        // Retrieve applications from local storage
        const savedApplications = JSON.parse(localStorage.getItem('applications')) || [];
        setApplications(savedApplications);
    }, []);

    return (
        <Container>
            <Box sx={{ textAlign: 'center', mt: 4, mb: 4 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Your Applications
                </Typography>
                <Typography variant="body1" gutterBottom>
                    Review the status of your submitted applications.
                </Typography>
            </Box>
            <Grid container spacing={4}>
                {applications.length === 0 ? (
                    <Typography variant="body1" sx={{ mt: 4, textAlign: 'center', width: '100%' }}>
                        You have not submitted any applications yet.
                    </Typography>
                ) : (
                    applications.map((app, index) => (
                        <Grid item xs={12} sm={6} md={4} key={index}>
                            <Card>
                                <CardContent>
                                    <Typography variant="h6" component="h2">
                                        {app.title}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Status: {app.status}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))
                )}
            </Grid>
        </Container>
    );
}

export default Applications;