import {FormControl, FormControlLabel, Radio, RadioGroup} from "@mui/material";
import {ChangeEvent} from "react";

type Props = {
    options:{ value: string; label: string }[];
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
    selectedValue: string;
}

const RadioButtonGroup = ({options, onChange, selectedValue}: Props) => {
    return (
        <FormControl fullWidth variant="outlined">
            <RadioGroup value={selectedValue} onChange={onChange} sx={{my:0}}>
                {options.map(({label, value}) => (
                    <FormControlLabel
                        control={<Radio sx={{py:0.7}} color="secondary"/>}
                        label={label}
                        value={value}
                        key={label}></FormControlLabel>
                ))}
            </RadioGroup>
        </FormControl>
    );
};

export default RadioButtonGroup;
