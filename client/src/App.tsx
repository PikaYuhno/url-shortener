import React, { useState, useRef } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import { Alert, AlertTitle } from "@material-ui/lab";
import "./App.css";
//Test comment

function App() {
    const [url, setUrl] = useState("");
    const [name, setName] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    const nameRef = useRef<HTMLDivElement>(null);
    const urlRef = useRef<HTMLDivElement>(null);

    const style = { width: "30vw" };

    const createUrl = async () => {
        let body = { redirectUrl: url, name };

        const promise = await fetch(`http://localhost:4000/api/url`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        });

        if (promise.status === 400) {
            let { error } = await promise.json();
            setSuccess(false);
            console.log("Error", error);
            setError(error.details[0].message);
        } else {
            setSuccess(true);
            setError("");
            nameRef.current!.innerText = "";
            urlRef.current!.innerText = "";
        }
    };

    return (
        <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
            spacing={2}
        >
            <Grid item>
                <h1>Short your URL</h1>
            </Grid>
            <Grid item>
                {success && (
                    <Alert severity="success" style={{ width: "28vw" }}>
                        <AlertTitle>Success</AlertTitle>
                        Succesfully shorted the URL!
                    </Alert>
                )}
                {error && (
                    <Alert severity="error" style={{ width: "28vw" }}>
                        <AlertTitle>Error</AlertTitle>
                        {error}
                    </Alert>
                )}
            </Grid>
            <Grid item>
                <TextField
                    ref={urlRef}
                    label="URL"
                    style={style}
                    variant="outlined"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setUrl(e.target.value);
                    }}
                />
            </Grid>
            <Grid item>
                <TextField
                    ref={nameRef}
                    label="Slug"
                    variant="outlined"
                    style={style}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setName(e.target.value);
                    }}
                />
            </Grid>
            <Grid item>
                <Button color="primary" variant="contained" onClick={createUrl}>
                    Create
                </Button>
            </Grid>
        </Grid>
    );
}

export default App;
