import React from "react";
import { AppBar, Toolbar, Typography, Box, Button, Link } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

export default function Header() {
  const navItems = [
    { label: "Generador CV", path: "/wizard" }, //
    { label: "Tutorial", path: "/tutorial" }, 
  ];

  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        backgroundColor: "#fff", 
        borderBottom: "1px solid #e0e0e0", 
        py: 0.5,
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          maxWidth: 1200,
          margin: "0 auto",
          width: "100%",
          paddingX: { xs: 2, md: 3 },
        }}
      >
        {/*(VitaeAI) */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box
            sx={{
              width: 15,
              height: 15,
              backgroundColor: '#1976D2', 
              clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)', 
              mr: 0.5
            }}
          />
          <Typography
            variant="h6"
            fontWeight="bold"
            sx={{ color: '#000', lineHeight: 1 }}
          >
            VitaeAI
          </Typography>
        </Box>

        {/* Navigation Links */}
        <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}>
          {navItems.map((item) => (
            <Button
              key={item.label}
              component={RouterLink}
              to={item.path}
              sx={{
                color: '#000',
                textTransform: 'none',
                fontSize: '0.9rem',
                mx: 1, 
              }}
            >
              {item.label}
            </Button>
          ))}
        </Box>

        {/* Mi cuenta */}
        <Link
          component={RouterLink}
          to="/mi-cuenta" 
          underline="none"
          sx={{
            color: '#000',
            textTransform: 'none',
            fontSize: '0.9rem',
            fontWeight: 'regular',
            '&:hover': {
              textDecoration: 'underline'
            }
          }}
        >
          Mi cuenta
        </Link>
      </Toolbar>
    </AppBar>
  );
}
