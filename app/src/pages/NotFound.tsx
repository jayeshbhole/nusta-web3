import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
    const navigate = useNavigate();
    useEffect(() => {
        navigate("/");
    });
    return <div>not found hehe</div>;
};

export default NotFound;
