import React, { useState } from "react";
// import { alpha, makeStyles } from "@material-ui/core/styles";
import { styled, useTheme } from "@mui/material/styles";
import { Link } from "react-router-dom";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
// import AppBar from "@material-ui/core/AppBar";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PermContactCalendarIcon from "@mui/icons-material/PermContactCalendar";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
// import SearchIcon from "@material-ui/icons/Search";
// import InputBase from "@material-ui/core/InputBase";
import MuiAppBar from "@mui/material/AppBar";
import "./Navigation.css";
import Content from "./Content";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(9)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

function Navigation(props) {
  // const classes = useStyles();
  const theme = useTheme();
  let firstPathName = window.location.pathname.split("/");
  let [page, setPage] = useState(firstPathName[1]);
  if (!page) {
    setPage("dashboard");
  }
  let pageTitle = page.charAt(0).toUpperCase() + page.slice(1);

  const [openNavBar, setOpenNavBar] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpenNavBar(true);
  };

  const handleDrawerClose = () => {
    setOpenNavBar(false);
  };

  return (
    <React.Fragment>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar position="fixed" open={openNavBar}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{
                marginRight: "36px",
                ...(openNavBar && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              noWrap
              component="div"
              className="page-title"
            >
              {pageTitle}
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={openNavBar}>
          <DrawerHeader>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "ltr" ? (
                <ChevronLeftIcon />
              ) : (
                <ChevronRightIcon />
              )}
            </IconButton>
          </DrawerHeader>

          <Divider />
          <List>
            <Link to="/user" onClick={() => setPage("user")}>
              <ListItem button>
                <ListItemIcon>
                  <AccountCircleIcon />
                </ListItemIcon>
                <ListItemText primary="User" />
              </ListItem>
            </Link>
            <Link to="/dashboard" onClick={() => setPage("dashboard")}>
              <ListItem button>
                <ListItemIcon>
                  <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="Dashboard" />
              </ListItem>
            </Link>
            <Link to="/contact" onClick={() => setPage("contact")}>
              <ListItem button>
                <ListItemIcon>
                  <PermContactCalendarIcon />
                </ListItemIcon>
                <ListItemText primary="Contact" />
              </ListItem>
            </Link>
            <Link to="/calendar" onClick={() => setPage("calendar")}>
              <ListItem button>
                <ListItemIcon>
                  <CalendarTodayIcon />
                </ListItemIcon>
                <ListItemText primary="Calendar" />
              </ListItem>
            </Link>
          </List>
        </Drawer>

        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <DrawerHeader />
          <Content />
        </Box>
      </Box>
    </React.Fragment>
  );
}

export default Navigation;
