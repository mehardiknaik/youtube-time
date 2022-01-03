import styles from "./Button.module.css"
import { OpenInNew } from "@mui/icons-material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import ShareIcon from "@mui/icons-material/Share";
import CheckIcon from '@mui/icons-material/Check';
import { useState } from "react";

const Buttons = ({url}) => {
    const [copyCheck, setcopyCheck] = useState(false)
    const [openCheck, setopenCheck] = useState(false)

    const copy=()=>{
        setcopyCheck(true)
        navigator.clipboard.writeText(url)
        setTimeout(() => {
            setcopyCheck(false)
        }, 3000);
    }
    const open=()=>{
        setopenCheck(true)
        window.open(url)
        setTimeout(() => {
            setopenCheck(false)
        }, 3000);
    }

    return (
        <div className={styles.Container}>
            {copyCheck?<CheckIcon/>:<ContentCopyIcon
                style={{ cursor: "pointer" }}
                onClick={copy}
              />}
              <ShareIcon
                style={{ cursor: "pointer" }}
                onClick={() =>
                  navigator.share({
                    title: "Youtube",
                    url: url,
                  })
                }
              />
              {openCheck?<CheckIcon/>:<OpenInNew
                style={{ cursor: "pointer" }}
                onClick={open}
              />}
        </div>
    )
}

export default Buttons
