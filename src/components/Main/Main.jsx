import { Button, Card, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import React,{ useState } from "react";
import { useForm } from "react-hook-form";
import styles from "./Main.module.css";
import { OpenInNew } from "@mui/icons-material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import ShareIcon from "@mui/icons-material/Share";

function Main() {
  const [newurl, setnewurl] = useState();
  const { register, handleSubmit, reset } = useForm();

  const InputLimit = (e, label) => {
    e.target.value = Math.max(
      Math.max(0),
      Math.min(e.target.name == "hours" ? 24 : 60, Number(e.target.value))
    );
  };

  const onSubmit = (data) => {
    var [newhours, newminutes, newseconds] = [0, 0, 0];
    const { url, hours, minutes, seconds } = data;

    var total = 0;
    if (hours) {
      newhours = +hours * 3600;
    }
    if (minutes) {
      newminutes = +minutes * 60;
    }
    if (seconds) {
      newseconds = +seconds;
    }
    var type = "?";
    if (url.includes("watch?v=")) {
      type = "&";
    } else type = "?";
    total = newhours + newminutes + newseconds;

    const newurl = `${url}${total > 0 ? `${type}t=${total}` : ""}`;

    setnewurl(newurl);
    console.log("url===", newurl);
  };

  const onreset = () => {
    setnewurl(null);
    reset();
  };

  return (
    <div>
      <form className={styles.mainContainer} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.urlContainer}>
          <TextField
            id="standard-search"
            label="Url"
            type="search"
            variant="standard"
            {...register("url", { required: true })}
            fullWidth
            autoFocus
          />
        </div>
        <div className={styles.timeContainer}>
          <TextField
            onInput={(e) => InputLimit(e)}
            id="standard-number"
            min="0"
            label="Hours"
            type="number"
            variant="standard"
            {...register("hours")}
          />
          <TextField
            onInput={(e) => InputLimit(e)}
            id="standard-number"
            label="Minutes"
            type="number"
            variant="standard"
            {...register("minutes")}
          />
          <TextField
            onInput={(e) => InputLimit(e)}
            id="standard-number"
            label="Seconds"
            type="number"
            variant="standard"
            {...register("seconds")}
          />
        </div>
        <div className={styles.buttonContainer}>
          <Button variant="text" onClick={onreset}>
            Clear
          </Button>
          <Button type="submit" variant="contained">
            Create Url
          </Button>
        </div>
      </form>
      <Card className={styles.newurl}>
        {newurl ? (
          <>
            <Typography
              variant="h6"
              gutterBottom
              component="div"
              style={{ overflow: "hidden" }}
            >
              {newurl}
            </Typography>
            <div className={styles.buttonContainer}>
              <ContentCopyIcon
                style={{ cursor: "pointer" }}
                onClick={() => navigator.clipboard.writeText(newurl)}
              />
              <ShareIcon
                style={{ cursor: "pointer" }}
                onClick={() =>
                  navigator.share({
                    title: "Youtube",
                    url: newurl,
                  })
                }
              />
              <OpenInNew
                style={{ cursor: "pointer" }}
                onClick={() => window.open(newurl)}
              />
            </div>
          </>
        ) : (
          <Typography variant="h6" gutterBottom component="div">
            Enter Url And time from which video will start Playing, for example{" "}
            <a href="https://youtu.be/iSo9l950QLo?t=62" target="_blank">
              click here
            </a>
          </Typography>
        )}
      </Card>
    </div>
  );
}

export default Main;
