import React, { useState, useEffect } from 'react';
import { Box, Grid, Switch, FormControlLabel, Typography, ThemeProvider, createTheme, useMediaQuery, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import TreeView from '../TreeView/TreeView';
import TableGroup from '../TableGroup/TableGroup';

const MainLayout = () => {
    const [selectedTree, setSelectedTree] = useState(null);
    const [isDarkMode, setIsDarkMode] = useState(() => {
        const savedMode = localStorage.getItem('darkMode');
        return savedMode ? JSON.parse(savedMode) : false;
    });
    const isMobile = useMediaQuery('(max-width:1024px)');
    const [selectedOption, setSelectedOption] = useState(61);

    const theme = createTheme({
        palette: {
            mode: isDarkMode ? 'dark' : 'light',
            background: {
                default: isDarkMode ? '#000000' : '#ffffff',
                paper: isDarkMode ? '#121212' : '#ffffff',
            },
            text: {
                primary: isDarkMode ? '#ffffff' : '#000000',
                secondary: isDarkMode ? '#b0b0b0' : '#666666',
            },
        },
        components: {
            MuiPaper: {
                styleOverrides: {
                    root: {
                        transition: 'all 0.3s ease-in-out',
                    },
                },
            },
            MuiTableCell: {
                styleOverrides: {
                    root: {
                        transition: 'all 0.2s ease-in-out',
                    },
                },
            },
            MuiTreeItem: {
                styleOverrides: {
                    label: {
                        color: isDarkMode ? '#ffffff' : '#000000',
                    },
                },
            },
        },
    });
    let i = 0;
    const handleTreeSelect = (nodeData) => {
        if (nodeData && (!selectedTree || selectedTree.id !== nodeData.id)) {
            setSelectedTree(nodeData);
        }
    };

    const handleThemeChange = (event) => {
        const newMode = event.target.checked;
        setIsDarkMode(newMode);
        localStorage.setItem('darkMode', JSON.stringify(newMode));
    };

    return (
        <ThemeProvider theme={theme}>
            <Box
                sx={{
                    flexGrow: 1,
                    height: 'auto',
                    width: '100vw',
                    p: 2,
                    overflow: 'hidden',
                    bgcolor: 'background.default',
                    transition: 'background-color 0.3s ease-in-out',
                }}
            >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <FormControl sx={{ minWidth: 200 }}>
                        <InputLabel>Select Option</InputLabel>
                        <Select
                            value={selectedOption}
                            label="Select Option"
                            onChange={(e) => setSelectedOption(e.target.value)}
                        >
                            <MenuItem value="61">61</MenuItem>
                            <MenuItem value="62">62</MenuItem>
                            <MenuItem value="63">63</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControlLabel
                        control={
                            <Switch
                                checked={isDarkMode}
                                onChange={handleThemeChange}
                                color="primary"
                            />
                        }
                        label={
                            <Typography color="text.primary">
                                {isDarkMode ? 'Dark Mode' : 'Light Mode'}
                            </Typography>
                        }
                    />
                </Box>
                <Grid
                    container
                    spacing={2}
                    sx={{
                        height: 'calc(100% - 48px)',
                        width: '100%',
                        m: 0,
                        flexDirection: isMobile ? 'column' : 'row',
                    }}
                >
                    {/* Left side - Tree View */}
                    <Grid
                        item
                        xs={12}
                        md={9}
                        sx={{
                            width: isMobile ? '100%' : '23%',
                            order: isMobile ? 1 : 0,
                        }}
                    >
                        <Box sx={{
                            height: '100%',
                            width: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            transition: 'all 0.3s ease-in-out',
                        }}>
                            <TreeView onNodeSelect={(e) => handleTreeSelect(e)} />
                        </Box>
                    </Grid>

                    {/* Right side - Tables */}
                    <Grid
                        item
                        xs={12}
                        md={3}
                        sx={{
                            width: isMobile ? '100%' : '72%',
                            order: isMobile ? 1 : 1,
                        }}
                    >
                        <Box sx={{
                            height: '100%',
                            width: '100%',
                            transition: 'all 0.3s ease-in-out',
                        }}>
                            <TableGroup selectedTree={selectedTree} />
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </ThemeProvider>
    );
};

export default MainLayout; 