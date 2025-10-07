import React from "react";
import { AppBar, Toolbar, Typography, Box, Button } from "@mui/material";
import theme from "../theme";
import { Link as RouterLink } from "react-router-dom";

export default function Header() {
  return (
    <AppBar position="static" sx={{ backgroundColor: theme.palette.primary.main }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6" fontWeight="bold">
          VitaeAI
        </Typography>
        <Box>
          <Button color="inherit" component={RouterLink} to="/login">
            Login
          </Button>
          <Button color="inherit" component={RouterLink} to="/registro">
            Registro
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
