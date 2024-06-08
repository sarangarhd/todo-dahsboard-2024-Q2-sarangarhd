import React, { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Cell,
} from "recharts";

const PriorityBarGraph = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // -- API
    fetch("https://6363c8f68a3337d9a2e7d805.mockapi.io/api/to-do")
      .then((response) => response.json())
      .then((tasks) => {
        // Count priorities
        const counts = tasks.reduce((acc, task) => {
          acc[task.priority] = (acc[task.priority] || 0) + 1;
          return acc;
        }, {});

        // Prepare data 
        const chartData = Object.keys(counts).map((priority) => ({
          priority,
          count: counts[priority],
        }));

        // Set dataset
        setData(chartData);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  const renderLegend = () => {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div style={{ display: "flex", marginRight: "10px" }}>
          <div
            style={{
              width: "10px",
              height: "10px",
              backgroundColor: "#ff4d4d",
              marginRight: "5px",
            }}
          ></div>
          <Typography variant="body2">High</Typography>
        </div>
        <div style={{ display: "flex", marginRight: "10px" }}>
          <div
            style={{
              width: "10px",
              height: "10px",
              backgroundColor: "#ffcc00",
              marginRight: "5px",
            }}
          ></div>
          <Typography variant="body2">Medium</Typography>
        </div>
        <div style={{ display: "flex" }}>
          <div
            style={{
              width: "10px",
              height: "10px",
              backgroundColor: "#4d79ff",
              marginRight: "5px",
            }}
          ></div>
          <Typography variant="body2">Low</Typography>
        </div>
      </div>
    );
  };

  return (
    <Paper sx={{ p: 2, mb: 3 }}>
      <Typography variant="h6" gutterBottom>
        Tasks Priorities
      </Typography>
      {loading ? (
        <Typography>Loading data...</Typography>
      ) : (
        <div>
          <BarChart width={300} height={300} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="priority" />
            <YAxis />
            <Tooltip />
            <Legend content={renderLegend} />
            <Bar dataKey="count">
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={
                    entry.priority === "HIGH"
                      ? "#ff4d4d"
                      : entry.priority === "MEDIUM"
                      ? "#ffcc00"
                      : "#4d79ff"
                  }
                />
              ))}
            </Bar>
          </BarChart>
        </div>
      )}
    </Paper>
  );
};

export default PriorityBarGraph;
