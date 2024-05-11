import { CardContent, styled } from "@mui/material";

  const CentredCardContent = styled(CardContent)(`
  padding: 16px;
  &:last-child {
    padding-bottom: 16px;
  }`);

  export default CentredCardContent;