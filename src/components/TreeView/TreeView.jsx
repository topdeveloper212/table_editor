import React, { useState, useEffect } from 'react';
import {
    Box,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Fade,
    useTheme,
} from '@mui/material';
import { SimpleTreeView, TreeItem } from '@mui/x-tree-view';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { mockData, getCategories, getItemsByCategory } from '../../data/mockData';

const TreeViewComponent = ({ onNodeSelect }) => {
    const theme = useTheme();
    const [selectedOption, setSelectedOption] = useState('option1');
    const [selectedNode, setSelectedNode] = useState(null);
    const [treeData, setTreeData] = useState([]);

    // Initialize tree data when component mounts
    useEffect(() => {
        const initializeTreeData = () => {
            // Get all items from primary table
            const primaryItems = mockData.primaryTable;

            // Create categories from primary table items
            const categories = [...new Set(primaryItems.map(item => item.category))];

            const newTreeData = [
                {
                    id: '1',
                    name: 'All',
                    children: categories.map((category, index) => ({
                        id: `1-${index + 1}`,
                        name: category,
                        children: primaryItems
                            .filter(item => item.category === category)
                            .map((item, subIndex) => ({
                                id: `1-${index + 1}-${subIndex + 1}`,
                                name: item.name,
                                data: item,
                            })),
                    })),
                },
                {
                    id: '2',
                    name: 'Favorites',
                    children: [
                        { id: '2-1', name: 'Favorite 1' },
                        { id: '2-2', name: 'Favorite 2' },
                    ],
                },
            ];
            setTreeData(newTreeData);
        };

        initializeTreeData();
    }, []);

    // Select first node when tree data is loaded
    useEffect(() => {
        if (treeData.length > 0 && !selectedNode) {
            const firstNode = {
                id: treeData[0].id,
                name: treeData[0].name,
                data: treeData[0].data || null
            };
            setSelectedNode(firstNode);
            onNodeSelect(firstNode);
        }
    }, [treeData, selectedNode, onNodeSelect]);

    const renderTree = (nodes) => (
        <TreeItem
            key={nodes.id}
            itemId={nodes.id}
            label={nodes.name}
            onClick={(event) => {
                event.stopPropagation();
                const nodeData = {
                    id: nodes.id || '',
                    name: nodes.name || '',
                    data: nodes.data || null
                };
                setSelectedNode(nodeData);
                onNodeSelect(nodeData);
            }}
            sx={{
                '& .MuiTreeItem-content': {
                    transition: 'all 0.2s ease-in-out',
                    '&:hover': {
                        backgroundColor: 'action.hover',
                    },
                    '&.Mui-selected': {
                        backgroundColor: 'primary.main',
                        color: 'primary.contrastText',
                        '&:hover': {
                            backgroundColor: 'primary.dark',
                        },
                    },
                },
                '& .MuiTreeItem-label': {
                    color: theme.palette.mode === 'dark' ? '#ffffff' : '#000000',
                },
                '& .MuiTreeItem-iconContainer': {
                    transition: 'transform 0.2s ease-in-out',
                    color: theme.palette.mode === 'dark' ? '#ffffff' : '#000000',
                },
            }}
        >
            {Array.isArray(nodes.children)
                ? nodes.children.map((node) => renderTree(node))
                : null}
        </TreeItem>
    );

    return (
        <Fade in={true} timeout={500}>
            <Box sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                p: 2,
                bgcolor: 'background.paper',
                borderRadius: 1,
                boxShadow: '2px 2px 7px -1px #beb4a0'
            }}>
                <SimpleTreeView
                    slots={{
                        collapseIcon: ExpandMoreIcon,
                        expandIcon: ChevronRightIcon,
                    }}
                    sx={{
                        flexGrow: 1,
                        overflowY: 'auto',
                        '& .MuiTreeItem-root': {
                            transition: 'all 0.2s ease-in-out',
                        },
                        '& .MuiSvgIcon-root': {
                            color: theme.palette.mode === 'dark' ? '#ffffff' : '#000000',
                        },
                    }}
                    defaultExpanded={['1']}
                    selected={selectedNode?.id}
                >
                    {treeData.map((node) => renderTree(node))}
                </SimpleTreeView>
            </Box>
        </Fade>
    );
};

export default TreeViewComponent; 