import {Grid2, Typography} from "@mui/material";
import OrderSummary from "../../app/shared/OrderSummary.tsx";
import CheckoutStepper from "./CheckoutStepper.tsx";
import {loadStripe, StripeElementsOptions} from "@stripe/stripe-js";
import {Elements} from "@stripe/react-stripe-js";
import {useFetchBasketQuery} from "../basket/basketApi.ts";
import {useEffect, useMemo, useRef} from "react";
import {useCreateOrUpdatePaymentIntentMutation} from "./checkoutApi.ts";
import {useAppSelector} from "../../app/store/store.ts";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK);

const CheckoutPage = () => {
    const {darkMode} = useAppSelector(state => state.ui);
    const {data: basket} = useFetchBasketQuery();
    const [createPaymentIntent, {isLoading}] = useCreateOrUpdatePaymentIntentMutation();
    const created = useRef(false);
    const options: StripeElementsOptions | undefined = useMemo(() => {
        if (!basket?.clientSecret)
            return undefined;
        return {
            clientSecret: basket?.clientSecret,
            appearance: {
                labels: "floating",
                theme: darkMode ? "night" : "stripe"
            }
        }
    }, [basket?.clientSecret, darkMode]);

    useEffect(() => {
        if (!created.current) {
            createPaymentIntent();
        }
        created.current = true;
    }, [createPaymentIntent]);

    return (
        <Grid2 container spacing={2}>
            <Grid2 size={8}>
                {!stripePromise || !options || isLoading ? (
                    <Typography variant="h6" component="div">Loading checkout...</Typography>
                ) : (<Elements stripe={stripePromise} options={options}>
                    <CheckoutStepper></CheckoutStepper>
                </Elements>)}
            </Grid2>
            <Grid2 size={4}>
                <OrderSummary/>
            </Grid2>
        </Grid2>
    );
};

export default CheckoutPage;
