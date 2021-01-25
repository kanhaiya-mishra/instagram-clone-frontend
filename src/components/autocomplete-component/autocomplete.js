// *https://www.registers.service.gov.uk/registers/country/use-the-api*
import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';
import _ from 'lodash';
import DBlayer from '../../dblayer';
import { useHistory } from 'react-router-dom';

export default function AutocompleteSearch() {
   const [open, setOpen] = React.useState(false);
   const [loading, setLoading] = React.useState(false);
   const [options, setOptions] = React.useState([]);
   const history = useHistory();

   React.useEffect(() => {
      const searchBox = document.getElementById('autocomplete-search');
      const debouncedSearch = _.debounce(function (event) {
         if (event.target.value.length > 1) {
            setLoading(true);
            DBlayer.getAllUsersByUsername(event.target.value)
               .then((result) => {
                  let usernameArray = [];
                  result.data.forEach(item => {
                     usernameArray.push({ username: item.username });
                  });
                  setLoading(false);
                  setOptions(usernameArray);
               })
               .catch((err) => {
                  setLoading(false);
               })
         }
      })
      searchBox.addEventListener('keydown', debouncedSearch, 1000);
      return () => {
         const searchBox = document.getElementById('autocomplete-search');
         searchBox.removeEventListener('keydown', debouncedSearch);
      }
   }, []);

   React.useEffect(() => {
      if (!open) {
         setOptions([]);
      }
   }, [open]);

   function redirectToUserProfile(username) {
      if (username) {
         history.push(`/profile/${username}`);
      }
   }

   return (
      <Autocomplete
         id="autocomplete-search"
         freeSolo
         options={options.map((option) => option.username)}
         onChange={(event, newValue) => {
            redirectToUserProfile(newValue)
         }}
         style={{ width: 300 }}
         open={open}
         onOpen={() => {
            setOpen(true);
         }}
         onClose={() => {
            setOpen(false);
         }}
         renderInput={(params) => (
            <TextField
               {...params}
               label="Search by username"
               variant="outlined"
               InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                     <React.Fragment>
                        {loading ? <CircularProgress color="inherit" size={16} /> : null}
                     </React.Fragment>
                  ),
               }}
            />
         )}
      />
   );
}
