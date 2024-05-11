import { Link, Stack, Typography } from "@mui/material";

const IconText = ({text, children, isTextUrl = false}) => {
    let textJsx;
    if (isTextUrl) {
        textJsx = <Link href={text} variant="body1">{text}</Link>
    } else {
        textJsx = <Typography variant="body1">{text}</Typography>
    }

    return (
        <Stack alignItems="center" direction="row" gap={2}>
            {children}
            {textJsx}
        </Stack>
    )
}

export default IconText;
