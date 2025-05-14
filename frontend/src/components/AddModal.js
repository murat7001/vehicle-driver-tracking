import React from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
} from "@mui/material";
import { Formik, Form, Field } from "formik";

const AddModal = ({
    open,
    handleClose,
    fields,
    initialValues,
    validationSchema,
    onSubmit,
}) => {
    return (
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
            <DialogTitle>Add</DialogTitle>

            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={(values) => {
                    onSubmit(values);
                    handleClose();
                }}
            >
                {({ errors, touched }) => (
                    <Form>
                        <DialogContent dividers>
                            {fields.map((field) => (
                                <Field
                                    key={field.name}
                                    as={TextField}
                                    name={field.name}
                                    label={field.label}
                                    type={field.type}
                                    fullWidth
                                    margin="normal"
                                    error={touched[field.name] && Boolean(errors[field.name])}
                                    helperText={touched[field.name] && errors[field.name]}
                                />
                            ))}
                        </DialogContent>

                        <DialogActions>
                            <Button onClick={handleClose} color="error" variant="outlined">
                                Cancel
                            </Button>
                            <Button type="submit" color="primary" variant="contained">
                                Add
                            </Button>
                        </DialogActions>
                    </Form>
                )}
            </Formik>
        </Dialog>
    );
};

export default AddModal;
