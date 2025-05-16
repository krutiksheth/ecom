import {Box, Button, Paper} from "@mui/material";
import RadioButtonGroup from "../../app/shared/RadioButtonGroup.tsx";
import {useAppDispatch, useAppSelector} from "../../app/store/store.ts";
import {reset, setBrands, setOrderBy, setTypes} from "./catalogSlice.ts";
import CheckboxButtons from "../../app/shared/CheckboxButtons.tsx";
import Search from "./Search.tsx";

const sortOptions = [
    { value: 'name', label: 'Alphabetical' },
    { value: 'priceDesc', label: 'Price: High to Low' },
    { value: 'price', label: 'Price: Low to High' }
];

type Props = {
    filtersData:{brands:string[], types:string[]};
}

const Filters = ({filtersData: data}: Props) => {
    
   
    const {orderBy, brands, types} = useAppSelector(state => state.catalog);
    const dispatch = useAppDispatch();
    
    return (
        <Box display="flex" flexDirection="column" gap={3}>
            <Paper>
                <Search></Search>
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
            <Button onClick={()=>dispatch(reset())}> Reset Filters</Button>
        </Box>
    );
};

export default Filters;