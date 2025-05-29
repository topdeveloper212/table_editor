// Mock data structure for the application
export const mockData = {
    // Primary table data
    primaryTable: [
        {
            id: 1,
            name: 'Item 1',
            category: 'Category A',
            description: 'Description for Item 1',
            status: 'Active',
            date: '2024-03-20',
            relatedItems: [101, 102], // IDs of related items in secondary table
        },
        {
            id: 2,
            name: 'Item 2',
            category: 'Category A',
            description: 'Description for Item 2',
            status: 'Inactive',
            date: '2024-03-19',
            relatedItems: [103],
        },
        {
            id: 3,
            name: 'Item 3',
            category: 'Category B',
            description: 'Description for Item 3',
            status: 'Active',
            date: '2024-03-18',
            relatedItems: [104, 105],
        },
        {
            id: 4,
            name: 'Item 4',
            category: 'Category B',
            description: 'Description for Item 4',
            status: 'Pending',
            date: '2024-03-17',
            relatedItems: [106],
        },
        {
            id: 5,
            name: 'Item 5',
            category: 'Category C',
            description: 'Description for Item 5',
            status: 'Active',
            date: '2024-03-16',
            relatedItems: [107, 108],
        },
    ],

    // Secondary table data
    secondaryTable: [
        {
            id: 101,
            name: 'Item 1',
            category: 'Category A',
            description: 'Description for Sub Item 1',
            status: 'Active',
            date: '2024-03-20',
            relatedItems: [201, 202], // IDs of related items in tertiary table
        },
        {
            id: 102,
            name: 'Item 1',
            category: 'Category A',
            description: 'Description for Sub Item 1',
            status: 'Inactive',
            date: '2024-03-19',
            relatedItems: [203],
        },
        {
            id: 103,
            name: 'Item 2',
            category: 'Category A',
            description: 'Description for Sub Item 2',
            status: 'Active',
            date: '2024-03-18',
            relatedItems: [204],
        },
        {
            id: 104,
            name: 'Item 3',
            category: 'Category B',
            description: 'Description for Sub Item 3',
            status: 'Pending',
            date: '2024-03-17',
            relatedItems: [205],
        },
        {
            id: 105,
            name: 'Item 3',
            category: 'Category B',
            description: 'Description for Sub Item 3',
            status: 'Active',
            date: '2024-03-16',
            relatedItems: [206],
        },
    ],

    // Tertiary table data
    tertiaryTable: [
        {
            id: 201,
            name: 'Item 1',
            category: 'Category A',
            description: 'Description for Detail Item 1',
            status: 'Active',
            date: '2024-03-20',
        },
        {
            id: 202,
            name: 'Item 1',
            category: 'Category A',
            description: 'Description for Detail Item 1',
            status: 'Inactive',
            date: '2024-03-19',
        },
        {
            id: 203,
            name: 'Item 1',
            category: 'Category A',
            description: 'Description for Detail Item 1',
            status: 'Active',
            date: '2024-03-18',
        },
        {
            id: 204,
            name: 'Item 2',
            category: 'Category B',
            description: 'Description for Detail Item 2',
            status: 'Pending',
            date: '2024-03-17',
        },
        {
            id: 205,
            name: 'Item 3',
            category: 'Category C',
            description: 'Description for Detail Item 3',
            status: 'Active',
            date: '2024-03-16',
        },
    ],
};

// Helper functions to get related data
export const getRelatedSecondaryItems = (primaryItemId) => {
    const primaryItem = mockData.primaryTable.find(item => item.id === primaryItemId);
    if (!primaryItem) return [];
    return mockData.secondaryTable.filter(item => primaryItem.relatedItems.includes(item.id));
};

export const getRelatedTertiaryItems = (secondaryItemId) => {
    const secondaryItem = mockData.secondaryTable.find(item => item.id === secondaryItemId);
    if (!secondaryItem) return [];
    return mockData.tertiaryTable.filter(item => secondaryItem.relatedItems.includes(item.id));
};

// Helper function to get all categories for TreeView
export const getCategories = () => {
    const categories = new Set(mockData.primaryTable.map(item => item.category));
    return Array.from(categories);
};

// Helper function to get items by category
export const getItemsByCategory = (category) => {
    return mockData.primaryTable.filter(item => item.category === category);
}; 