import { Stack, Typography } from "@mui/material";

const IconText = ({text, children}) => {
    return (
        <Stack alignItems="center" direction="row" gap={2}>
            {children}
            <Typography variant="body1">{text}</Typography>
        </Stack>
    )
}

export default IconText;
