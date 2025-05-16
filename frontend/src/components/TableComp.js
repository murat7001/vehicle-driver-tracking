import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Box, Button, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useState } from 'react';

export default function TableComp({
    tableName,
    columns,
    rows,
    onEdit,
    onDelete,
    onAdd,
    onAssign,
    onUnassign,
}) {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden', marginTop: "10px" }}>
            <Typography variant='h4' sx={{ margin: "10px" }}>{tableName}</Typography>

            <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth }}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {rows.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={columns.length} align="center">
                                    No data found.
                                </TableCell>
                            </TableRow>
                        ) : (
                            rows
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row, index) => (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                                        {columns.map((column) => {
                                            const value = row[column.id];

                                            if (column.id === "actions") {
                                                return (
                                                    <TableCell key={column.id} align={column.align}>
                                                        <button className="mr-3" onClick={() => onEdit(row)}>✏️</button>
                                                        <button onClick={() => onDelete(row)}>🗑️</button>
                                                    </TableCell>
                                                );
                                            }

                                            if (column.id === "assignedDriver") {
                                                return (
                                                    <TableCell key={column.id} align={column.align}>
                                                        {value !== "Empty" ? (
                                                            <>
                                                                {value}
                                                                <button
                                                                    onClick={() => onUnassign(row)}
                                                                    className="ml-2 hover:scale-125 transition-transform duration-200"
                                                                    title="Remove driver"
                                                                >
                                                                    ❌
                                                                </button>

                                                            </>
                                                        ) : "Empty"}
                                                    </TableCell>
                                                );
                                            }

                                            return (
                                                <TableCell key={column.id} align={column.align}>
                                                    {value}
                                                </TableCell>
                                            );
                                        })}
                                    </TableRow>
                                ))
                        )}
                    </TableBody>
                </Table>
            </TableContainer>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 16px' }}>
                <Box sx={{ display: 'flex', gap: 2 }}>
                    <Button onClick={onAdd} variant="contained" color="primary" endIcon={<AddIcon />}>
                        Add
                    </Button>
                    {tableName === "Vehicles" && (
                        <Button onClick={onAssign} variant="outlined" color="secondary">
                            Assign Driver
                        </Button>
                    )}
                </Box>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 15]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Box>
        </Paper>
    );
}
