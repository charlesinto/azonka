import React, { Component } from 'react';
import * as actions from "../../actions";
import { connect } from "react-redux";
import Dashboard from '../HOC/StoreDashboard';
import ItemListDataTable from "../../common/ItemListDataTable";

class index extends Component {
    componentDidMount(){
        this.props.initiateRegistration()
        this.props.fetchItems()
        this.props.setActiveLink('Manage Items')
	}
    uploadNewItem = (e) => {
        e.preventDefault()
        return this.props.history.push('/users/items/upload')
    }
    componentWillUnmount(){
        this.props.resetManageItemsState()
    }
    _handleRowClick = (selectedItemId, action) => {
        if(action === 'edit'){
            console.log('seleced', selectedItemId)
            const index = this.props.products.findIndex(element => element.id === parseInt(selectedItemId))
            if(index !== -1){
                const product = this.props.products.find(element => element.id === parseInt(selectedItemId))
                console.log(product)
                this.props.previewItem(product)
                setTimeout(() => {
                    this.props.history.push('/users/items/upload')
                }, 500)
            }
        }   
        else if(action === 'delete'){

        }
    }
    goToCreateItems = () => {
       return  this.props.history.push('/users/items/upload')
    }
    render() {
        return (
            <Dashboard>
                <h4 className="popup-title verify-email" style={{
                            fontWeight: 'bold',
                            fontFamily: 'Titillium web, sans-serif',
                            marginLeft: 20
                        }}>Your Store Items</h4>
                        <hr className="line-separator"/>
                <div style={{display:'flex', justifyContent:'flex-end', margin: '20px 10px'}}>
                    <button onClick={this.goToCreateItems} type="button" class="btn-cm btn-outline-success">
                        <span style={{marginRight: 10}}>
                            <i className="fas fa-plus"></i></span> Add Item</button>
                </div>
                <div style={{marginTop: 20}}>
                    <ItemListDataTable data={this.props.products}
                        handleRowClick={(id, action) => this._handleRowClick(id, action)}
                    />
                </div>
            {/* <div className="dashboard-content" style={{marginTop: -30}}>
                <div className="headline filter primary">
                    <h4>Manage Items</h4>
                    <form>
                        <label htmlFor="price_filter" className="select-block">
                            <select name="price_filter" id="price_filter">
                                <option value="0">Price (High to Low)</option>
                                <option value="1">Date Created</option>
                            </select>
                        </label>
                    </form>
                </div>
                <div className="product-list grid column4-wrap">
                    <div className="product-item upload-new column" onClick={this.uploadNewItem}>
                        <div className="product-preview-actions">
                            <figure className="product-preview-image">
                                <img src={uploadNew} alt="product" />
                            </figure>
                            
                        </div>
                        <div className="product-info">
                                <p className="text-header">Upload New Item</p>
                                <p className="description">Lorem ipsum dolor sit amet, consectetur adipisicing elit, 
                                    sed do eiusmod tempor incididunt ut labore.</p>
                            </div>
                    </div>
                    {
                        this.props.products.map(product => (
                            <StoreItem 
                                key={product.id}
                                name={product.name}
                                price={product.sellingPrice} 
                                id={product.id}
                                description={product.description}
                                category="electronics" 
                                onwer="onuorah charles" 
                                image={product.mainImageUrl}
                            />
                        ))
                    }
                    
                    <StoreItem 
                        name="mobile phone"
                        price="1200"
                        id={2} 
                        description="Lorem ipsum dolor"
                         category="electronics" 
                         onwer="onuorah charles" 
                         image={cardImage}
                    />
                    <StoreItem 
                        name="mobile phone"
                        price="1200" 
                        id={3}
                        description="Lorem ipsum dolor"
                         category="electronics" 
                         onwer="onuorah charles" 
                         image={cardImage}
                    />
                    <StoreItem 
                        name="mobile phone"
                        price="1200" 
                        id={4}
                        description="Lorem ipsum dolor"
                         category="electronics" 
                         onwer="onuorah charles" 
                         image={cardImage}
                    />
                    <StoreItem 
                        name="mobile phone"
                        price="1200" 
                        id={5}
                        description="Lorem ipsum dolor"
                         category="electronics" 
                         onwer="onuorah charles" 
                         image={cardImage}
                    />
                    <div className="clearfix"></div>
                </div>
            </div> */}
            </Dashboard>
        );
    }
}

const mapStateToProps = state => {
    const {inventory: {products}} = state;
    return {
        products
    }
}

export default connect(mapStateToProps, actions)(index);