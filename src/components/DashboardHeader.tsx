import React from 'react';
import { Button, TextField, Typography, Grid, Box, Divider } from '@mui/material';
import { getFormattedDate } from '../utils';

interface DashboardHeaderProps {
  locationName: string | null;
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  handleSearch: () => void;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ locationName, query, setQuery, handleSearch }) => {
  return (
    <>
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item>
          <Box display="flex" alignItems="center">
            <Typography variant="h4" gutterBottom sx={{marginRight: '10px', fontWeight: 'bold'}}>{locationName}</Typography>
            <Typography variant="body1">
              {getFormattedDate()}
            </Typography>
          </Box>
        </Grid>
        <Grid item>
          <Box display="flex" alignItems="center">
            <TextField
              label="Enter location"
              variant="outlined"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              size='small'
              sx={{ width: '200px' }}
            />
            <Button variant="contained" onClick={handleSearch} sx={{ width: '100px', marginLeft: '10px', background: '#000000' }}>
              Search
            </Button>
          </Box>
        </Grid>
      </Grid>
      <Divider sx={{ marginTop: '10px', marginBottom: '10px' }} />
    </>
  );
};

export default DashboardHeader;
