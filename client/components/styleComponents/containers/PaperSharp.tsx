import { Paper, styled } from "@mui/material";

const customColors = {
  primary: "#d0ffe0",
  borderColor: "#ce0621",
};

const PaperSharp = styled(Paper)(({ theme }) => ({
  background: `${customColors.primary} !important`,
  border: `1px solid ${customColors.borderColor}`,
  borderRadius: "0",
}));

export default PaperSharp;
