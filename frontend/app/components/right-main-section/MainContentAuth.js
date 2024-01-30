"use client";
import React, { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import SecurityIcon from "@mui/icons-material/Security";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import { toast } from "react-toastify";
import { APIEndpoints } from "@/app/api/APIEndpoints";
import CommonDialog from "../common/CommonDialog";
import { logoutHandler } from "../common/utils";

const MainContentAuth = ({ loggedInUserDetails = null, setSelectedTabId }) => {
  const [flow, setFlow] = useState(loggedInUserDetails ? "logout" : "login");
  const [openLogoutDialog, setOpenLogoutDialog] = useState(false);
  const [logoutSucess, setLogoutSucess] = useState(false);
  const loginFormInitialData = {
    email: null,
    password: null,
  };
  const registerFormInitialData = {
    name: null,
    email: null,
    password: null,
  };

  useEffect(() => {
    if (loggedInUserDetails?.result?._id) {
      setFlow("logout");
    } else {
      setFlow("login");
    }
  }, [loggedInUserDetails]);

  const [formDetails, setFormDetails] = useState(
    flow === "login" ? loginFormInitialData : registerFormInitialData
  );
  const [submitRequestLoading, setSubmitRequestLoading] = useState(false);

  const submitFormHandler = async () => {
    setSubmitRequestLoading(true);
    try {
      const url =
        flow === "login"
          ? APIEndpoints?.signinHandler()
          : APIEndpoints?.signupHandler();
      const resp = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formDetails),
      });
      if (resp.status === 201 || resp.status === 200) {
        try {
          const data = await resp.json();
          localStorage.setItem("user", JSON.stringify(data));
          console.log("API Resp", data);
          toast(data?.message);
          if (flow === "login") {
            setFormDetails(registerFormInitialData);
            localStorage?.setItem("selectedTab", "1");
            setTimeout(() => {
              setSelectedTabId(1);
            }, 1000);
          } else {
            setFlow("login");
            setFormDetails(loginFormInitialData);
          }
        } catch (error) {
          console.error("Error parsing JSON:", error);
        }
      } else if (resp.status === 401 || resp.status === 403) {
        logoutHandler();
        console.log("frontend error", resp);
      }
    } catch (err) {
      console.log("frontend err", err);
    } finally {
      setSubmitRequestLoading(false);
    }
  };

  useEffect(() => {
    if (logoutSucess) {
      setSelectedTabId("");
      setTimeout(() => {
        setSelectedTabId(5);
        localStorage.setItem("user", null);
      }, 0);
    }
  }, [logoutSucess]);

  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-4xl font-semibold text-primary-background mb-3">
        {flow === "logout"
          ? "Sign Out"
          : flow === "login"
          ? "Sign In"
          : "Sign Up"}
      </h3>
      {flow === "logout" ? (
        <p>
          Ensure your account's safety with a secure logout. Feel free to log in
          again whenever you're ready.
        </p>
      ) : flow === "login" ? (
        <p>
          Securely access your account. Experience hassle-free login with
          advanced security features for a seamless and protected user journey.
        </p>
      ) : (
        <p>
          Unlock a world of possibilities! Register now for exclusive benefits
          and personalized features. Your journey to an enhanced experience
          starts here.
        </p>
      )}
      {flow !== "logout" && (
        <div>
          <Box
            sx={{
              marginTop: 5,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              {flow === "login" ? <LockOutlinedIcon /> : <SecurityIcon />}
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box
              component="form"
              onSubmit={(event) => {
                event?.preventDefault();
                submitFormHandler();
              }}
              noValidate
              sx={{ mt: 1 }}
              maxWidth={450}
            >
              {flow === "registration" && (
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="name"
                  label="Full Name"
                  name="name"
                  autoComplete="name"
                  autoFocus
                  value={formDetails?.name}
                  onChange={(e) =>
                    setFormDetails({ ...formDetails, name: e?.target?.value })
                  }
                />
              )}
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={formDetails?.email}
                onChange={(e) =>
                  setFormDetails({ ...formDetails, email: e?.target?.value })
                }
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={formDetails?.password}
                onChange={(e) =>
                  setFormDetails({ ...formDetails, password: e?.target?.value })
                }
              />
              <button
                type="submit"
                className="bg-primary-background text-primary-light px-3 py-2 rounded-md w-full mt-2 disabled:bg-slate-700"
                disabled={submitRequestLoading}
              >
                {flow === "login" ? "Sign In" : "Sign Up"}
              </button>
              <Grid container>
                <Grid item>
                  <button
                    className="bg-transparent text-primary-background px-3 py-2 rounded-md"
                    onClick={() =>
                      setFlow(flow === "login" ? "registration" : "login")
                    }
                  >
                    {flow === "login"
                      ? "Don't have an account? Sign Up"
                      : "Already have an account? Sign In"}
                  </button>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </div>
      )}
      {flow === "logout" &&
        (logoutSucess ? (
          <div className="flex-1 p-28 flex flex-col gap-5 items-center">
            <p className="text-gray-600 text-4xl font-medium">
              <VerifiedUserIcon className="text-green-800 mb-1" fontSize="75" />{" "}
              You've been logged out successfully!
            </p>
            <div className="mt-6">
              <Button
                variant="outlined"
                color="secondary"
                startIcon={<ExitToAppIcon />}
                onClick={() => setFlow("login")}
              >
                Log In Again
              </Button>
            </div>
          </div>
        ) : (
          <div className="">
            <CommonDialog
              title="Confirm Logout"
              dialogSubtitle="Are you sure you want to log out? Logging out will ensure the security of your account."
              buttonLabel="Logout"
              open={openLogoutDialog}
              setOpen={openLogoutDialog}
              cancelLabel="Cancel"
              submitLabel="Logout"
              handleCancel={() => {
                setLogoutSucess(false);
                setOpenLogoutDialog(false);
              }}
              handelSubmit={() => {
                localStorage.setItem("user", null);
                setLogoutSucess(true);
              }}
              handleClickOpen={() => {
                setOpenLogoutDialog(true);
              }}
            />
          </div>
        ))}
    </div>
  );
};

export default MainContentAuth;
