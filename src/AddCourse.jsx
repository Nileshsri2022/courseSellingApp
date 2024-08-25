import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {Card} from "@mui/material";
import {useState} from "react";

function AddCourse() {
    const [title, setTitle] = useState("");
    const [image, setImage] = useState("");
    const [description, setDescription] = useState("");

    return <div style={{display: "flex", justifyContent: "center"}}>
        <Card variant={"outlined"} style={{width: 400, padding: 20}}>
        <TextField
            onChange={(e) => {
                setTitle(e.target.value)
            }}
            fullWidth={true}
            label="Title"
            variant="outlined"
        />

        <TextField
            onChange={(e) => {
                setDescription(e.target.value)
            }}
            fullWidth={true}
            label="Description"
            variant="outlined"
        />
        <TextField
            onChange={(e) => {
                setImage(e.target.value)
            }}
            fullWidth={true}
            label="Image Link"
            variant="outlined"
        />

        <Button
            size={"large"}
            variant="contained"
            onClick={() => {
                function callback2(data) {
                    // localStorage.setItem("token", data.token);
                    // window.location="/"
                    // console.log("Data=>"+data.title)
                    alert(`Course added ${data.token}`)
                }
                function callback1(res) {
                    res.json().then(callback2)
                }
                fetch("http://localhost:3000/admin/courses", {
                    method: "POST",
                    body: JSON.stringify({
                        title: title,
                        description: description,
                        imageLink: image,
                        published: true
                    }),
                    headers: {
                        // this line is important otherwise worng output
                        "Content-type": "application/json",
                        "Authorization": "Bearer " + localStorage.getItem("token")
                    }
                })
                    .then(callback1)
            }}
        > Add course</Button>
        </Card>
    </div>
}

export default AddCourse;