import {useFetchFiltersQuery} from "./catalogApi.ts";
import {Box, Paper, TextField, FormControlLabel, FormGroup, Checkbox} from "@mui/material";
import RadioButtonGroup from "../../app/shared/RadioButtonGroup.tsx";
import {useAppDispatch, useAppSelector} from "../../app/store/store.ts";
import { setOrderBy } from "./catalogSlice.ts";

const sortOptions = [
    { value: 'name', label: 'Alphabetical' },
    { value: 'priceDesc', label: 'Price: High to Low' },
    { value: 'price', label: 'Price: Low to High' }
];

const Filters = () => {
    
    const {data} = useFetchFiltersQuery();
    const {orderBy} = useAppSelector(state => state.catalog);
    const dispatch = useAppDispatch();
    
    console.log("data", data);
    
    return (
        <Box display="flex" flexDirection="column" gap={3}>
            <Paper>
                <TextField label="Search Products" variant="outlined" fullWidth></TextField>
            </Paper>
            <Paper sx={{p:3}}>
                <RadioButtonGroup options={sortOptions} 
                                  onChange={(e)=> dispatch(setOrderBy(e.target.value))} 
                                  selectedValue={orderBy}></RadioButtonGroup>
            </Paper>
            <Paper sx={{p:3}}>
                <FormGroup>
                    {data && data.brands.map((brand, index) => (
                        <FormControlLabel
                            control={<Checkbox sx={{py:0.7, fontSize:40}}  color="secondary"/>}
                            label={brand}
                            key={index}>
                        </FormControlLabel>
                    ))}
                </FormGroup>
            </Paper>
            <Paper sx={{p:3}}>
                <FormGroup>
                    {data && data.types.map((type, index) => (
                        <FormControlLabel
                            control={<Checkbox sx={{py:0.7, fontSize:40}}  color="secondary"/>}
                            label={type}
                            key={index}>
                        </FormControlLabel>
                    ))}
                </FormGroup>
            </Paper>
        </Box>
    );
};

export default Filters;