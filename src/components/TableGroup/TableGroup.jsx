import React, { useState, useEffect } from 'react';
import { Box, Paper } from '@mui/material';
import DataTable from '../DataTable/DataTable';
import { mockData, getRelatedSecondaryItems, getRelatedTertiaryItems } from '../../data/mockData';

const TableGroup = ({ selectedTree }) => {
    const [primaryData, setPrimaryData] = useState([]);
    const [secondaryData, setSecondaryData] = useState([]);
    const [tertiaryData, setTertiaryData] = useState([]);
    const [selectedPrimaryRow, setSelectedPrimaryRow] = useState(null);
    const [selectedSecondaryRow, setSelectedSecondaryRow] = useState(null);
    const [groupSelectedTree, setGroupSelectedTree] = useState([]);

    // Initialize data when component mounts
    useEffect(() => {
        // Set initial primary data
        setPrimaryData(mockData.primaryTable);
        // Select first row in primary table
        if (mockData.primaryTable.length > 0) {
            const firstRow = mockData.primaryTable[0];
            setSelectedPrimaryRow(firstRow);
        }
    }, []);
    useEffect(() => {
        if (selectedTree) {
            setGroupSelectedTree(selectedTree);
        }
    }, [selectedTree]);

    // Handle tree selection
    useEffect(() => {
        if (groupSelectedTree && groupSelectedTree.id) {
            let filteredData = [];

            // Case 1: "All" is selected
            if (groupSelectedTree.id === '1') {
                filteredData = [...mockData.primaryTable];
            }
            // Case 2: Category is selected
            else if (typeof groupSelectedTree.id === 'string' && groupSelectedTree.id.startsWith('1-') && !groupSelectedTree.data) {
                filteredData = mockData.primaryTable.filter(
                    item => item.category.toLowerCase().includes(groupSelectedTree.name.toLowerCase())
                );
            }
            // Case 3: Item is selected
            else if (groupSelectedTree.data) {
                filteredData = mockData.primaryTable.filter(
                    item => item.name.toLowerCase().includes(groupSelectedTree.data.name.toLowerCase())
                );
            }

            // Update primary data with filtered results
            setPrimaryData(filteredData);

            // Update selection if there are results
            if (filteredData.length > 0) {
                setSelectedPrimaryRow(filteredData[0]);
            } else {
                setSelectedPrimaryRow(null);
                setSecondaryData([]);
                setTertiaryData([]);
            }
        }
    }, [groupSelectedTree]);

    // Handle primary row selection
    useEffect(() => {
        if (selectedPrimaryRow) {
            // Get related secondary items
            const relatedItems = getRelatedSecondaryItems(selectedPrimaryRow.id);
            setSecondaryData(relatedItems);
            if (relatedItems.length > 0) {
                setSelectedSecondaryRow(relatedItems[0]);
            } else {
                setSelectedSecondaryRow(null);
            }
        } else {
            setSecondaryData([]);
            setTertiaryData([]);
        }
    }, [selectedPrimaryRow]);

    // Handle secondary row selection
    useEffect(() => {
        if (selectedSecondaryRow) {
            // Get related tertiary items
            const relatedItems = getRelatedTertiaryItems(selectedSecondaryRow.id);
            setTertiaryData(relatedItems);
        } else {
            setTertiaryData([]);
        }
    }, [selectedSecondaryRow]);

    const handlePrimaryRowClick = (row) => {
        setSelectedPrimaryRow(row);
        setSelectedSecondaryRow(null);
    };

    const handleSecondaryRowClick = (row) => {
        setSelectedSecondaryRow(row);
    };

    return (
        <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Paper elevation={3} sx={{ height: '350px', overflow: 'hidden' }}>
                <DataTable
                    data={primaryData}
                    title="Primary Table"
                    onRowClick={handlePrimaryRowClick}
                    selectedRow={selectedPrimaryRow}
                />
            </Paper>
            <Paper elevation={3} sx={{ height: '350px', overflow: 'hidden' }}>
                <DataTable
                    data={secondaryData}
                    title="Secondary Table"
                    onRowClick={handleSecondaryRowClick}
                    selectedRow={selectedSecondaryRow}
                />
            </Paper>
            <Paper elevation={3} sx={{ height: '350px', overflow: 'hidden' }}>
                <DataTable
                    data={tertiaryData}
                    title="Tertiary Table"
                />
            </Paper>
        </Box>
    );
};

export default TableGroup; 