import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Validation from './LoginValidation';
import axios from 'axios';

const Login = () => {
    const [values, setValues] = useState({ email: '', password: '' });
    const [errors, setErrors] = useState({});

    const navigate = useNavigate();
    const handleInput = (event) => {
        setValues(prev => ({ ...prev, [event.target.name]: event.target.value }));
    }

    // const handleSubmit = (event) => {
    //     event.preventDefault();
    
    //     // Validate the form inputs
    //     const validationErrors = Validation(values);
    //     setErrors(validationErrors);
    
    //     // Check if there are no validation errors
    //     // && !validationErrors.password
    //     if (!validationErrors.email && !validationErrors.password) {
    //         console.log("Validation passed. Submitting form...");
    
            // Send the POST request
    //         axios.post('http://localhost:8081/login', values)
    //             .then(res => {
    //                if(res.data === "Success") {
    //                 navigate('/home');
    //                }else{
    //                 alert("No record exist")
    //                }
    //             })
    //             .catch(err => {
    //                 console.error("Error occurred:", err);
    //             });
    //     } else {
    //         console.log("Validation errors:", validationErrors);
    //     }
    // }

    // const handleSubmit = (event) => {
    //     event.preventDefault();
    
    //     // Validate the form inputs
    //     const validationErrors = Validation(values);
    //     setErrors(validationErrors);
    
    //     // Check if there are no validation errors
    //     if (!validationErrors.email && !validationErrors.password) {
    //         console.log("Validation passed. Submitting form...");
    
    //         // Send the POST request with appropriate headers
    //         axios.post('http://localhost:8081/login', values, {
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             }
    //         })
    //         .then(res => {
    //             if (res.data.message === "Success") {
    //                 // Store the token in local storage or a state management system
    //                 localStorage.setItem('token', res.data.token);
    //                 navigate('/home');
    //             } else {
    //                 alert("Invalid email or password");
    //             }
    //         })
    //         .catch(err => {
    //             console.error("Error occurred:", err);
    //             alert("Login failed. Please try again.");
    //         });
    //     } else {
    //         console.log("Validation errors:", validationErrors);
    //     }
    // }
    
    const handleSubmit = (event) => {
        event.preventDefault();
    
        // Validate the form inputs
        const validationErrors = Validation(values);
        setErrors(validationErrors);
    
        // Check if there are no validation errors
        if (!validationErrors.email && !validationErrors.password) {
            console.log("Validation passed. Submitting form...");
    
            // Send the POST request with appropriate headers
            axios.post('http://localhost:8081/login', values, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(res => {
                if (res.data.message === "Success") {
                    // Store the token in local storage or a state management system
                    console.log('Login successful, storing token.');
                    localStorage.setItem('token', res.data.token);
                    navigate('/home');
                } else {
                    console.log('Login failed: ', res.data.message);
                    alert("Invalid email or password");
                }
            })
            .catch(err => {
                console.error("Error occurred:", err.response ? err.response.data : err.message);
                alert("Login failed. Please try again.");
            });
        } else {
            console.log("Validation errors:", validationErrors);
        }
    }
    
    return (
        <div className='d-flex justify-content-center align-items-center bg-primary vh-100'>
            <div className='bg-white p-3 rounded w-25'>
                <h2>Sign-In</h2>
                <form action="" onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="email"><strong>Email</strong></label>
                        <input
                            type="email"
                            id="email"
                            placeholder='Enter Email'
                            name='email'
                            onChange={handleInput}
                            className='form-control rounded-0'
                        />
                        {errors.email && <span className='text-danger'>{errors.email}</span>}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password"><strong>Password</strong></label>
                        <input
                            type="password"
                            id="password"
                            placeholder='Enter Password'
                            name='password'
                            onChange={handleInput}
                            className='form-control rounded-0'
                        />
                        {errors.password && <span className='text-danger'>{errors.password}</span>}
                    </div>
                    <button type='submit' className='btn btn-success w-100 rounded-0'><strong>Log in</strong></button>
                    <p>Don't have an Account?</p>
                    <Link to='/signup' className='btn btn-default border w-100 bg-light rounded-0 text-decoration-none'>Create Account</Link>
                </form>
            </div>
        </div>
    );
}

export default Login;


// import React, { useState} from 'react';
// import { Link } from 'react-router-dom';
// import Validation from './LoginValidation';

// const Login = () => {
//     const [values, setValues] = useState({email:'', password: ''});
//     const [errors, setErrors] = useState({})

//     const handleInput = (event) =>{
//         setValues(prev => ({...prev, [event.target.name]: [event.target.value]}))
//     }

//     const handleSubmit = (event) =>{
//         event.preventDefault();
//         setErrors(Validation(values));
//     }
//   return (
//     <div className='d-flex justify-content-center align-items-center bg-primary vh-100'>
//         <div className='bg-white p-3 rounded w-25'>
//            <h2>Sign-In</h2>
//             <form action="" onSubmit={handleSubmit}>
//                 <div className="mb-3">
//                     <label htmlFor="email"><strong>Email</strong></label>
//                     <input 
//                     type="email" 
//                     id="email"
//                     placeholder='Enter Email' 
//                     name='email'
//                     onChange={handleInput}
//                     className='form-control rounded-0'
//                     />
//                     {errors.email && <span className='text-danger'>{errors.email}</span>}
//                 </div>
//                 <div className="mb-3">
//                     <label htmlFor="password"><strong>Password</strong></label>
//                     <input 
//                     type="password" 
//                     id="password"
//                     placeholder='Enter Password' 
//                     name='password'
//                     onChange={handleInput}
//                     className='form-control rounded-0'/>
//                     {errors.password && <span className='text-danger'>{errors.password}</span>}
//                 </div>
//                 <button type='submit' className='btn btn-success w-100 rounded-0' ><strong>Log in</strong></button>
//                 <p>Don't have an Account ?</p>
//                 <Link to = '/signup' className='btn btn-default border w-100 bg-light rounded-0 text-decoration-none'>Create Account</Link>
//             </form>
//         </div>
//     </div>
//   )
// }

// export default Login