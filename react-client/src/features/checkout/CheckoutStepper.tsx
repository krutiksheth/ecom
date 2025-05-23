import {Box, Button, Checkbox, FormControlLabel, Paper, Step, StepLabel, Stepper, Typography} from "@mui/material";
import {useState} from "react";
import {AddressElement, PaymentElement, useElements} from "@stripe/react-stripe-js";
import Review from "./Review.tsx";
import {useFetchAddressQuery, useUpdateAddressMutation} from "../account/accountApi.ts";
import {Address} from "../../app/models/user.ts";
import {StripeAddressElementChangeEvent, StripePaymentElementChangeEvent} from "@stripe/stripe-js";
import {useBasket} from "../../lib/hooks/useBasket.ts";
import {currencyFormat} from "../../lib/util.ts";

const CheckoutStepper = () => {
    const steps = ['Address', 'Payment', 'Review'];
    const [activeStep, setActiveStep] = useState(0);
    const {data: {name, ...restAddress} = {} as Address, isLoading} = useFetchAddressQuery();
    const [updateAddress] = useUpdateAddressMutation();
    const [saveAddressChecked, setSaveAddressChecked] = useState(false);
    const elements = useElements();
    const [addressComplete, setAddressComplete] = useState(false);
    const [paymentComplete, setPaymentComplete] = useState(false);
    const {total} = useBasket();

    const handleNext = async () => {
        if (activeStep === 0 && saveAddressChecked && elements) {
            const address = await getStripeAddress();
            if (address) {
                updateAddress(address);
            }
        }
        setActiveStep(prevStep => prevStep + 1);

    }

    const getStripeAddress = async () => {
        const addressElement = elements?.getElement("address");

        if (!addressElement) return null;

        const {value: {name, address}} = await addressElement.getValue();
        if (name && address) return {...address, name};

        return null;
    }

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleAddressChange = (e: StripeAddressElementChangeEvent) => {
        setAddressComplete(e.complete);
    }

    const handlePaymentChange = (e: StripePaymentElementChangeEvent) => {
        setPaymentComplete(e.complete);
    }


    if (isLoading) return <Typography variant="h6" component="div">Loading checkout...</Typography>;

    return (
        <Paper sx={{p: 3, borderRadius: 3}}>
            <Stepper activeStep={activeStep}>
                {steps.map((label, index) => {
                    return (<Step key={index}> <StepLabel>{label}</StepLabel></Step>)
                })}
            </Stepper>
            <Box sx={{mt: 2}}>
                <Box sx={{display: activeStep === 0 ? 'block' : 'none'}}>
                    <AddressElement onChange={handleAddressChange} options={{
                        mode: 'shipping',
                        defaultValues: {
                            name: name,
                            address: restAddress
                        }
                    }}/>
                    <FormControlLabel
                        sx={{display: "flex", justifyContent: "end"}}
                        label="Save as default address"
                        control={<Checkbox checked={saveAddressChecked}
                                           onChange={e => setSaveAddressChecked(e.target.checked)}/>}>

                    </FormControlLabel>
                </Box>
                <Box sx={{display: activeStep === 1 ? 'block' : 'none'}}>
                    <PaymentElement onChange={handlePaymentChange} options={{
                        paymentMethodOrder: ["card"]
                    }}/>
                </Box>
                <Box sx={{display: activeStep === 2 ? 'block' : 'none'}}>
                    <Review/>
                </Box>
            </Box>
            <Box display="flex" paddingTop={2} justifyContent="space-between">
                <Button onClick={handleBack}>Back</Button>
                <Button disabled={(activeStep === 0 && !addressComplete) || (activeStep === 1) && !paymentComplete}
                        onClick={handleNext}>{
                    activeStep === steps.length - 1 ? `Pay ${currencyFormat(total)}` : "Next"
                }</Button>
            </Box>
        </Paper>
    );
};

export default CheckoutStepper;
