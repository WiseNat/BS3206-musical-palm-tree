/**
 * @author Tom Shortridge
 */
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";

export default function LabelSwitch({ label, action, checked, disabled }) {
  return (
    <FormGroup>
      <FormControlLabel
        control={
          <Switch onChange={action} checked={checked} disabled={disabled} />
        }
        label={label}
      />
    </FormGroup>
  );
}
