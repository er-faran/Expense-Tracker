import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const CommonDialog = ({
  title = "Dialog Title",
  dialogSubtitle = "Dialog Sub Title",
  buttonLabel = "Dialog Open",
  open,
  setOpen,
  cancelLabel = "Cancel",
  submitLabel = "Submit",
  handleCancel,
  handelSubmit,
  handleClickOpen,
}) => {
  const handleClickOpenLoacal = () => {
    handleClickOpen();
  };

  const handleCloseLocal = (target = "cancel") => {
    if (target === "submit") {
      handelSubmit();
    } else {
      handleCancel();
    }
  };

  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpenLoacal}>
        {buttonLabel}
      </Button>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {dialogSubtitle}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleCloseLocal("cancel")}>
            {cancelLabel}
          </Button>
          <Button onClick={() => handleCloseLocal("submit")} autoFocus>
            {submitLabel}
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default CommonDialog;
