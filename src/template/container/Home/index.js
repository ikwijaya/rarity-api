import React, { Component } from "react";
import { connect } from 'react-redux';

export class Home extends Component {
    constructor(props) {
        super(props)
        this.state = { // eslint-disable-line no-undef
            _loading: true
        }
    }

    componentDidMount(){
        const { actionsetInit } = this.props
        return actionsetInit()
            .then(() => {
                return this.setState({ _loading: false })
            })
            .catch(() => {
                return this.setState({ _loading: false })
            })
    }

    render(){
        return(
            <div>
                Hello World
            </div>
        );
    }
}

const mapStateToProps = (state) => ({ // eslint-disable-line no-unused-vars

})

const mapDispatchToProps = {}
export default connect(mapStateToProps, mapDispatchToProps)(Home)