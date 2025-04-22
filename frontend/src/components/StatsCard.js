import { Card, CardContent, Typography } from "@mui/material";

const StatsCard = ({ label, count, color }) => {
    return (
        <Card sx={{ minWidth: 200, backgroundColor: color, color: "#fff" }}>
            <CardContent>
                <Typography variant="h6" gutterBottom>
                    {label}
                </Typography>
                <Typography variant="h4" fontWeight="bold">
                    {count}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default StatsCard;
