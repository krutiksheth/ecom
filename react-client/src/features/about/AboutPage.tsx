import {ButtonGroup, Container, Typography, Button} from "@mui/material";
import {
    useLazyGet400ErrorQuery,
    useLazyGet404ErrorQuery,
    useLazyGet401ErrorQuery,
    useLazyGet500ErrorQuery,
    useLazyGetValidationErrorQuery
} from "./errorApi.ts";

const AboutPage = () => {

    const [trigger400Error] = useLazyGet400ErrorQuery();
    const [trigger404Error] = useLazyGet404ErrorQuery();
    const [trigger401Error] = useLazyGet401ErrorQuery();
    const [trigger500Error] = useLazyGet500ErrorQuery();
    const [triggerValidationError] = useLazyGetValidationErrorQuery();

    return (
        <Container maxWidth="lg">
            <Typography gutterBottom variant="h3">Errors for testing</Typography>
            <ButtonGroup fullWidth>
                <Button variant="contained" onClick={
                    () => trigger400Error().catch(
                        err => console.log(err))}>Test 400 Error
                </Button>
                <Button variant="contained" onClick={
                    () => trigger404Error().catch(
                        err => console.log(err))}>Test 404 Error
                </Button>
                <Button variant="contained" onClick={
                    () => trigger401Error().catch(
                        err => console.log(err))}>Test 401 Error
                </Button>
                <Button variant="contained" onClick={
                    () => trigger500Error().catch(
                        err => console.log(err))}>Test 500 Error
                </Button>
                <Button variant="contained" onClick={
                    () => triggerValidationError().catch(
                        err => console.log(err))}>Test Validation Error
                </Button>
            </ButtonGroup>
        </Container>
    );
};

export default AboutPage;
