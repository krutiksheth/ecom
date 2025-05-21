import {useFetchBasketQuery} from "../basket/basketApi.ts";
import {Box, Divider, Table, TableBody, TableCell, TableContainer, TableRow, Typography} from "@mui/material";
import {currencyFormat} from "../../lib/util.ts";

const Review = () => {

    const {data: basket} = useFetchBasketQuery();

    return (
        <>
            <Box mt={4} width="100%">
                <Typography variant="h6" fontWeight="bold">
                    Billing and delivery information
                </Typography>
                <dl>
                    <Typography component="dt" fontWeight="medium">
                        Shipping Address
                    </Typography>
                    <Typography component="dd" mt={1} color="textSecondary">
                        address goes here
                    </Typography>

                    <Typography component="dt" fontWeight="medium">
                        Payment Details
                    </Typography>
                    <Typography component="dd" mt={1} color="textSecondary">
                        payment details goes here
                    </Typography>
                </dl>
            </Box>
            <Box mt={6} mx="auto">
                <Divider/>
                <TableContainer>
                    <Table>
                        <TableBody>
                            {basket?.items.map((item, index) => (
                                <TableRow key={index} sx={{borderBottom: "1px solid rgba(224,224,224,1)"}}>
                                    <TableCell sx={{py: 4}}>
                                        <Box display="flex" alignItems="center" gap={3}>
                                            <img src={item.pictureUrl} alt={item.name}
                                                 style={{width: 40, height: 40}}/>
                                            <Typography>
                                                {item.name}
                                            </Typography>
                                        </Box>
                                    </TableCell>
                                    <TableCell align="center" sx={{p: 4}}>
                                        x {item.quantity}
                                    </TableCell>
                                    <TableCell align="center" sx={{p: 4}}>
                                        {currencyFormat(item.price)}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </>
    );
};

export default Review;
