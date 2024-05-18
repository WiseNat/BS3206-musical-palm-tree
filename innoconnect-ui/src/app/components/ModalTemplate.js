/**
 * @author Tom Shortridge
 */

import { Box, Modal } from "@mui/material";

export default function ModalTemplate({ open, handleClose, children }) {
  const modalBoxCSS = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={modalBoxCSS}>{children}</Box>
    </Modal>
  );
}
