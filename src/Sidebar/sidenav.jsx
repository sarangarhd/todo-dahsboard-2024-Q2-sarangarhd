import * as React from "react";
import { useState, useEffect } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import IconButton from "@mui/material/IconButton";
import NotificationsIcon from "@mui/icons-material/Notifications";
import CloseIcon from "@mui/icons-material/Close";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Avatar from "@mui/material/Avatar";
import TaskList from "../Pages/TaskList";
import PriorityBarGraph from "../Pages/PriorityBarGraph";

const drawerWidth = 240;

const theme = createTheme({
  palette: {
    primary: {
      main: "#33074F",
    },
    secondary: {
      main: "#EBE6ED",
    },
  },
});

export default function Sidenav() {
  const [isWelcomeVisible, setIsWelcomeVisible] = useState(true);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleCloseWelcome = () => {
    setIsWelcomeVisible(false);
  };

  const activityFeed = [
    {
      avatar:
        "https://s3-alpha-sig.figma.com/img/0884/8f02/aab1712f77682fe57823369f4f50e05d?Expires=1718582400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=cuGjcOY4QSBEmrRNDLPlxH2JbnE4QPHeMJ9eGjufkse1Fr5AWtWZ1aMAU7QleOjGdsuO6HjlQtl370C6cOHnRnRG3x~EtdW9ajjnCBbVruLUve09rBi-zboyWsRw0q4M7-DTubHZZmY3a1te4jT9dot5kZLVEGuC8ukA~GCWryvsOrFsinU0YeQ-TPov3TkJEEaM-Ic0BBr3zGoufRQON1g5YkWXqCr9LygaNC7FHRi4P4MgdEfMoPXHz9fw63RyvoNJKuz23U-ZTqFMKmbIkkmmNEjF9D0-qLqNOC0QamGrGesLQXMvHOrY1MM-crlEH-xIgB3Wz~ux3I8g6S6dMQ__",
      name: "Kushantha Charuka",
      activity: "created Contract #00124 need John Beige’s signature",
      time: "Sep 16, 2022 at 11:30 AM",
    },
    {
      avatar:
        "https://s3-alpha-sig.figma.com/img/08fe/4e80/2117b9ef0de4d90324ed8e5420c5b98c?Expires=1718582400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=OFBblI3XPG6FBU5rK2xsoBMALbf~tfi54zgeNOTapkLrrmre0hHgC8HprORg7gIYljA0XM92KVoXSqmCLYCLy3WFXntles4Nzc8EH8RBTVKGX7zGiVSTU5toZvfJf53EU5xlcfZ~bWp-b~QuoVlM6lJ0ENFinjyilypRR4jhm~770t-jZYmdnmz~ls7pLns4~UhO-zq87Nhhdbao-Mwpua5wOHntoxfOgK0E1D-c4WGfOcMCNXw5VIIfouov86OQ8ILbab~U4E2Oz3m~jOp8xR2I8EaHua-aDJBcKA5PePSa2eMwH9IFtwIz54F09xajmJbT6jCXIhc1N64MJFVWug__",
      name: "Lorem ipsum dolor",
      activity: "sit amet, consectetur adipiscing elit.",
      time: "Sep 16, 2022 at 11:45 AM",
    },
    {
      avatar:
        "https://s3-alpha-sig.figma.com/img/08fe/4e80/2117b9ef0de4d90324ed8e5420c5b98c?Expires=1718582400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=OFBblI3XPG6FBU5rK2xsoBMALbf~tfi54zgeNOTapkLrrmre0hHgC8HprORg7gIYljA0XM92KVoXSqmCLYCLy3WFXntles4Nzc8EH8RBTVKGX7zGiVSTU5toZvfJf53EU5xlcfZ~bWp-b~QuoVlM6lJ0ENFinjyilypRR4jhm~770t-jZYmdnmz~ls7pLns4~UhO-zq87Nhhdbao-Mwpua5wOHntoxfOgK0E1D-c4WGfOcMCNXw5VIIfouov86OQ8ILbab~U4E2Oz3m~jOp8xR2I8EaHua-aDJBcKA5PePSa2eMwH9IFtwIz54F09xajmJbT6jCXIhc1N64MJFVWug__",
      name: "Lorem ipsum dolor",
      activity: "sit amet, consectetur adipiscing elit.",
      time: "Sep 16, 2022 at 11:45 AM",
    },
  ];

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar
          position="fixed"
          sx={{
            width: `calc(100% - ${drawerWidth}px)`,
            ml: `${drawerWidth}px`,
            bgcolor: "white",
            color: "black",
          }}
        >
          <Toolbar>
            <Typography variant="h6" noWrap component="div">
              Dashboard
            </Typography>
            <Box sx={{ ml: "auto" }}>
              <IconButton color="inherit" sx={{ color: "black" }}>
                {" "}
                <NotificationsIcon />
              </IconButton>
              <IconButton color="inherit" sx={{ color: "black" }}>
                {" "}
                <Avatar
                  alt="User Avatar"
                  src="https://s3-alpha-sig.figma.com/img/57f9/d553/89273924f34facbfe9f884318ed9c8fa?Expires=1718582400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=otO-XNvgqjihsub2PgJx0qAgce7q-uOpTsXxcnI5QfC-MOSmEOF-BkbEQIASn55MlEhRZBaxY3Qv2zGVKAn5DJM0zloQvWtgqwjwTC2~p5T6135mlkn6XWYgnpaY1ZVOmYVuXliDJPjJi30Jg4y~IrWQM9ezsddvcO6BzAxCmcjIfRadpnsRAE8j~PGWadXj6j2YbksGZQS~VJLa6sZL8CHfFq9WT9QsZk8yWsD2MRsJtlpe1VxGIS~I~koBVm2nTWPi6XJHJSACVczXsanHbgUCAN~rrXkDUNahLrzVgo3GOdMFT3F7XxTMoe2Z~vPEPvsLFWHa450HnC-YXHAaxw__"
                />
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
              backgroundColor: "#33074F",
              color: "#EBE6ED",
            },
          }}
          variant="permanent"
          anchor="left"
        >
          <Toolbar sx={{ bgcolor: "#451d5f " }}>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1, textAlign: "center" }}
            >
              Acmy Solutions
            </Typography>
          </Toolbar>
          <Divider />
          <List
            sx={{
              backgroundColor: "#451d5f",
              borderRadius: "25px",
              marginTop: "20%",
            }}
          >
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon sx={{ color: "#EBE6ED" }}>
                  <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="Dashboard" sx={{ color: "#EBE6ED" }} />
              </ListItemButton>
            </ListItem>
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
        >
          <Toolbar />
          {isWelcomeVisible && (
            <Box
              sx={{
                border: "1px solid black",
                p: 2,
                position: "relative",
                mb: 2,
              }}
            >
              <Typography
                sx={{
                  fontFamily: "Inter",
                  fontSize: "24px",
                  fontWeight: 600,
                  lineHeight: "32px",
                  letterSpacing: "-0.02em",
                  textAlign: "left",
                }}
              >
                Welcome back, John Doe
              </Typography>
              <Typography
                sx={{
                  fontFamily: "Inter",
                  fontSize: "14px",
                  fontWeight: 400,
                  lineHeight: "24px",
                  textAlign: "left",
                  mt: 1,
                }}
              >
                The end of the year is coming. Are you planning your performance
                interviews? You can do this super efficiently with Acmy. Look
                here for more information.
              </Typography>

              <Typography
                sx={{
                  fontFamily: "Inter",
                  fontSize: "14px",
                  fontWeight: 400,
                  lineHeight: "24px",
                  textAlign: "left",
                  mt: 1,
                  color: "red",
                }}
              >
                Look here to more information
              </Typography>

              <IconButton
                onClick={handleCloseWelcome}
                sx={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                }}
              >
                <CloseIcon />
              </IconButton>
            </Box>
          )}
          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              <TaskList
                currentPage={currentPage}
                onPageChange={handlePageChange}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <PriorityBarGraph />
              <Paper sx={{ p: 2 }}>
                <Typography variant="h6" gutterBottom>
                  Activity Feed
                </Typography>
                {activityFeed.map((activity, index) => (
                  <Box
                    key={index}
                    sx={{ display: "flex", alignItems: "center", mb: 1 }}
                  >
                    <Avatar
                      alt={activity.name}
                      src={activity.avatar}
                      sx={{ mr: 2 }}
                    />
                    <Box>
                      <Typography variant="body2">
                        <strong>{activity.name}</strong> {activity.activity}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {activity.time}
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </Paper>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
