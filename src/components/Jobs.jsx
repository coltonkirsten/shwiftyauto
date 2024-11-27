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
    const navigate = useNavigate();

    const handleApplyClick = (job) => {
        navigate('/apply', { state: { job } });
    };

    const handleViewApplications = () => {
        navigate('/applications');
    };

    return (
        <Container>
            <Box sx={{ textAlign: 'center', mt: 4, mb: 4 }}>
                <Typography variant="h2" component="h1" gutterBottom>
                    Jobs at Shwifty Automotive
                </Typography>
                <Typography variant="h6" component="p" gutterBottom>
                    Join our team of skilled professionals and help us revolutionize vehicle repair!
                </Typography>
                <Button
                    variant="outlined"
                    color="secondary"
                    sx={{ mt: 2 }}
                    onClick={handleViewApplications}
                >
                    View Your Applications
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