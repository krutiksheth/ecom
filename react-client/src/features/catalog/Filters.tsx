import {useFetchFiltersQuery} from "./catalogApi.ts";
import {Box, Paper, TextField, FormControl, FormControlLabel, Radio, FormGroup, Checkbox} from "@mui/material";

const sortOptions = [
    { value: 'name', label: 'Alphabetical' },
    { value: 'priceDesc', label: 'Price: High to Low' },
    { value: 'price', label: 'Price: Low to High' }
];

const Filters = () => {
    
    const {data} = useFetchFiltersQuery();
    console.log("data", data);
    
    return (
        <Box display="flex" flexDirection="column" gap={3}>
            <Paper>
                <TextField label="Search Products" variant="outlined" fullWidth></TextField>
            </Paper>
            <Paper sx={{p:3}}>
                <FormControl fullWidth variant="outlined">
                    {sortOptions.map(({label, value}) => (
                        <FormControlLabel 
                            control={<Radio sx={{py:0.7}} />} 
                            label={label}
                            value={value}
                            key={label}></FormControlLabel>
                    ))}
                </FormControl>
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