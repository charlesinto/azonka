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
        unfilteredList: [],
        currentIndex: 0,
        search: '',
        filter: 'all'
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
    hanldeOnChange = (e) => {
        const {target: {name, value}} = e;

        this.setState({
            [name]: value
        }, () => {
            if(this.state.search === ''){
                this.setState({
                    filter: 'all'
                })
            }
        })
    }
    static getDerivedStateFromProps(nextProps, state){
        console.log(nextProps.delivery)
        if(nextProps.delivery !== state.records && state.filter === 'all'){
            nextProps.delivery.sort(function(a,b){
                // Turn your strings into dates, and then subtract them
                // to get a value that is either negative, positive, or zero.
                return new Date(b.createdAt) - new Date(a.createdAt);
              });
            return {...state, records: nextProps.delivery, unfilteredList: nextProps.delivery}
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
            <div className="row item-header mx-4 mb-4">
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
        for(let i = 1; i <= this.state.totalRecords; i++){
            if(i % 100 === 0){
                links.push(
                    <li key={i} className={`page-item d-flex justify-content-center ${(this.state.currentPage / 100) === (i / 100) ? ' active': ''}`}>
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
    onSearch = e => {
        e.preventDefault()
        const result = this.state.unfilteredList.filter(item => {
            if(item.order === parseInt(this.state.search)){
                return true;
            }
            return false
        })
        this.setState({
            records: result,
            filter:'specific'
        })
    }
    render(){
        return (
           <StoreDashboard>
                <div className="container custom-container" >
                {
                    this.state.records.length > 0 ?
                    <>
                        <div className="row d-flex justify-content-end mb-4">
                            <div className="">
                                <form className="form-inline my-2 my-lg-0">
                                    <input onChange={this.hanldeOnChange} value={this.state.search} name="search" className="form-control mr-sm-2" type="text" placeholder="Search" />
                                    <button onClick={this.onSearch} className="btn btn-secondary my-2 my-sm-0" style={{height:'35px'}} type="submit">Search</button>
                                </form>
                            </div>
                        </div>
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
                            <div className="row d-flex justify-content-end mb-4">
                                <div className="">
                                    <form className="form-inline my-2 my-lg-0">
                                        <input onChange={this.hanldeOnChange} value={this.state.search} name="search" className="form-control mr-sm-2" type="text" placeholder="Search" />
                                        <button onClick={this.onSearch} className="btn btn-secondary my-2 my-sm-0" style={{height:'35px'}} type="submit">Search</button>
                                    </form>
                                </div>
                            </div>
                            {this.renderHeader()}
                            <div className="row d-flex justify-content-center mb-5">
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