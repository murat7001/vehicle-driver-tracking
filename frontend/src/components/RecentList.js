import { Card, CardContent, Typography, List, ListItem, ListItemText } from "@mui/material";

const RecentList = ({ title, items, primaryKey, secondaryKey }) => {
    return (
        <Card sx={{ minHeight: 200 }}>
            <CardContent>
                <Typography variant="h6" gutterBottom>
                    {title}
                </Typography>
                <List dense>
                    {items.slice(0, 3).map((item, index) => (
                        <ListItem key={index} divider>
                            <ListItemText
                                primary={item[primaryKey]}
                                secondary={item[secondaryKey]}
                            />
                        </ListItem>
                    ))}
                </List>
            </CardContent>
        </Card>
    );
};

export default RecentList;
