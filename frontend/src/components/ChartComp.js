// 📁 src/components/ChartComp.jsx
import { LineChart, PieChart } from '@mui/x-charts';

const ChartComp = ({ type, title, data, width = 300, height = 200 }) => {
    return (
        <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-bold mb-4">{title}</h2>

            {type === "line" && (
                <LineChart
                    xAxis={[{
                        scaleType: "point",
                        data: data.map((d) => d.label),
                    }]}
                    series={[{
                        data: data.map((d) => d.value),
                        showMark: true,
                        area: true,
                        color: '#3b82f6',
                    }]}
                    width={width}
                    height={height}
                    grid={{ vertical: true, horizontal: true }}
                    margin={{ left: 40, right: 20, top: 20, bottom: 40 }}
                    slotProps={{
                        legend: { hidden: true },
                        axisBottom: { scaleType: "point" },
                    }}
                    disableAxisListener={true}
                />
            )}

            {type === "pie" && (
                <PieChart
                    series={[{
                        data,
                        innerRadius: 50,
                        outerRadius: 100,
                        paddingAngle: 5,
                        cornerRadius: 5,
                    }]}
                    width={width}
                    height={height}
                    slotProps={{ legend: { position: "right" } }}
                />
            )}
        </div>
    );
};

export default ChartComp;
