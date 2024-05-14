/**
 * @author Nathan Wise
 */
import CodeIcon from '@mui/icons-material/Code';
import StarIcon from '@mui/icons-material/Star';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import GroupsIcon from '@mui/icons-material/Groups';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

function getRoleIcon(role) {
    const sanitisedRole = role.toLowerCase();

    if (sanitisedRole == "founder") {
        return <StarIcon color="warning" />
    } else if (sanitisedRole == "developer") {
        return <CodeIcon />
    } else if (sanitisedRole == "quality assurance") {
        return <AssignmentTurnedInIcon />
    } else if (sanitisedRole == "project manager") {
        return <GroupsIcon />
    } else {
        return <HelpOutlineIcon />
    }
}

export { getRoleIcon };