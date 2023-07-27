import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export class Newsitem extends Component {

  render() {

    let {title,description,imgurl,newsurl,author,date,source}=this.props

    return (
      <div className='col-lg my-3'>
          <div className="card h-100" >
            <div style={{display:'flex',justifyContent:'flex-end',position:'absolute',right:0}}> 
            <span className=" badge rounded-pill bg-danger"> {source}</span>
            </div>
         
            <img className="card-img-top" src={imgurl? imgurl:"https://ocs-pl.oktawave.com/v1/AUTH_2887234e-384a-4873-8bc5-405211db13a2/spidersweb/2023/07/mac-studio-apple-m2-ultra-2023-recenzja.jpg"} alt='...' />
            <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <p className="card-text">{description}...</p>
                <p className="card-text"><small className="text-muted">by {author ? author:"unknown"} on {new Date(date).toGMTString()} </small></p>
                <Link to={newsurl} target='_blank' className="btn btn-sm btn-dark">Read more</Link> 
            </div>
         </div>
      </div>
    )
  }
}

export default Newsitem
