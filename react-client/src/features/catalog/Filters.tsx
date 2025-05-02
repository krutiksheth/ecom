import {useFetchFiltersQuery} from "./catalogApi.ts";
import {Box, Paper, TextField, Typography} from "@mui/material";
import RadioButtonGroup from "../../app/shared/RadioButtonGroup.tsx";
import {useAppDispatch, useAppSelector} from "../../app/store/store.ts";
import {setBrands, setOrderBy, setTypes} from "./catalogSlice.ts";
import CheckboxButtons from "../../app/shared/CheckboxButtons.tsx";

const sortOptions = [
    { value: 'name', label: 'Alphabetical' },
    { value: 'priceDesc', label: 'Price: High to Low' },
    { value: 'price', label: 'Price: Low to High' }
];

const Filters = () => {
    
    const {data} = useFetchFiltersQuery();
    const {orderBy, brands, types} = useAppSelector(state => state.catalog);
    const dispatch = useAppDispatch();
    
    if(!data?.brands || !data?.types) return <Typography>Loading...</Typography>
    
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
              <CheckboxButtons 
                  checked={brands} 
                  onChange={(items: string[])=>dispatch(setBrands(items))} 
                  items={data.brands}></CheckboxButtons>
            </Paper>
            <Paper sx={{p:3}}>
                <CheckboxButtons
                    checked={types}
                    onChange={(items: string[])=>dispatch(setTypes(items))}
                    items={data.types}></CheckboxButtons>
            </Paper>
        </Box>
    );
};

export default Filters;