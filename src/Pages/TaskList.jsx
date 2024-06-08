import React, { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import Pagination from "@mui/material/Pagination";
import Box from "@mui/material/Box";

const TaskList = ({ currentPage, onPageChange }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const tasksPerPage = 8;

  useEffect(() => {
    // link API
    fetch("https://6363c8f68a3337d9a2e7d805.mockapi.io/api/to-do")
      .then((response) => response.json())
      .then((data) => {
        setTasks(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching tasks:", error);
        setLoading(false);
      });
  }, []);

  // Calculation
  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = tasks.slice(indexOfFirstTask, indexOfLastTask);

  const handlePageChange = (event, newPage) => {
    onPageChange(newPage);
  };

  // convert date format
  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    const options = { month: "long", day: "numeric" };
    return date.toLocaleDateString("en-US", options);
  };

  // ------- change -priority color
  const getPriorityStyles = (priority) => {
    switch (priority) {
      case "LOW":
        return {
          color: "blue",
          backgroundColor: "#D6EAF8",
          borderRadius: "10px",
          padding: "4px",
          textAlign: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        };
      case "MEDIUM":
        return {
          color: "#F5B041",
          backgroundColor: "#F9E79F",
          borderRadius: "10px",
          padding: "4px",
          textAlign: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        };
      case "HIGH":
        return {
          color: "red",
          backgroundColor: "#FADBD8 ",
          borderRadius: "10px",
          padding: "4px",
          textAlign: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        };
      default:
        return {
          textAlign: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        };
    }
  };

  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Tasks
      </Typography>
      {loading ? (
        <Typography>Loading tasks...</Typography>
      ) : (
        <>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ backgroundColor: "#D5DBDB" }}>
                    Status
                  </TableCell>
                  <TableCell sx={{ backgroundColor: "#D5DBDB" }}>
                    Task Name
                  </TableCell>
                  <TableCell sx={{ backgroundColor: "#D5DBDB" }}>
                    Created by
                  </TableCell>
                  <TableCell sx={{ backgroundColor: "#D5DBDB" }}>
                    Priority
                  </TableCell>
                  <TableCell sx={{ backgroundColor: "#D5DBDB" }}>
                    Date
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {currentTasks.map((task, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <Button
                        variant="contained"
                        size="small"
                        sx={{
                          bgcolor:
                            task.completed === true
                              ? "success.main"
                              : task.completed === "inProgress"
                              ? "warning.main"
                              : "default",
                          "&:hover": {
                            backgroundColor:
                              task.completed === true
                                ? "success.dark"
                                : task.completed === "inProgress"
                                ? "warning.dark"
                                : "default",
                          },
                        }}
                      >
                        {task.completed === true
                          ? "✔"
                          : task.completed === "inProgress"
                          ? "In Progress"
                          : "-"}
                      </Button>
                    </TableCell>
                    <TableCell>{task.todo}</TableCell>
                    <TableCell>{task.createdBy}</TableCell>
                    <TableCell>
                      <Typography sx={getPriorityStyles(task.priority)}>
                        {task.priority}
                      </Typography>
                    </TableCell>
                    <TableCell>{formatDate(task.createdAt)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
            <Pagination
              count={Math.ceil(tasks.length / tasksPerPage)}
              color="primary"
              onChange={handlePageChange}
              boundaryCount={1}
              siblingCount={0}
            />
          </Box>
        </>
      )}
    </Paper>
  );
};

export default TaskList;
