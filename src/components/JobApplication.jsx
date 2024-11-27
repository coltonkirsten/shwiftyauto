import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


function JobApplication() {
    const location = useLocation();
    const navigate = useNavigate();
    const { job } = location.state || { job: {} };

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        reason: '',
        resume: null, // To store the uploaded file
    });
    const [unsavedChanges, setUnsavedChanges] = useState(false); // Track if there are unsaved changes
    const [exitDialogOpen, setExitDialogOpen] = useState(false); // Track dialog state

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
        setUnsavedChanges(true);
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData((prevData) => ({
                ...prevData,
                resume: file,
            }));
            setUnsavedChanges(true);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Save the application to local storage
        const existingApplications = JSON.parse(localStorage.getItem('applications')) || [];
        const newApplication = {
            title: job.title,
            description: job.description,
            status: 'Submitted',
            ...formData,
            resume: formData.resume ? formData.resume.name : null, // Save file name only for simplicity
        };
        localStorage.setItem('applications', JSON.stringify([...existingApplications, newApplication]));

        // Redirect to Applications page
        navigate('/applications');
    };

    const triggerFileInput = () => {
        document.getElementById('resume-upload').click();
    };

    const handleExit = () => {
        setExitDialogOpen(true); // Open the confirmation dialog
    };

    const confirmExit = () => {
        setExitDialogOpen(false); // Close the dialog
        navigate('/jobs'); // Redirect to jobs page
    };

    const cancelExit = () => {
        setExitDialogOpen(false); // Close the dialog without exiting
    };

    return (
        <Container>
            <Box sx={{ textAlign: 'center', mt: 4, mb: 4 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Apply for {job.title || 'this Job'}
                </Typography>
                <Typography variant="body1" gutterBottom>
                    {job.description || 'Fill out the application form below to join our team.'}
                </Typography>
            </Box>
            <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxWidth: 600, mx: 'auto' }}
            >
                <TextField
                    label="Full Name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    variant="outlined"
                    required
                    fullWidth
                />
                <TextField
                    label="Email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    variant="outlined"
                    type="email"
                    required
                    fullWidth
                />
                <TextField
                    label="Phone Number"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    variant="outlined"
                    required
                    fullWidth
                />
                <TextField
                    label="Why are you a good fit for this job?"
                    name="reason"
                    value={formData.reason}
                    onChange={handleInputChange}
                    variant="outlined"
                    multiline
                    rows={4}
                    required
                    fullWidth
                />
                <Stack direction="row" alignItems="center" spacing={2}>
                    <Button variant="outlined" onClick={triggerFileInput}>
                        {formData.resume ? formData.resume.name : "Upload Resume"}
                    </Button>
                    <input
                        id="resume-upload"
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={handleFileChange}
                        style={{ display: 'none' }}
                        required
                    />
                </Stack>
                <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
                    <Button variant="contained" color="primary" type="submit">
                        Submit Application
                    </Button>
                    <Button variant="outlined" color="secondary" onClick={handleExit}>
                        Cancel
                    </Button>
                </Stack>
            </Box>

            {/* Exit Confirmation Dialog */}
            <Dialog
                open={exitDialogOpen}
                onClose={cancelExit}
                aria-labelledby="exit-dialog-title"
                aria-describedby="exit-dialog-description"
            >
                <DialogTitle id="exit-dialog-title">
                    Are you sure you want to exit?
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="exit-dialog-description">
                        You have unsaved changes. Are you sure you want to exit without saving?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={cancelExit} color="primary">
                        No, Stay
                    </Button>
                    <Button onClick={confirmExit} color="error" autoFocus>
                        Yes, Exit
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
}

export default JobApplication;