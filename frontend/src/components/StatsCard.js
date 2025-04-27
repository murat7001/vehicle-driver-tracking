import { Card, CardContent, Typography } from "@mui/material";
import { Box } from "@mui/system";

const StatsCard = ({ label, count, color, Icon }) => {
    return (
        <Card
            sx={{
                minWidth: 220,
                minHeight: 140,
                backgroundColor: color,
                color: "#fff",
                borderRadius: 4,
                boxShadow: 3,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                transition: "transform 0.3s ease",
                "&:hover": {
                    transform: "scale(1.05)",
                },
            }}
        >
            <CardContent sx={{ textAlign: "center" }}>
                {Icon && (
                    <Box sx={{ mb: 1 }}>
                        <Icon sx={{ fontSize: 40 }} />
                    </Box>
                )}
                <Typography variant="subtitle2" sx={{ opacity: 0.8 }}>
                    {label}
                </Typography>
                <Typography variant="h3" fontWeight="bold" mt={1}>
                    {count}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default StatsCard;
