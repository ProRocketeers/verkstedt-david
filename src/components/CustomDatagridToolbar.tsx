import { GridToolbarContainer, GridToolbarQuickFilter, GridToolbarFilterButton } from '@mui/x-data-grid';
export function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarFilterButton />
      <GridToolbarQuickFilter />
    </GridToolbarContainer>
  );
}