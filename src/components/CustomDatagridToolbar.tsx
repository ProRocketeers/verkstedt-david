import {
  GridToolbarContainer,
  GridToolbarQuickFilter,
  GridToolbarFilterButton,
} from "@mui/x-data-grid";
export function CustomToolbar() {
  return (
    <GridToolbarContainer
      style={{ display: "flex", justifyContent: "space-between" }}
    >
      <GridToolbarFilterButton />
      <GridToolbarQuickFilter style={{ marginRight: 5 }} />
    </GridToolbarContainer>
  );
}
