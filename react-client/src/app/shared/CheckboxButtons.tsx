import {Checkbox, FormControlLabel, FormGroup} from "@mui/material";
import {useEffect, useState} from "react";

type Props ={
    items: string[],
    checked: string[],
    onChange: (items: string[]) => void
}

const CheckboxButtons = ({ items, checked, onChange }: Props) => {
    const [checkedItems, setCheckedItems] = useState(checked);
    
    useEffect(() => {
        setCheckedItems(checked);
    },[checked]);
    
    const handleToggle = (value:string) => {
        const updateChecked = checkedItems?.includes(value) ? 
            checkedItems.filter(item=> item!==value) : [...checkedItems, value];
        setCheckedItems(updateChecked);
        onChange(updateChecked);
    }
    
    return (
        <FormGroup>
            {items && items.map((item, index) => (
                <FormControlLabel
                    control={<Checkbox
                                onClick={()=> handleToggle(item)}
                                checked={checkedItems?.includes(item)} sx={{py:0.7, fontSize:40}}  color="secondary"/>}
                    label={item}
                    key={index}>
                </FormControlLabel>
            ))}
        </FormGroup>
    );
};

export default CheckboxButtons;
