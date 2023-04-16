import {
  Alert,
  AlertTitle,
  Box,
  Button,
  CircularProgress,
  Fade,
  Slide,
  TextField,
  Typography,
  Zoom,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { axiosCLI } from "../api/axiosCLI";
import Image from "next/image";
const Form = () => {
  const {
    register,
    handleSubmit,
    formState: { touchedFields },
  } = useForm();

  const onSubmit = async (data: any) => {
    const response = await axiosCLI.post("pay", data);
    setPayUrl(response.data);
  };
  const [login, setLogin] = useState("");
  const [email, setEmail] = useState("");
  const [sum, setSum] = useState("");
  const [conversion, setConvertion] = useState(0);
  const [isFetching, setIsFetching] = useState(false);
  const [payUrl, setPayUrl] = useState(null);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const id = e.currentTarget.id;
    eval("set" + id[0].toUpperCase() + id.slice(1) + "(e.currentTarget.value)");
  };

  useEffect(() => {
    const getData = setTimeout(async () => {
      setIsFetching(true);
      await axiosCLI
        .post("conversion", { sum })
        .then((data) => {
          const result = Math.floor(data.data * 1);
          setConvertion(result);
        })
        .catch((e) => {
          console.log(e);
        });
      setIsFetching(false);
    }, 1000);
    return () => clearTimeout(getData);
  }, [sum]);

  const onMouseOutCapture = async (e: React.MouseEvent<HTMLElement>) => {
    await axiosCLI.post("conversion", { sum }).then((data) => {
      const result = Math.floor(data.data * 1);
      setConvertion(result);
    });
  };

  if (payUrl != null) {
    setTimeout(() => {
      window.location.replace(payUrl);
    }, 3000);
  }
  return (
    <>
      <Fade in={payUrl == null}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box display={"grid"} gap={4}>
            <Typography sx={{ color: "white" }} variant="h2">
              {" "}
              Оплата{" "}
            </Typography>
            <TextField
              id="login"
              label="Логин"
              value={login}
              {...register("login", { required: "Поле логин обязательное" })}
              onChange={handleInput}
            />
            <TextField
              id="email"
              label="Email"
              value={email}
              {...register("email", { required: "Поле email обязательное" })}
              onChange={handleInput}
            />
            <TextField
              {...register("sum", {
                required: "Поле сумма обязательное",
                min: {
                  message: "Минимальная сумма 100",
                  value: 100,
                },
              })}
              value={sum}
              type="number"
              id="sum"
              label="Сумма"
              onChange={handleInput}
              onMouseOutCapture={onMouseOutCapture}
            />
            <Button type="submit" variant="contained" size="large">
              Отправить
            </Button>

            <Zoom in={sum != ""} mountOnEnter unmountOnExit>
              <Alert sx={{ bgcolor: "#052e4f" }} hidden severity="info">
                <AlertTitle>Итого</AlertTitle>
                Вам зачислится —{" "}
                <strong>
                  {isFetching ? (
                    <CircularProgress size={15} />
                  ) : (
                    conversion + " рублей"
                  )}
                  .{" "}
                </strong>
              </Alert>
            </Zoom>

            <Zoom
              in={+sum < 100 && touchedFields.sum}
              mountOnEnter
              unmountOnExit>
              <Alert sx={{ width: "100%", bottom: 0 }} severity="warning">
                <AlertTitle> Внимание </AlertTitle>
                Минимальная сумма <strong> 100 рублей</strong>
              </Alert>
            </Zoom>
          </Box>
        </form>
      </Fade>
      <Fade in={payUrl != null}>
        <Box>
          <Typography variant="h2" color={"white"}>
            Успешно
          </Typography>
          <Typography color={"white"}>
            Сейчас вы перейдете на страницу оплаты
          </Typography>
        </Box>
      </Fade>
    </>
  );
};

export default Form;
