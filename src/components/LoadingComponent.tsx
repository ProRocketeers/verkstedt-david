import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

export function LoadingComponent() {
  return (
    <Box sx={{ margin: "0 auto" }}>
      <CircularProgress />
    </Box>
  );
}
