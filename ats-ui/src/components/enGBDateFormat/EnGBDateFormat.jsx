import React, { Component } from "react";

class EnGBDateFormat extends Component {

    render() {
      
        return (
            <span>
                {(()=>{
                    if(this.props.date)
                        return new Intl.DateTimeFormat("en-GB", { 
                            year: "numeric", 
                            month: "long", 
                            day: "2-digit" 
                        }).format( new Date(this.props.date));
                    return "";
                })()}
            </span>          
        );
    }
}


export default EnGBDateFormat;