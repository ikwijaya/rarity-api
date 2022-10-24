import React, { Component } from "react";
import { Spin, Alert } from 'antd'

export default class Loading extends Component {
    render() {
        return (
            <div className="">
                <Spin tip="please wait.."></Spin>
            </div>
        )
    }
}