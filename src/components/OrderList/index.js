import React, { Component } from 'react';
import OrderItem from '../OrderItem';

class OrderList extends Component {
    constructor(props){
        super(props)
        this.state = {data:[]}
    }

    componentDidMount(){
        fetch("./mock/oders.json").then(res => {
            if (res.ok) {
                res.json().then(deta => {
                    this.setState({data:deta})
                })
            }
         })
    }

    handleSubmit = (id, comment, stars) => {
        /* 这里应该先把数据发给服务器，发送成功后在回调函数中执行 */
        const newDate = this.state.data.map(item => {
            return item.id === id ? {...item, comment, stars, ifCommented: true,} : item;
        })
        this.setState({
            data: newDate,
        })
    }

    render() {
        return (
            <div className="OL">
                {
                    this.state.data.map(item => {return <OrderItem key={item.id} data={item} onSubmit={this.handleSubmit} />})
                }
            </div>
        );
    }
}

export default OrderList;