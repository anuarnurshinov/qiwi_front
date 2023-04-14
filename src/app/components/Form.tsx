import { InputUnstyled } from "@mui/base";
import {
  Alert,
  AlertTitle,
  Box,
  Button,
  IconButton,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import CloseIcon from "@mui/icons-material/Close";

const Form = () => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, touchedFields },
  } = useForm();

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box display={"grid"} gap={4}>
          <Typography sx={{ color: "white" }} variant="h2">
            {" "}
            Оплата{" "}
          </Typography>
          <TextField
            id="login"
            label="Логин"
            {...register("login", { required: "Поле логин обязательное" })}
          />
          <TextField
            id="email"
            label="Email"
            {...register("email", { required: "Поле email обязательное" })}
          />
          <TextField
            {...register("sum", {
              required: "Поле сумма обязательное",
              min: {
                message: "Минимальная сумма 100",
                value: 100,
              },
            })}
            type="number"
            id="sum"
            label="Сумма"
          />
          <Button type="submit" variant="contained" size="large">
            Отправить
          </Button>

          {touchedFields.sum && (
            <Alert sx={{ bgcolor: "#052e4f" }} hidden severity="info">
              <AlertTitle>Итого</AlertTitle>
              Вам зачислится — <strong>0 рублей</strong>
            </Alert>
          )}

          {errors.sum?.message && (
            <Alert
              sx={{ position: "absolute", width: "100%", bottom: 0 }}
              severity="warning">
              <AlertTitle> Внимание </AlertTitle>
              Минимальная сумма <strong> 100 рублей</strong>
            </Alert>
          )}
        </Box>
      </form>
    </>
  );
};

export default Form;
