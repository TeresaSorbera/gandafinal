import React, { Component } from 'react'
import { register } from './MathematicianFunctions'

class MathematiciansCreate extends Component {
    constructor() {
        super()
        this.state = {
            first_name: '',
            last_name: '',
            university: '',
            email: '',
            password: '',
            validationErrors: []
        }
        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    onChange(e) {
        this.setState({[e.target.name] : e.target.value})
        //this.setState({[e.target.last_name] : e.target.value})
        this.setState({[e.target.university] : e.target.value})
        //this.setState({[e.target.email] : e.target.value})
    }

    validate = () => {
        let errorMessage = [];
        if (this.state.first_name.length < 1) {
            errorMessage.push("Your name is not long enough. Try again");
        }
        if (this.state.last_name.length < 1) {
            errorMessage.push("Your last name is not long enough. Try again");
        }
        if (this.state.university.length < 1) {
            errorMessage.push("Your university name is not long enough. Try again");
        }
        if (this.state.email.length < 1) {
            errorMessage.push("Your email is not long enough. Try again");
        }
        return errorMessage;
    }


    onSubmit = (e) => {
        e.preventDefault()

        const mathematician = {
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            university: this.state.university,
            email: this.state.email,
            password: this.state.password
        }

        let validationMessage = this.validate();
        if (validationMessage.length <= 0) {
            register(mathematician).then(res => {
                this.props.history.push(`/mathematicians`)
            })
            console.log("hi");
        }
        console.log(validationMessage);
        this.setState((state, props) => {
            return {validationErrors: validationMessage};
        });
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-6 mt-5 mx-auto">
                        <form noValidate onSubmit={this.onSubmit}>
                            <h1 className="h3 mb-3 font-weight-normal">Create a New Mathematician</h1>
                            <div className="form-group">
                                <label htmlFor="first_name">First Name</label>
                                <input type="text"
                                       className="form-control"
                                       name="first_name"
                                       placeholder="Enter First Name"
                                       value={this.state.first_name}
                                       onChange={this.onChange}/>

                            </div>
                            <div className="form-group">
                                <label htmlFor="last_name">Last Name</label>
                                <input type="text"
                                       className="form-control"
                                       name="last_name"
                                       placeholder="Enter Last Name"
                                       value={this.state.last_name}
                                       onChange={this.onChange}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="university">University</label>
                                <input type="text"
                                       className="form-control"
                                       name="university"
                                       placeholder="Enter University"
                                       value={this.state.university}
                                       onChange={this.onChange}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="first_name">Email Address</label>
                                <input type="email"
                                       className="form-control"
                                       name="email"
                                       placeholder="Enter Email"
                                       value={this.state.email}
                                       onChange={this.onChange}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input type="password"
                                       className="form-control"
                                       name="password"
                                       placeholder="Enter Password"
                                       value={this.state.password}
                                       onChange={this.onChange}/>
                            </div>
                            <div>
                                {this.state.validationErrors.map(errorMessage => {
                                    return ( <div key={errorMessage}>
                                            {errorMessage}
                                        </div>
                                    )
                                })
                                }
                            </div>
                            <button type="submit" className="btn btn-lg btn-primary btn-block">
                                Register
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default MathematiciansCreate
