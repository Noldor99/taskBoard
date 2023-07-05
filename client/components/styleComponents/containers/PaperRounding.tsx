import { Paper, styled } from "@mui/material";

const PaperRounding = styled(Paper)(({ theme }) => ({
  background: "#f1f1f1 !important",
  border: "1px solid #eaeaea",
  boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1) !important",
  borderRadius: "12px",
}));

export default PaperRounding;
