import { PieChart } from "@mui/x-charts/PieChart";
import { BarChart } from "@mui/x-charts/BarChart";
import { LineChart } from "@mui/x-charts/LineChart";
import { Typography } from "@mui/material";

const ChartComp = ({ type, title, data, width = 300, height = 200 }) => {
    return (
        <div>
            {title && (
                <Typography variant="h6" gutterBottom>
                    {title}
                </Typography>
            )}

            {type === "pie" && (
                <PieChart
                    series={[{ data, innerRadius: 40 }]}
                    width={width}
                    height={height}
                    slotProps={{ legend: { hidden: false } }}
                />
            )}

            {type === "bar" && (
                <BarChart
                    xAxis={[{ scaleType: "band", data: data.map((d) => d.label) }]}
                    series={[{ data: data.map((d) => d.value) }]}
                    width={width}
                    height={height}
                />
            )}

            {type === "line" && (
                <LineChart
                    xAxis={[{ scaleType: "point", data: data.map((d) => d.label) }]}
                    series={[{ data: data.map((d) => d.value) }]}
                    width={width}
                    height={height}
                />
            )}
        </div>
    );
};

export default ChartComp;
