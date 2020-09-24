const sendData = async (e) => {
    e.preventDefault();
    let urlInput = document.getElementById("urlInput");
    let nameInput = document.getElementById("nameInput");

    let body = { redirectUrl: urlInput.value, name: nameInput.value };

    const promise = await fetch(`/api/url`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
    });
    console.log("Body", body);

    if (promise.status === 400) {
        let { error } = await promise.json();
        setSuccess(false);
        console.log("Error", error);
        setError(error.details[0].message);
    } else {
        setSuccess(true);
        setError("");
        urlInput.innerText = "";
        nameInput.innerText = "";
    }
};

const setSuccess = (success) => {
    let successDiv = document.getElementById("success-div");
    if (success) successDiv.removeAttribute("style");
    else successDiv.style.display = "none";
};
const setError = (errorMsg) => {
    let errorDiv = document.getElementById("error-div");
    if (errorMsg) {
        document.querySelector("#error-div .message-body").innerText = errorMsg;
        errorDiv.removeAttribute("style");
    } else errorDiv.style.display = "none";
};

document.getElementById("form").addEventListener("submit", sendData);
