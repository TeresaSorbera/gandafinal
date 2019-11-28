import React, { Component } from 'react'
import { register } from './MemberFunctions'

class MembersCreate extends Component {
    constructor() {
        super()
        this.state = {
            first_name: '',
            last_name: '',
            university: '',
            email: '',
            password: '',
        }
        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    onChange(e) {
        this.setState({[e.target.name] : e.target.value})
        this.setState({[e.target.university] : e.target.value})
    }

    onSubmit(e) {
        e.preventDefault()

        const member = {
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            university: this.state.university,
            email: this.state.email,
            password: this.state.password
        }

        register(member).then(res => {
            this.props.history.push(`/login`)
        })
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-6 mt-5 mx-auto">
                        <form noValidate onSubmit={this.onSubmit}>
                            <h1 className="h3 mb-3 font-weight-normal">Create a New Member</h1>
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

export default MembersCreate
