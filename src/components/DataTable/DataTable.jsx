import React, { useState } from 'react';
import {
    Box,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Typography,
    IconButton,
    Collapse,
    TableSortLabel,
    Fade,
    useTheme,
} from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import SearchIcon from '@mui/icons-material/Search';

const DataTable = ({ title, data, onRowClick, selectedRow }) => {
    const theme = useTheme();
    const [searchTerm, setSearchTerm] = useState('');
    const [expandedRows, setExpandedRows] = useState({});
    const [orderBy, setOrderBy] = useState('');
    const [order, setOrder] = useState('asc');

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleToggleRow = (rowId) => {
        setExpandedRows((prev) => ({
            ...prev,
            [rowId]: !prev[rowId],
        }));
    };

    const handleSort = (property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const filteredData = data.filter((row) =>
        Object.values(row).some((value) =>
            String(value).toLowerCase().includes(searchTerm.toLowerCase())
        )
    );

    const sortedData = [...filteredData].sort((a, b) => {
        if (!orderBy) return 0;
        const aValue = a[orderBy];
        const bValue = b[orderBy];
        if (order === 'asc') {
            return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
        } else {
            return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
        }
    });

    const selectedRowStyle = {
        backgroundColor: '#1976d2 !important',
        color: '#ffffff !important',
        '&:hover': {
            backgroundColor: '#1565c0 !important',
        },
        '& .MuiTableCell-root': {
            color: '#ffffff !important',
        },
    };

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
                    />
                </Box>
                <TableContainer sx={{ flexGrow: 1, overflowX: 'auto', minWidth: 1000 }}>
                    <Table stickyHeader>
                        <TableHead>
                            <TableRow>
                                <TableCell padding="checkbox" />
                                {Object.keys(data[0] || {}).map((key) => (
                                    <TableCell key={key}>
                                        <TableSortLabel
                                            active={orderBy === key}
                                            direction={orderBy === key ? order : 'asc'}
                                            onClick={() => handleSort(key)}
                                        >
                                            {key}
                                        </TableSortLabel>
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {sortedData.map((row, index) => (
                                <React.Fragment key={index}>
                                    <TableRow
                                        hover
                                        onClick={() => onRowClick?.(row)}
                                        selected={selectedRow?.id === row.id}
                                        sx={selectedRow?.id === row.id ? selectedRowStyle : {}}
                                    >
                                        <TableCell padding="checkbox">
                                            <IconButton
                                                size="small"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleToggleRow(row.id);
                                                }}
                                            >
                                                {expandedRows[row.id] ? (
                                                    <KeyboardArrowUpIcon />
                                                ) : (
                                                    <KeyboardArrowDownIcon />
                                                )}
                                            </IconButton>
                                        </TableCell>
                                        {Object.values(row).map((value, cellIndex) => (
                                            <TableCell key={cellIndex}>{value}</TableCell>
                                        ))}
                                    </TableRow>
                                    <TableRow>
                                        <TableCell
                                            style={{ paddingBottom: 0, paddingTop: 0 }}
                                            colSpan={Object.keys(row).length + 1}
                                        >
                                            <Collapse in={expandedRows[row.id]} timeout="auto" unmountOnExit>
                                                <Box sx={{ margin: 1 }}>
                                                    <Typography variant="h6" gutterBottom component="div">
                                                        Details
                                                    </Typography>
                                                    <Table size="small">
                                                        <TableBody>
                                                            {Object.entries(row).map(([key, value]) => (
                                                                <TableRow
                                                                    key={key}
                                                                    sx={selectedRow?.id === row.id ? selectedRowStyle : {}}
                                                                >
                                                                    <TableCell component="th" scope="row">
                                                                        {key}
                                                                    </TableCell>
                                                                    <TableCell>{value}</TableCell>
                                                                </TableRow>
                                                            ))}
                                                        </TableBody>
                                                    </Table>
                                                </Box>
                                            </Collapse>
                                        </TableCell>
                                    </TableRow>
                                </React.Fragment>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </Fade>
    );
};

export default DataTable; 