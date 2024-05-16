/**
 * @author Nathan Wise
 */
import { Link, Stack, Typography } from "@mui/material";

const IconText = ({text, children, isTextUrl = false}) => {
    let textJsx;
    if (isTextUrl) {
        textJsx = <Link href={text}>{text}</Link>
    } else {
        textJsx = <Typography>{text}</Typography>
    }

    return (
        <Stack alignItems="center" direction="row" gap={2}>
            {children}
            {textJsx}
        </Stack>
    )
}

export default IconText;
