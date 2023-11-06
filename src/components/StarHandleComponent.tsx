import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";

export function StarHandleComponent(fullIcon: boolean, onClick: () => void) {
  return fullIcon ? (
    <StarIcon
      onClick={onClick}
      className="pointer"
      style={{ color: "#008fe1" }}
    />
  ) : (
    <StarBorderIcon onClick={onClick} className="pointer" />
  );
}
