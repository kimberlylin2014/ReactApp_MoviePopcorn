import React, { Component } from 'react'

class Form extends Component {
    constructor(props) {
        super(props);
        this.state = {searchKeyword: "",
                      error: null                
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleOnChange = this.handleOnChange.bind(this);
    }
    handleSubmit(e) {
        e.preventDefault();
        this.setState({error: null, searchKeyword: ""});
        this.props.fetchData(this.state)
            .catch(e => {
                console.log(e.message)
                this.setState({error: "Something Went Wrong"})
            });
    }
    handleOnChange(e) {
        this.setState({
            [e.target.name] : e.target.value
        })
    }
    render() {
        return(
            <div className = "Form">
                <form onSubmit={this.handleSubmit}>
                <div className = "form-group">
                    <label htmlFor = "searchKeyword">Search Any Keywords..</label>
                    <input type = "text" className = "form-control" id = "searchKeyword" aria-describedby = "search" 
                           name = "searchKeyword"
                           value = {this.state.searchKeyword}
                           onChange = {this.handleOnChange}>
                    </input>
                </div>
                <p>{this.state.error ? this.state.error : ""}</p>
                <button type = "submit" className = "btn btn-info">Search</button>
                </form>
            </div>
        )
    }
}

export default Form;