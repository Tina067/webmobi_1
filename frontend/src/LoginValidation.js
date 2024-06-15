function Validation(values) {
    let error = {};
    const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // const password_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/;
    const password_pattern = /^(?=.*[a-zA-Z])[a-zA-Z0-9]{3,}$/; // At least one letter and minimum 3 characters

    if (!values.email) {
        error.email = "Email should not be empty";
    } else if (!email_pattern.test(values.email)) {
        error.email = "Email didn't match";
    } else {
        error.email = "";
    }

     // Password validation
     if (!values.password) {
        error.password = "Password should not be empty";
    } else if (!password_pattern.test(values.password)) {
        console.log("Password being tested:", values.password); 
        error.password = "Password didn't match";
    } else {
        error.password = ""; 
    }
    return error;
}

export default Validation;
