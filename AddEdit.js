import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { useHistory, useNavigate, useParams } from "react-router-dom";
import "./AddEdit.css";
import axios from "axios";
import { toast } from "react-toastify";

const initialState = {
    name: "",
    email: "",
    contact: "",
};

const AddEdit = () => {
    const [state, setState] = useState(initialState);
    const { name, email, contact } = state;
    const navigate = useNavigate();
    
    const { id } = useParams();
    useEffect(() => {
        axios.get(`http://localhost:5000/api/get/${id}`)
            .then((resp) => setState({ ...resp.data[0] }));
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name || !email || !contact) {
            toast.error("please provide value into each field");
        } else {
            if (!id) {
              axios.post("http://localhost:5000/api/post", {
                name,
                email,
                contact,
            }).then(() => {
                setState({ name: "", email: "", contact: "" });
            }).catch((err) => toast.error(err.response.data));
            toast.success("contact added successfully");  
            }
            else {
                axios.put(`http://localhost:5000/api/update/${id}`, {
                name,
                email,
                contact,
                })
                    .then(() => {
                setState({ name: "", email: "", contact: "" });
            }).catch((err) => toast.error(err.response.data));
            toast.success("contact updated successfully");
            }
            setTimeout(() => navigate.push("/"), 500);
        }                     
    };
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setState({ ...state, [name]: value });
    };
    return (
        <div style={{marginTop: "100px"}}>
            <form style={{
                margin: "auto",
                padding: "15px",
                maxWidth: "400px",
                alignContent: "center"
            }}
               onSubmit={handleSubmit} 
            >
                <label htmlFor="name">Name</label>
                <input type="text"
                    id="name"
                    name="name"
                    placeholder="your Name..."
                    value={name || ""}
                    onChange={handleInputChange} />
                <label htmlFor="email">Email</label>
                <input type="email"
                    id="email"
                    name="email"
                    placeholder="your Email..."
                    value={email || ""}
                    onChange={handleInputChange} />
                <label htmlFor="contact">Name</label>
                <input type="number"
                    id="contact"
                    name="contact"
                    placeholder="your contact..."
                    value={contact || ""}
                    onChange={handleInputChange} />
                <input type="submit" value={id ? "Update" : "save"} />
                <Link to="/">
                    <input type="button" value="Go Back"/>
                </Link>
            </form>
        </div>
    );
};


export default AddEdit;