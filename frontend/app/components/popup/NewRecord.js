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
import GeneralSelect from "../common/GeneralSelect";

export default function NewRecord({
  data = {},
  setData = () => {},
  handleSubmit = () => {},
  openPopup = false,
  setOpenPopup,
  viewTransactionItem,
}) {
  // const [open, setOpen] = React.useState(openPopup);

  const handleClickOpen = () => {
    setOpenPopup(true);
  };

  const handleClose = () => {
    setOpenPopup(false);
  };

  const [popupState, setPopupState] = React.useState("new"); //new, view, update

  React.useEffect(() => {
    if (viewTransactionItem?.id && openPopup) {
      setPopupState("view");
    }
    setData({
      ...data,
      id: viewTransactionItem?.id || data?.id || dayjs()?.valueOf(),
    });
  }, [openPopup, viewTransactionItem]);

  return (
    <React.Fragment>
      <Dialog
        open={openPopup}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: (event) => {
            event.preventDefault();
            handleSubmit(popupState);
          },
        }}
      >
        <div className="flex justify-between items-center mr-5">
          <DialogTitle className="!font-semibold !text-2xl">
            {popupState === "update"
              ? "Update Expense"
              : popupState === "view"
              ? "View Expense"
              : "New Expense"}
          </DialogTitle>
          {popupState === "view" && (
            <button
              className="bg-primary-background text-primary-light text-xs px-3 py-2 rounded-md"
              onClick={() => setPopupState("update")}
            >
              Update
            </button>
          )}
        </div>

        <hr />
        <DialogContent>
          {popupState !== "view" && (
            <DialogContentText className="!text-xs">
              {`Please fill all mandatory field(s) to ${
                popupState === "update" ? "Update" : "Add New"
              } Expense.`}
            </DialogContentText>
          )}
          <div>
            <label>
              Amount <span className="required-icon">*</span>
            </label>
            <TextField
              disabled={popupState === "view"}
              value={data?.amount}
              autoFocus
              required
              margin="dense"
              id="amount"
              name="amount"
              type="number"
              fullWidth
              className="m-0 p-0"
              onChange={(e) => setData({ ...data, amount: e.target.value })}
              placeholder="100"
            />
          </div>
          <div>
            <label>
              Category <span className="required-icon">*</span>
            </label>
            <GeneralSelect
              placeholder="Learning"
              disabled={popupState === "view"}
              value={data?.expenseCategory || null}
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
              disabled={popupState === "view"}
              value={data?.dateEvent}
              onChange={(item) =>
                setData({
                  ...data,
                  date: item?.date,
                  time: item?.time,
                  dateEvent: item?.dateEvent,
                })
              }
              id="date-time"
              name="date-time"
            />
          </div>
          <div>
            <label>Notes</label>
            <BaseTextareaAutosize
              disabled={popupState === "view"}
              value={data?.notes}
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
          <button
            className="bg-transparent text-primary-background px-3 py-2 rounded-md"
            onClick={handleClose}
          >
            Cancel
          </button>
          <button
            className="bg-primary-background text-primary-light px-3 py-2 rounded-md"
            type="submit"
          >
            {popupState === "view"
              ? "Delete"
              : popupState === "update"
              ? "Update"
              : "Create"}
          </button>
          {/* <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Create</Button> */}
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
