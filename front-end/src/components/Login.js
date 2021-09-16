import { React, useState, useContext }  from 'react';
import './../css/Auth.css';
import axios from 'axios';
import AppContext from './AppContext';
import { useHistory } from 'react-router';
import { apiUrl } from "./../contexts/constant";

export default function Login() {
  const { dispatch } = useContext(AppContext);
  const [userInput, setUserInput] = useState( {email:"", password:""} );
  const [errorMessage, setErrorMessage] = useState(null);
  const history = useHistory();
  const onChangeHandle = (e) => {
    setUserInput({ ...userInput, [e.target.name]: e.target.value });
  }
  const onSubmitHandle = async (e) => {
    try {
      e.preventDefault();
      const option = {
        method: "post",
        url: `${apiUrl}/api/v1/auth/login`,
        data: userInput,
      }
      const response = await axios(option);
      const { token, userName, userId } = response.data.data;
      localStorage.setItem("token", token);
      dispatch({ type: "CURRENT_USER", payload: { userName, userId } });
      history.push("/");
    } catch (error) {
      setErrorMessage(error.response.data.message);
    }
  }

  return (
    <section className="auth-container">
      <form className="auth-form" onSubmit = {onSubmitHandle} >
        <h2>Enter your account</h2>
        {errorMessage && (
          <div className="error-message">Error: {errorMessage} </div>
        )}
        <input 
          id="" 
          type="email" 
          name="email" 
          placeholder="Email" 
          required 
          value={ userInput.email } 
          onChange = {onChangeHandle} 
        />
        <input 
          id="" 
          type="password" 
          name="password" 
          placeholder="Password" 
          required 
          value={ userInput.password } 
          onChange = {onChangeHandle}  
        />
        <button type="submit" className="btn">
          Login
        </button>
      </form>
    </section>
  )
}
