"use client";
import Image from "next/image";
import styles from "./page.module.scss";
import steamLogo from "/public/images/steam.svg";
import gsap from "gsap";
import { useEffect, useRef } from "react";
import { HoverButton } from "./imageAnimation";
import Form from "./components/Form";
import { ThemeProvider, createTheme } from "@mui/material";
//@ts-ignore
import GTA_Russia from "../../public/fonts/GTA_Russian.ttf";

export default function Home() {
  const cursorSmall = useRef(null);
  const onMouseMoveCursorAnimation = (e: React.MouseEvent) => {
    gsap.to(cursorSmall.current, {
      x: e.pageX - 5,
      y: e.pageY - 7,
      duration: 0.3,
    });
  };
  const imageRef = useRef(null);

  useEffect(() => {
    new HoverButton(imageRef.current);
  }, []);

  const theme = createTheme({
    palette: { mode: "dark" },
    typography: {
      fontFamily: [].join(","),
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <>
        <div className={styles.cursor}>
          <div
            ref={cursorSmall}
            className={`${styles.cursorBall} ${styles.cursorBallTarget}`}>
            <svg height="10" width="10">
              <circle cx="5" cy="5" r="4" stroke-width="0" />
            </svg>
          </div>
        </div>
        <div onMouseMove={onMouseMoveCursorAnimation} className={styles.main}>
          <div className={styles.content}>
            <div className={styles.formContainer}>
              <div className={styles.form}>
                <Form />
              </div>
            </div>
          </div>
          <div className={styles.images}>
            <div ref={imageRef} className={styles.steamLogoContainer}>
              <Image
                src={steamLogo}
                className={styles.steamLogo}
                alt="steam_logo"
                fill
              />
            </div>
          </div>
        </div>
      </>
    </ThemeProvider>
  );
}
