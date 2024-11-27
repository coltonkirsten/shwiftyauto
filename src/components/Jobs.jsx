import React from 'react';
import { useNavigate } from 'react-router-dom';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { useAuthenticator } from '@aws-amplify/ui-react';

const jobs = [
    {
        title: "Mobile Mechanic",
        description: "Travel to customers' locations to perform vehicle diagnostics and repairs.",
    },
    {
        title: "Customer Service Representative",
        description: "Handle customer inquiries and ensure a smooth repair booking process.",
    },
    {
        title: "Parts Specialist",
        description: "Manage inventory and ensure timely delivery of parts to mechanics.",
    },
];

function Jobs() {
    const { signOut } = useAuthenticator();
    const navigate = useNavigate();

    const handleApplyClick = (job) => {
        navigate('/apply', { state: { job } });
    };

    const handleViewApplications = () => {
        navigate('/applications');
    };

    return (
        <Container>
            <Box sx={{ textAlign: 'right', mt: 4, mb: 4 }}>
                <Button
                    variant="outlined"
                    color="secondary"
                    sx={{ mt: 2, margin: 1 }}
                    onClick={handleViewApplications}
                >
                    View Your Applications
                </Button>
                <Button
                    variant="outlined"
                    color="secondary"
                    sx={{ mt: 2, margin: 1 }}
                    onClick={signOut}
                >
                    Sign out
                </Button>
            </Box>
            <Grid container spacing={4}>
                {jobs.map((job, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                        <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                            <CardContent sx={{ flexGrow: 1 }}>
                                <Typography variant="h5" component="h2">
                                    {job.title}
                                </Typography>
                                <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                                    {job.description}
                                </Typography>
                            </CardContent>
                            <CardActions sx={{ justifyContent: 'flex-end' }}>
                                <Button
                                    size="small"
                                    color="primary"
                                    variant="contained"
                                    onClick={() => handleApplyClick(job)}
                                >
                                    Apply
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>

    );
}

export default Jobs;