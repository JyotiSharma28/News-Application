import React, { Component } from 'react'
import Loading from './Loading1.gif'

export class spinner extends Component {
  render() {
    return (
      <div className='text-center'>
        <img className='my-3' src={Loading} alt="Loading" style={{height:'30px'}} />
      </div>
    )
  }
}

export default spinner
