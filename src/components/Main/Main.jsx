import { Button, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { useForm } from "react-hook-form";
import styles from "./Main.module.css";
import {OpenInNew} from '@mui/icons-material';

function Main() {
  const [newurl, setnewurl] = useState();
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data) => {
    var [newhours, newminutes, newseconds] = [0, 0, 0];
    const { url, hours, minutes, seconds } = data;

    var total=0
    if (hours) {
      newhours = +hours * 3600;
    }
    if (minutes) {
      newminutes = +minutes * 60;
    }
    if (seconds) {
      newseconds = +seconds;
    }
    var type='?'
    if(url.includes('watch?v=')){
      type='&'
    }
    else
      type='?'
    total = newhours + newminutes + newseconds;

    const newurl = `${url}${total>0? `${type}t=${total}` : ''}`;

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
          />
        </div>
        <div className={styles.timeContainer}>
          <TextField
            id="standard-number"
            label="Hours"
            type="number"
            variant="standard"
            {...register("hours")}
          />
          <TextField
            id="standard-number"
            label="Minutes"
            type="number"
            variant="standard"
            {...register("minutes")}
          />
          <TextField
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
      <div className={styles.newurlcontainer}>
        {newurl ? (
          <>
            <Typography variant="h6" gutterBottom component="div">
              {newurl}
            </Typography>
            <OpenInNew style={{cursor:'pointer'}} onClick={()=>window.open(newurl)}/>
          </>
        ) : (
          <Typography variant="h6" gutterBottom component="div">
          Enter Url And time from which video will start Playing
        </Typography>
        )}
      </div>
    </div>
  );
}

export default Main;
