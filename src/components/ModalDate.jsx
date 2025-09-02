import { useState } from "react";
import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 420,
    bgcolor: "background.paper",
    borderRadius: "16px",
    boxShadow: 24,
    p: 4,
    textAlign: "center",
};

export default function StepDateModal({
    day,
    setDay,
    month,
    setMonth,
    year,
    setYear,
    onClose,
}) {
    const [step, setStep] = useState(1);
    const [open, setOpen] = useState(true);

    const months = [
        "فروردین", "اردیبهشت", "خرداد", "تیر",
        "مرداد", "شهریور", "مهر", "آبان",
        "آذر", "دی", "بهمن", "اسفند",
    ];

    const handleNextStep = () => setStep((prev) => prev + 1);

    const handleClose = () => {
        setOpen(false);
        onClose();
    };

    return (
        <Modal open={open} onClose={handleClose}>
            <Box sx={{ ...style, fontFamily: 'vazir-Medium'}}>
                {step === 1 && (
                    <>
                        <Typography variant="h6" gutterBottom>
                            روز را انتخاب کنید
                        </Typography>
                        <Grid container spacing={1} justifyContent="center">
                            {Array.from({ length: 31 }, (_, i) => (
                                <Grid item key={i + 1}>
                                    <Button
                                        size="small"
                                        variant="outlined"
                                        sx={{ minWidth: 48, borderRadius: 2 }}
                                        onClick={() => {
                                            setDay(i + 1);
                                            handleNextStep();
                                        }}
                                    >
                                        {i + 1}
                                    </Button>
                                </Grid>
                            ))}
                        </Grid>
                    </>
                )}

                {step === 2 && (
                    <>
                        <Typography variant="h6" gutterBottom>
                            ماه را انتخاب کنید
                        </Typography>
                        <Grid container spacing={1} justifyContent="center">
                            {months.map((m, i) => (
                                <Grid item key={i + 1}>
                                    <Button
                                        variant="outlined"
                                        sx={{ borderRadius: 2, px: 2 }}
                                        onClick={() => {
                                            setMonth(i + 1);
                                            handleNextStep();
                                        }}
                                    >
                                        {m}
                                    </Button>
                                </Grid>
                            ))}
                        </Grid>
                    </>
                )}

                {step === 3 && (
                    <>
                        <Typography variant="h6" gutterBottom>
                            سال را انتخاب کنید
                        </Typography>
                        <Box
                            sx={{
                                maxHeight: 350,
                                overflowY: "auto",
                                p: 1,
                                borderRadius: 2,
                            }}
                        >
                            <Grid container spacing={1} justifyContent="center">
                                {Array.from({ length: 120 }, (_, i) => {
                                    const y = 1330 + i;
                                    return (
                                        <Grid item key={y}>
                                            <Button
                                                variant="outlined"
                                                sx={{ borderRadius: 2, minWidth: 70 }}
                                                onClick={() => {
                                                    setYear(y);
                                                    handleClose();
                                                }}
                                            >
                                                {y}
                                            </Button>
                                        </Grid>
                                    );
                                })}
                            </Grid>
                        </Box>
                    </>
                )}
            </Box>
        </Modal>
    );
}
