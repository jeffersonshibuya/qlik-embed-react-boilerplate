# Enhanced Qlik Data Table

This enhanced data table implementation demonstrates the full capabilities of the [Dice UI Data Table](https://www.diceui.com/docs/components/data-table) components with your existing Qlik Sense integration.

## Features Implemented

### 🔍 Advanced Filtering
- **Filter Menu**: Command palette-style interface for quick filter management
- **Filter List**: Visual list of applied filters with drag-and-drop reordering
- **Multiple Filter Types**:
  - Text search (Work Order, Description)
  - Multi-select dropdowns (Status, Type, Program, Work Group)
  - Date range filters (Status Date)

### 📊 Sorting & Organization
- **Sort List**: Multi-column sorting with drag-and-drop reordering
- **Column Headers**: Clickable headers with sort indicators
- **Initial Sorting**: Default sort by Work Order number

### 🎨 Enhanced UI Components
- **Badges**: Status indicators with color coding and icons
- **Icons**: Lucide React icons for better visual hierarchy
- **Action Menu**: Dropdown menu for row actions
- **Checkboxes**: Row selection with bulk actions

### ⚡ Interactive Features
- **Row Selection**: Select individual or all rows
- **Action Bar**: Floating toolbar for bulk operations on selected rows
- **Column Pinning**: Actions column pinned to the right
- **View Options**: Show/hide columns dynamically

### 📱 Responsive Design
- **Mobile Friendly**: Responsive layout that works on all screen sizes
- **Loading States**: Skeleton loading components
- **Error Handling**: Graceful error handling with reconnect functionality

## Implementation Details

### Data Fetching
The component uses your existing `fetchTableRowsPage` function to retrieve data from Qlik Sense:

```typescript
const { count, rows, totalRows } = await fetchTableRowsPage<QlikDataTableResponseType[]>({
  qDoc,
  tableObjectId: "QyKt",
  page: 1,
  pageSize: 1000, // Fetch more data for client-side filtering
});
```

### Column Definitions
Each column is configured with metadata for filtering and display:

```typescript
{
  id: "status",
  accessorKey: "status",
  header: ({ column }) => (
    <DataTableColumnHeader column={column} title="Status" />
  ),
  cell: ({ cell }) => {
    const status = cell.getValue<QlikDataTableType["status"]>();
    return (
      <Badge variant={getStatusVariant(status)} className="capitalize">
        {getStatusIcon(status)}
        {status}
      </Badge>
    );
  },
  meta: {
    label: "Status",
    variant: "multiSelect",
    options: [
      { label: "Completed", value: "Completed", icon: CheckCircle },
      { label: "In Progress", value: "In Progress", icon: Clock },
      // ... more options
    ],
  },
  enableColumnFilter: true,
}
```

### Filter Variants Used
- **`text`**: For Work Order and Description fields
- **`multiSelect`**: For Status, Type, Program, and Work Group fields
- **`dateRange`**: For Status Date field

### State Management
The component uses `nuqs` for URL-based state management, making filters and sorting shareable via URL:

```typescript
const [statusFilter] = useQueryState(
  "status",
  parseAsArrayOf(parseAsString).withDefault([])
);
```

## Usage

### Basic Usage
```tsx
import EnhancedDataTable from "@/features/qlik-data/components/enhanced-data-table";

export default function MyPage() {
  return <EnhancedDataTable />;
}
```

### With Custom Configuration
```tsx
const { table } = useDataTable({
  data: filteredData,
  columns,
  pageCount: Math.ceil(filteredData.length / 10),
  initialState: {
    sorting: [{ id: "WO", desc: false }],
    columnPinning: { right: ["actions"] },
  },
  getRowId: (row) => row.WO,
  enableAdvancedFilter: true,
});
```

## Keyboard Shortcuts

The data table supports the following keyboard shortcuts:
- **F**: Opens the filter menu
- **Shift + F**: Removes the last applied filter
- **S**: Opens the sort menu
- **Shift + S**: Removes the last applied sort
- **Backspace/Delete**: Removes focused filter/sort item

## Customization

### Adding New Columns
1. Define the column in the `columns` array
2. Add appropriate metadata for filtering
3. Configure the cell renderer for display
4. Update the data transformation if needed

### Custom Filter Options
```typescript
meta: {
  label: "Custom Field",
  variant: "multiSelect",
  options: [
    { label: "Option 1", value: "option1", icon: CustomIcon },
    { label: "Option 2", value: "option2", icon: AnotherIcon },
  ],
}
```

### Custom Cell Renderers
```typescript
cell: ({ cell }) => {
  const value = cell.getValue();
  return (
    <div className="custom-cell">
      <CustomComponent value={value} />
    </div>
  );
}
```

## Performance Considerations

- **Client-side Filtering**: Data is fetched once and filtered client-side for better performance
- **Virtual Scrolling**: Large datasets are handled efficiently
- **Debounced Updates**: Filter changes are debounced to prevent excessive re-renders
- **Memoized Components**: Heavy computations are memoized

## Troubleshooting

### Common Issues

1. **Data Not Loading**: Check Qlik connection and table object ID
2. **Filters Not Working**: Ensure column metadata is properly configured
3. **Performance Issues**: Consider reducing initial data fetch size
4. **Styling Issues**: Verify Tailwind CSS classes are available

### Debug Mode
The component includes a reconnect button for debugging Qlik connection issues.

## Dependencies

- [@tanstack/react-table](https://tanstack.com/table/v8) - Table functionality
- [nuqs](https://nuqs.vercel.app/) - URL state management
- [lucide-react](https://lucide.dev/) - Icons
- [date-fns](https://date-fns.org/) - Date formatting
- [Dice UI Data Table](https://www.diceui.com/docs/components/data-table) - UI components

## Related Files

- `enhanced-data-table.tsx` - Main component implementation
- `list.tsx` - Basic data table implementation
- `columns.tsx` - Column definitions
- `types.ts` - TypeScript type definitions
- `fetch-table-rows-page.ts` - Qlik data fetching logic
