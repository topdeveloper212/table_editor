import React, { useState } from 'react';
import {
    Box,
    Typography,
    TextField,
    Fade,
    useTheme,
} from '@mui/material';
import { DataGridPremium } from '@mui/x-data-grid-premium';
import SearchIcon from '@mui/icons-material/Search';

const DataTable = ({ title, data, onRowClick, selectedRow }) => {
    const theme = useTheme();
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    // Generate columns from the first data item
    const columns = data.length > 0
        ? Object.keys(data[0]).map((key) => ({
            field: key,
            headerName: key.charAt(0).toUpperCase() + key.slice(1),
            flex: 1,
            minWidth: 150,
            sortable: true,
            filterable: true,
        }))
        : [];

    // Filter data based on search term
    const filteredData = data.filter((row) =>
        Object.values(row).some((value) =>
            String(value).toLowerCase().includes(searchTerm.toLowerCase())
        )
    );

    return (
        <Fade in={true} timeout={500}>
            <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="h6">{title}</Typography>
                    <TextField
                        size="small"
                        placeholder="Search..."
                        value={searchTerm}
                        onChange={handleSearch}
                        sx={{ width: '200px' }}
                        InputProps={{
                            startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />,
                        }}
                    />
                </Box>
                <Box sx={{ flexGrow: 1, width: '100%' }}>
                    <DataGridPremium
                        rows={filteredData}
                        columns={columns}
                        density="comfortable"
                        initialState={{
                            pagination: {
                                paginationModel: { pageSize: 10, page: 0 },
                            },
                            sorting: {
                                sortModel: [{ field: columns[0]?.field || '', sort: 'asc' }],
                            },
                        }}
                        pageSizeOptions={[10, 25, 50]}
                        onRowClick={(params) => onRowClick?.(params.row)}
                        rowSelection={false}
                        disableRowSelectionOnClick
                        getRowClassName={(params) =>
                            selectedRow?.id === params.row.id ? 'selected-row' : ''
                        }
                        sx={{
                            '& .selected-row': {
                                backgroundColor: theme.palette.primary.main,
                                color: theme.palette.primary.contrastText,
                                '&:hover': {
                                    backgroundColor: theme.palette.primary.dark,
                                },
                            },
                            '& .MuiDataGrid-cell:focus': {
                                outline: 'none',
                            },
                        }}
                        components={{
                            Toolbar: () => null, // Hide default toolbar
                        }}
                        features={[
                            'columnResize',
                            'columnReorder',
                            'columnPinning',
                            'rowGrouping',
                            'aggregation',
                            'filtering',
                            'export',
                        ]}
                    />
                </Box>
            </Box>
        </Fade>
    );
};

export default DataTable;