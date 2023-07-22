import React from 'react';
import { Box, CircularProgress, Stack } from '@mui/material';

const Loader = () =>  (
  <Box minHeight="95vh" sx={{ backgroundColor: "#202020" }}>
    <Stack direction='row' justifyContent='center' alignItems='center' height='80vh' >
      <CircularProgress color='primary' />
    </Stack>
  </Box>
);

export default Loader;
