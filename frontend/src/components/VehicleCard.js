import { Card, CardContent, Typography, Button } from '@mui/material';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';

const VehicleCard = ({ vehicle, onAssign, onUnassign }) => {
    return (
        <Card className="w-full sm:w-[300px] bg-white shadow-md rounded-xl">
            <CardContent>
                <div className="flex items-center gap-2 mb-2">
                    <DirectionsCarIcon color="primary" />
                    <Typography variant="h6" className="font-semibold">
                        {vehicle.plateNumber}
                    </Typography>
                </div>

                <Typography variant="body2"><strong>Brand:</strong> {vehicle.brand}</Typography>
                <Typography variant="body2"><strong>Model:</strong> {vehicle.model}</Typography>
                <Typography variant="body2"><strong>Year:</strong> {vehicle.year}</Typography>

                <Typography variant="body2" className="mt-2">
                    <strong>Driver:</strong>{' '}
                    {vehicle.assignedDriver ? vehicle.assignedDriver.name : 'Empty'}
                </Typography>

                <div className="flex justify-between items-center mt-4">
                    {vehicle.assignedDriver ? (
                        <Button onClick={() => onUnassign(vehicle)} variant="outlined" color="error">
                            Unassign
                        </Button>
                    ) : (
                        <Button onClick={() => onAssign(vehicle)} variant="contained" color="secondary">
                            Assign Driver
                        </Button>
                    )}
                </div>
            </CardContent>
        </Card>
    );
};

export default VehicleCard;