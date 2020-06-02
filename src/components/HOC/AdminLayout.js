import React, { Component } from "react";
import AdminHeader from "../HeaderFooter/AdminHeader";

class AdminLayout extends Component{
    render(){
        return(
            <div>
                <AdminHeader />
                <div className="admin-layout">
                    <div>
                        {this.props.children}
                    </div>
                </div>
            </div>
        )
    }
}

export default AdminLayout;