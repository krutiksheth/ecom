import {Box, Button, Paper, Step, StepLabel, Stepper} from "@mui/material";
import {useState} from "react";

const CheckoutStepper = () => {
    const steps = ['Address', 'Payment', 'Review'];
    const [activeStep, setActiveStep] = useState(0);

    const handleNext = () => {
        setActiveStep(prevStep => prevStep + 1);
    }

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    return (
        <Paper sx={{p: 3, borderRadius: 3}}>
            <Stepper activeStep={activeStep}>
                {steps.map((label, index) => {
                    return (<Step key={index}> <StepLabel>{label}</StepLabel></Step>)
                })}
            </Stepper>
            <Box sx={{mt: 2}}>
                <Box sx={{display: activeStep === 0 ? 'block' : 'none'}}>
                    Address
                </Box>
                <Box sx={{display: activeStep === 1 ? 'block' : 'none'}}>
                    Payment
                </Box>
                <Box sx={{display: activeStep === 2 ? 'block' : 'none'}}>
                    Review
                </Box>
            </Box>
            <Box display="flex" paddingTop={2} justifyContent="space-between">
                <Button onClick={handleBack}>Back</Button>
                <Button onClick={handleNext}>Next</Button>
            </Box>
        </Paper>
    );
};

export default CheckoutStepper;
