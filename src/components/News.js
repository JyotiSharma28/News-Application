import React, { Component } from 'react'
import Newsitem from './Newsitem'
import Spinner from './spinner'
import PropTypes from'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component'

export class News extends Component {

    static defaultProps={
       country:'in',
       pageSize:12,
       category:'general',
       totalResults:0
    }  
    static propTypes={
      country: PropTypes.string,
      pageSize:PropTypes.number,
      category:PropTypes.string
    }  
    

    constructor(props){
        super(props);
        console.log("hello I am constructor from News component")
        this.state={
            articles:[],
            loading: true,
            page:1
        }
        document.title=this.props.category;
    }

    async update(){
      this.props.setProgress(10)
      const url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=b4f4e03e8549414f92b0478c280a9a8f&page=${this.state.page}&pageSize=${this.props.pageSize}`
      this.setState({loading:true})
      let data=await fetch(url)
      this.props.setProgress(30)
      let parseData=await data.json()
      this.props.setProgress(60)
      this.setState({articles: parseData.articles,totalResults:parseData.totalResults,loading:false})
      this.props.setProgress(100)
    }

    async componentDidMount(){
        // let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=b4f4e03e8549414f92b0478c280a9a8f&page=1&pageSize=${this.props.pageSize}`
        // this.setState({loading:true})
        // let data=await fetch(url)
        // let parseData=await data.json()
        // console.log(parseData)
        // this.setState({articles: parseData.articles,totalResults:parseData.totalResults,loading:false})
        this.update();
    }

     handlePreviousClick=async()=>{
      //   console.log("Previous");
      //   let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=b4f4e03e8549414f92b0478c280a9a8f&page=${this.state.page-1}&pageSize=${this.props.pageSize}`
      //   this.setState({loading:true})
      //   let data=await fetch(url)
      //   let parseData=await data.json()
        
      //  this.setState({
      //   page: this.state.page-1,
      //   articles: parseData.articles,
      //   loading:true
      //  })
      this.setState({page:this.state.page-1})
      this.update();
      
    }

     handleNextClick=async()=>{

        console.log("Next");
        // if(!(this.state.page+1 > Math.ceil(this.state.totalResults/this.props.pageSize))){

        //     let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=b4f4e03e8549414f92b0478c280a9a8f&page=${this.state.page+1}&pageSize=${this.props.pageSize}`
        //     this.setState({loading:true})
        //     let data=await fetch(url)
        //     let parseData=await data.json()
        //     this.setState({
        //         page: this.state.page+1,
        //         articles: parseData.articles,
        //         loading:false
        //     })
        // }
        this.setState({page:this.state.page-1})
        this.update();
        
     }

     fetchMoreData=async ()=>{
            
             const url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=b4f4e03e8549414f92b0478c280a9a8f&page=${this.state.page}&pageSize=${this.props.pageSize}`
             this.setState({page:this.state.page+1})
             this.setState({loading:false})
             let data=await fetch(url)
             let parseData=await data.json()
             console.log(parseData)
             this.setState({articles: this.state.articles.concat(parseData.articles),totalResults:parseData.totalResults,loading:false})
          
     }

  render() {
    return (
      
      <>
        <h2 className='text-center' style={{marginTop:'5%'}}>NewsMonkey- Top Headlines</h2>
        {/* {this.state.loading && <Spinner />} */}
        <InfiniteScroll
            dataLength={this.state.articles.length} //This is important field to render the next data
            next={this.fetchMoreData}
            hasMore={this.state.articles.length !== this.state.totalResults}
            loader={<Spinner />}
            endMessage={
              <p style={{ textAlign: 'center' }}>
                <b>Yay! You have seen it all</b>
              </p>
            } >
              <div className="container">            
                  <div className="row">
                  { this.state.articles.map((element)=>{ 
                      return   <div className="col-md-4" key={element.url}>
                                <Newsitem  title={element? element.title:" "} description={element? element.description:" "} imgurl={element.urlToImage} newsurl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}/>  
                                </div>
                  })}

                  </div>
            </div>
        </InfiniteScroll>
        {/* <div className="container d-flex justify-content-between">
            <a><button disabled={this.state.page<=1} type="button" class="btn btn-dark " onClick={this.handlePreviousClick}>&larr; Previous</button></a> 
            <a><button disabled={this.state.page+1 > Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" class="btn btn-dark " onClick={this.handleNextClick}>Next &rarr; </button></a> 
          
        </div> */}
      </>
    )
  }
}

export default News
