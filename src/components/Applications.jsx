import React, { useState, useEffect } from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

import { Amplify } from 'aws-amplify';
import outputs from '/amplify_outputs.json';
import { generateClient } from 'aws-amplify/data';
import { getUrl } from 'aws-amplify/storage';
import { useAuthenticator } from '@aws-amplify/ui-react';

Amplify.configure(outputs);

/**
 * @type {import('aws-amplify/data').Client<import('../../amplify/data/resource').Schema>}
 */
const client = generateClient({
    authMode: 'userPool',
});

function Applications() {
    const [applications, setApplications] = useState([]);
    const { signOut } = useAuthenticator();

    useEffect(() => {
        fetchApplications();
    }, []);

    async function fetchApplications() {
        try {
            const { data: apps } = await client.models.Application.list();
            // For each application, if resumeFileName is present, get the URL
            await Promise.all(
                apps.map(async (app) => {
                    if (app.resumeFileName) {
                        const linkToStorageFile = await getUrl({
                            path: ({ identityId }) => `resumes/${identityId}/${app.resumeFileName}`,
                        });
                        app.resumeUrl = linkToStorageFile.url;
                    }
                    return app;
                })
            );
            setApplications(apps);
        } catch (error) {
            console.error('Error fetching applications:', error);
            // Handle error (e.g., show a notification to the user)
        }
    }

    return (
        <Container>
            <Box sx={{ textAlign: 'right', mt: 4, mb: 4 }}>
                <Button
                    variant="outlined"
                    color="secondary"
                    sx={{ mt: 2, margin: 1 }}
                    onClick={signOut}
                >
                    Sign out
                </Button>
            </Box>
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
                        <Grid item xs={12} sm={6} md={4} key={app.id || index}>
                            <Card>
                                <CardContent>
                                    <Typography variant="h6" component="h2">
                                        {app.jobTitle}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Status: Submitted
                                    </Typography>
                                    {/* Optionally display resume link */}
                                    {app.resumeUrl && (
                                        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                                            <a href={app.resumeUrl} target="_blank" rel="noopener noreferrer">
                                                View Resume
                                            </a>
                                        </Typography>
                                    )}
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