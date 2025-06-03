import React, { useState, useEffect } from 'react';
import { Box, Grid, ThemeProvider, createTheme, useMediaQuery, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import TreeView from '../TreeView/TreeView';
import TableGroup from '../TableGroup/TableGroup';

const MainLayout = () => {
    const [selectedTree, setSelectedTree] = useState(null);
    const isMobile = useMediaQuery('(max-width:1024px)');
    const [selectedOption, setSelectedOption] = useState(61);

    const theme = createTheme({
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
        },
    });
    const handleTreeSelect = (nodeData) => {
        if (nodeData && (!selectedTree || selectedTree.id !== nodeData.id)) {
            setSelectedTree(nodeData);
        }
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