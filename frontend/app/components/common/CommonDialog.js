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
      {/* <Button variant="outlined">{buttonLabel}</Button> */}
      <button
        className="bg-primary-background text-primary-light px-3 py-2 rounded-md"
        onClick={handleClickOpenLoacal}
      >
        {buttonLabel}
      </button>
      <Dialog
        open={open}
        onClose={() => handleCloseLocal("cancel")}
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
