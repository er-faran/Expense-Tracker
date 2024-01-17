import dayjs from "dayjs";
import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import GeneralDateTimePicker from "../common/GeneralDateTimePicker";
import MultiSelectDropdown from "../common/MultiSelectDropdown";
import { TextareaAutosize as BaseTextareaAutosize } from "@mui/base/TextareaAutosize";

export default function NewRecord({
  data = {},
  setData = () => {},
  handleSubmit = () => {},
}) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  React.useEffect(() => {
    if (open) {
      setData({ ...data, id: dayjs()?.valueOf() });
    }
  }, [open]);

  return (
    <React.Fragment>
      <Button
        variant="text"
        onClick={handleClickOpen}
        className="bg-blue-500 text-white font-medium hover:bg-blue-400"
      >
        New
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: (event) => {
            event.preventDefault();
            handleSubmit();
            handleClose();
          },
        }}
      >
        <DialogTitle>New Expense</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please fill all mandatory field(s) to add New Expense.
          </DialogContentText>
          <div>
            <label>
              Amount <span className="required-icon">*</span>
            </label>
            <TextField
              autoFocus
              required
              margin="dense"
              id="amount"
              name="amount"
              type="number"
              fullWidth
              className="m-0 p-0"
              onChange={(e) => setData({ ...data, amount: e.target.value })}
            />
          </div>
          <div>
            <label>
              Category <span className="required-icon">*</span>
            </label>
            <MultiSelectDropdown
              id="category"
              name="category"
              onChange={(items) => setData({ ...data, expenseCategory: items })}
              options={[
                { title: "Learning", id: 0 },
                { title: "Food", id: 1 },
                { title: "Cloth", id: 2 },
                { title: "Family", id: 3 },
                { title: "Gadgets", id: 4 },
                { title: "Home", id: 5 },
                { title: "Charity", id: 6 },
                { title: "Travel", id: 7 },
                { title: "Other", id: 8 },
              ]}
            />
          </div>
          <div className="date-time-picker-container">
            <label>
              Date and Time <span className="required-icon">*</span>
            </label>
            <GeneralDateTimePicker
              onChange={(item) =>
                setData({ ...data, date: item?.date, time: item?.time })
              }
              id="date-time"
              name="date-time"
            />
          </div>
          <div>
            <label>Notes</label>
            <BaseTextareaAutosize
              className="border w-full"
              minRows={4}
              placeholder="Type Here"
              onChange={(e) => setData({ ...data, notes: e.target.value })}
              id="notes"
              name="notes"
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Create</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
