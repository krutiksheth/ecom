import {debounce, TextField} from "@mui/material";
import {useState} from "react";
import {useAppDispatch} from "../../app/store/store.ts";
import {setSearchTerm} from "./catalogSlice.ts";

const Search = () => {
    
    const [search, setSearch] = useState("");
    const dispatch= useAppDispatch();
    const debouncedSearch= debounce(e=>{
        dispatch(setSearchTerm(e.target.value));
    }, 500);
    return (
        <div>
            <TextField onChange={e=>{
                setSearch(e.target.value);
                debouncedSearch(e);
            }} value={search} label="Search Products" variant="outlined" fullWidth></TextField>
        </div>
    );
};

export default Search;
