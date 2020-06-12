import React, { Component} from "react";
import { connect } from "react-redux";
import * as actions from "../../actions";
import nodataImg from '../../assets/nodatafound.png'
import StoreDashboard from "../HOC/StoreDashboard";
import DeliveryRow from "../../common/DeliveryRow";

class MyDelivery extends Component {
    state = {
        pageCount: 10,
        totalRecords: 1000,
        currentPage: 0,
        records: [],
        currentIndex: 0
    }
    componentDidMount(){
        this.props.setActiveLink('My Deliveries')
        const id = this.props.match.params.id;
        this.props.initiateRegistration()
        if(id == null){
           return this.props.getSellerDeliveries(this.state.currentPage, this.state.totalRecords)
        }

        return this.props.getSellerDelieryById(id)
        
        
    }
    static getDerivedStateFromProps(nextProps, state){
        console.log(nextProps.delivery)
        if(nextProps.delivery !== state.records){
            return {...state, records: nextProps.delivery}
        }
        return null
    }
    renderRows(){
       return  this.state.records.map(data => {
             return <DeliveryRow 
                    id={data.id}
                    handleItemDelete={this.handleItemDelete}
                    data={data}
                    fullData={data}
                    />
        })
    }
    renderHeader = () => {
        return (
            <div className="row item-header mx-4">
                <div className="header-item-orderId col-md-1 ">
                    ORDER
                </div>
                <div className="header-item-name col-md-4 ">
                    ITEM
                    </div>
                <div className="header-item-price col-md-2  text-center">
                    STATUS
                    </div>

                <div className="header-item-subtotal col-md-2  text-center">
                    ACTION
                    </div>
                
            </div>
        )
    }
    renderPagination(){
        let links = [];
        for(let i = 0; i < this.state.totalRecords; i++){
            if(i % 100 === 0){
                links.push(
                    <li key={i} className={`page-item ${(this.state.currentPage / 100) === (i / 100) ? ' active': ''}`}>
                        <span onClick={() => this.moveToNextPage(i / 100)} className="page-link" id={`${i/100}`} to={`#${i/100}`}>{i / 100}</span>
                    </li>
                )
            }
        }
        
        return (
            <nav aria-label="Page navigation example my-6">
                <ul className="pagination justify-content-end">
                    {
                        
                    }
                    <li className="page-item" onClick={() => this.moveToPrevious()}>
                    <span className="page-link" tabindex="-1">Previous</span>
                    </li>
                    {
                        links.map(element => element)
                    }
                    <li className="page-item" onClick={() => this.next()}>
                    <span className="page-link" >Next</span>
                    </li>
                </ul>
                </nav>
        )
    }
    moveToPrevious = async () => {
        if(this.state.currentPage - 100 === 0) return ;
        await this.props.getSellerDeliveries(this.state.currentPage, this.state.currentPage - 100);
        this.setState({
            currentPage: this.state.currentPage - 100
        })
    }
    next = async () => {
        await this.props.getSellerDeliveries(this.state.currentPage, this.state.currentPage + 100);
        this.setState({
            currentPage: this.state.currentPage + 100
        })
    }
    moveToNextPage = async (pageNumber) => {
        this.props.initiateRegistration();
        await this.props.getSellerDeliveries(pageNumber * 100, (pageNumber * 100) + 100);
        this.setState({
            currentPage: pageNumber * 100
        })
    }
    dropDownButton = () => {
        return (
            <div className="dropdown">
            <button className="btn-cm btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Dropdown button
            </button>
            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <a className="dropdown-item" href="#n">Action</a>
                <a className="dropdown-item" href="#n">Another action</a>
                <a className="dropdown-item" href="#n">Something else here</a>
            </div>
            </div>
        )
    }
    render(){
        return (
           <StoreDashboard>
                <div className="container custom-container" >
                {
                    this.state.records.length > 0 ?
                    <>
                        
                        {this.renderHeader()}

                        {this.renderRows()}

                        <div className="my-8 hide-mobile">
                            {this.renderPagination()}
                        </div>
                        <div className="mobile-item-details-wrapper">
                        <nav aria-label="Page navigation example my-6">
                            <ul className="pagination justify-content-end">
                                {
                                    
                                }
                                <li className="page-item" onClick={() => this.moveToPrevious()}>
                                <span className="page-link" tabindex="-1">Previous</span>
                                </li>
                                <li className="page-item" onClick={() => this.next()}>
                                <span className="page-link" >Next</span>
                                </li>
                            </ul>
                            </nav>
                        </div>
                    </>
                     :
                    (
                        <div>
                            
                            {this.renderHeader()}
                            <div className="row d-flex justify-content-center my-5">
                                <img style={{width: '350px', height: '200px'}} src={nodataImg} alt="Empty state" className="img-empty-state" />
                            </div>
                            <div className="my-8 hide-mobile">
                            {this.renderPagination()}
                            </div>
                            <div className="mobile-item-details-wrapper">
                            <nav aria-label="Page navigation example my-6">
                                <ul className="pagination justify-content-end">
                                    
                                    <li className="page-item" onClick={() => this.moveToPrevious()}>
                                    <span className="page-link" href="#2" tabindex="-1">Previous</span>
                                    </li>
                                    <li className="page-item" onClick={() => this.next()}>
                                    <span className="page-link" href="#1">Next</span>
                                    </li>
                                </ul>
                                </nav>
                            </div>
                        </div>
                    )
                }
            </div>
           </StoreDashboard>
        )
    }
}

const mapStateToProps = state => {
    const {inventory: {delivery}} = state;
    return {delivery}
}

export default connect(mapStateToProps, actions)(MyDelivery);