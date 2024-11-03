import React, { Component } from 'react';


import './FormClass.css';

class FormClass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoginView: true,
      formData: {
        login: {
          email: '',
          password: ''
        },
        register: {
          fullName: '',
          email: '',
          studentId: '',
          password: '',
          confirmPassword: ''
        }
      },
      errors: {},
      isLoading: false
    };
  }

  validateLogin = () => {
    const { email, password } = this.state.formData.login;
    const errors = {};

    if (!email) {
      errors.loginEmail = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.loginEmail = 'Email is invalid';
    }

    if (!password) {
      errors.loginPassword = 'Password is required';
    } else if (password.length < 6) {
      errors.loginPassword = 'Password must be at least 6 characters';
    }

    return errors;
  };

  validateRegister = () => {
    const { fullName, email, studentId, password, confirmPassword } = this.state.formData.register;
    const errors = {};

    if (!fullName) errors.fullName = 'Full name is required';
    
    if (!email) {
      errors.registerEmail = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.registerEmail = 'Email is invalid';
    }

    if (!studentId) errors.studentId = 'Student ID is required';

    if (!password) {
      errors.registerPassword = 'Password is required';
    } else if (password.length < 6) {
      errors.registerPassword = 'Password must be at least 6 characters';
    }

    if (!confirmPassword) {
      errors.confirmPassword = 'Please confirm your password';
    } else if (password !== confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }

    return errors;
  };

  handleInputChange = (e, formType) => {
    const { name, value } = e.target;
    this.setState(prevState => ({
      formData: {
        ...prevState.formData,
        [formType]: {
          ...prevState.formData[formType],
          [name]: value
        }
      }
    }));
  };

  handleSubmit = (e) => {
    e.preventDefault();
    
    const errors = this.state.isLoginView ? this.validateLogin() : this.validateRegister();

    if (Object.keys(errors).length === 0) {
      this.setState({ isLoading: true });
      
      // Simulate API call
      setTimeout(() => {
        alert(`${this.state.isLoginView ? 'Login' : 'Registration'} successful!`);
        this.setState({ isLoading: false });
      }, 1000);
      
    } else {
      this.setState({ errors });
    }
  };

  toggleView = () => {
    this.setState(prevState => ({
      isLoginView: !prevState.isLoginView,
      errors: {}
    }));
  };

  renderLogin() {
    const { login } = this.state.formData;
    const { errors, isLoading } = this.state;

    return (
      <form onSubmit={this.handleSubmit} className="form-container">
        <h2>Login ke portal raksana</h2>
        
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={login.email}
            onChange={(e) => this.handleInputChange(e, 'login')}
            className={errors.loginEmail ? 'error' : ''}
          />
          {errors.loginEmail && <span className="error-message">{errors.loginEmail}</span>}
        </div>

        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={login.password}
            onChange={(e) => this.handleInputChange(e, 'login')}
            className={errors.loginPassword ? 'error' : ''}
          />
          {errors.loginPassword && <span className="error-message">{errors.loginPassword}</span>}
        </div>

        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Loading...' : 'Login'}
        </button>

        <p className="toggle-text">
         belum punya akun?{' '}
          <span onClick={this.toggleView} className="toggle-link">
           Daftar disini
          </span>
        </p>
      </form>
    );
  }

  renderRegister() {
    const { register } = this.state.formData;
    const { errors, isLoading } = this.state;

    return (
      <form onSubmit={this.handleSubmit} className="form-container">
        <h2>Daftar Akun Disini</h2>

        <div className="form-group">
          <label>Full Name:</label>
          <input
            type="text"
            name="fullName"
            value={register.fullName}
            onChange={(e) => this.handleInputChange(e, 'register')}
            className={errors.fullName ? 'error' : ''}
          />
          {errors.fullName && <span className="error-message">{errors.fullName}</span>}
        </div>

        <div className="form-group">
          <label>NIM:</label>
          <input
            type="text"
            name="studentId"
            value={register.studentId}
            onChange={(e) => this.handleInputChange(e, 'register')}
            className={errors.studentId ? 'error' : ''}
          />
          {errors.studentId && <span className="error-message">{errors.studentId}</span>}
        </div>

        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={register.email}
            onChange={(e) => this.handleInputChange(e, 'register')}
            className={errors.registerEmail ? 'error' : ''}
          />
          {errors.registerEmail && <span className="error-message">{errors.registerEmail}</span>}
        </div>

        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={register.password}
            onChange={(e) => this.handleInputChange(e, 'register')}
            className={errors.registerPassword ? 'error' : ''}
          />
          {errors.registerPassword && <span className="error-message">{errors.registerPassword}</span>}
        </div>

        <div className="form-group">
          <label>Confirm Password:</label>
          <input
            type="password"
            name="confirmPassword"
            value={register.confirmPassword}
            onChange={(e) => this.handleInputChange(e, 'register')}
            className={errors.confirmPassword ? 'error' : ''}
          />
          {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
        </div>

        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Loading...' : 'Register'}
        </button>

        <p className="toggle-text">
        Akun telah terdaftar?{' '}
          <span onClick={this.toggleView} className="toggle-link">
            Login disini
          </span>
        </p>
      </form>
    );
  }

  render() {
    return (
      <div className="form-class">
        {this.state.isLoginView ? this.renderLogin() : this.renderRegister()}
      </div>
    );
  }
}

export default FormClass;