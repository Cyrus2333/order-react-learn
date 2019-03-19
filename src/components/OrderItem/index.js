import React, { Component } from 'react';
import "./style.css"

class OrderItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editing: false,
            stars: props.stars || 0,
            comment: props.comment ||"",
            allComment: [],
        }
    }

    handleOpenEditArea = () => {
        this.setState({
            editing:true,
        })
    }

    handleCommentChange = (e) => {
        this.setState({
            comment:e.target.value,
        })
    }

    handleClickStars = (item) => {
        this.setState({
            stars: item,
        })
    }

    handleCancelComment = () => {
        this.setState({
            editing: false,
            stars: this.props.stars || 0,
            comment: this.props.comment ||"",
        })
    }

    handleSubmitComment = () => {
        const { id } = this.props.data;
        const { comment, stars } = this.state;
        this.setState({
            editing: false,
        })
        this.props.onSubmit(id,comment,stars)
        const newComment = {"stars": stars, "comment":comment }
        this.setState({allComment: newComment,})
    }

    renderEditArea() {
        return(
        <div className="OI_commentContainer">
            <textarea className="OI_comment" onChange={this.handleCommentChange} value={this.state.comment}/>
            {this.renderStars()}
            <button className="OI_btn_red" onClick={this.handleSubmitComment}>提交</button>
            <button className="OI_btn_grey" onClick={this.handleCancelComment}>取消</button>
        </div>
        )
    }

    renderStars() {
        const {stars} = this.state;
        return(
            <div className="OI_starContainer">
                {[1,2,3,4,5].map((item,index)=>{
                    const light = item <= stars ? "OI_start_light":""
                    return(
                        <span className={light} key={index} onClick={this.handleClickStars.bind(this,item)}>★</span>
                    )})}
            </div>
        )
    }

    renderComment() {
        const { allComment } = this.state;
        return(
            <div className="OI_allComment">{allComment.stars +":"+ allComment.comment}</div>
        )
    }

    render() {
        const {product,shop,price,pic,ifCommented} = this.props.data;
        return (
            <div className="OI"> 
                <div className="OI_picContainer">
                    <img className="OI_pic" src={pic} alt="产品图片"/>
                </div>
                <div className="OI_content">
                    <div className="OI_product">{product}</div>
                    <div className="OI_shop">{shop}</div>
                    <div className="OI_detail">
                        <div className="OI_price">{price}</div>
                        <div className="OI_btn">
                        {ifCommented ? (
                            <button className="OI_btn_grey">已评价</button>
                        ):(
                            <button className="OI_btn_red" onClick={this.handleOpenEditArea}>评价</button>
                        )}
                        </div>
                    </div>
                </div>
                {this.state.editing ? this.renderEditArea():null}
                {this.state.allComment.length === 0 ? null:this.renderComment()}
            </div>
        );
    }
}

export default OrderItem;