import { FormControl, InputLabel, NativeSelect } from '@mui/material';
import React from 'react';

type SelectSortProps = {
  handleSorting: (id: string) => void;
};

const SelectSort: React.FC<SelectSortProps> = ({ handleSorting }) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    handleSorting(event.target.value);
  };

  return (
    <FormControl sx={{ width: '15%' }}>
      <InputLabel
        variant="standard"
        htmlFor="sort"
        id="demo-simple-select-helper-label"
      >
        Sort by
      </InputLabel>
      <NativeSelect
        defaultValue={'alphabet'}
        inputProps={{
          name: 'sort',
          id: 'sort',
        }}
        onChange={handleChange}
      >
        <option value={'alphabet'}>Alphabet</option>
        <option value={'count'}>Count</option>
      </NativeSelect>
    </FormControl>
  );
};

export default SelectSort;
