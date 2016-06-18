
///Main component

var App = React.createClass({
  getInitialState: function() {
    return {
        weatherAPI: null,
        nytAPI: null,
        imgurAPI: null,
        choose: false
         };
  },
  handleChoose: function() {
    this.setState({
      choose: true
    })
  },
  handleWeatherAPI: function(data) {
    // this.getWeatherAPI();
    this.setState({
      weatherAPI: data
    })
  },
  handlenytAPI: function(data) {
    // this.getnytAPI();
    this.setState({
      nytAPI: data
    })
  },
  handleimgurAPI: function(x) {
    // this.getimgurAPI();
     this.setState({
      imgurAPI: x
    })
  },
  getWeatherAPI:function(data) {
    $.ajax({
          url: "/test/weather/",
        method: 'GET',
        success: function(data) {
          this.handleWeatherAPI(data);
      }.bind(this),
        error: function(xhr, status, err) {
            console.error(status, err.toString());
          }
    })
  },
  getnytAPI:function(data) {
    $.ajax({
        url: '/test',
        method: 'GET',
        success: function(data) {
          this.handlenytAPI(data);
        }.bind(this),
        error: function(xhr, status, err) {
            console.error(status, err.toString());
          }
    })
  },
  getimgurAPI:function() {
    $.ajax({
        url: '/test/pics/forks',
        method: 'GET',
        success: function(data) { 
          var x = data.data;
          this.handleimgurAPI(x);
        }.bind(this),
        error: function(xhr, status, err) {
            console.error(status, err.toString());
          }
    })

  },

  // Render 
  render: function() {
    console.log('---------------------');
    if(this.state.choose == false) {
      return (
        <Toggle 
        handleWeatherAPI={this.getWeatherAPI}
        handlenytAPI={this.getnytAPI}
        handleimgurAPI={this.getimgurAPI}
        handleChoose={this.handleChoose} />
        )
    } else {
      return (
        <div>
          <ApiRender
            WeatherAPIChoose={this.state.weatherAPI}
            nytAPIChoose={this.state.nytAPI}
            imgurAPIChoose={this.state.imgurAPI}
            WeatherAPIData={this.getWeatherAPI}
            nytAPIData={this.getnytAPI}
            imgurAPIData={this.getimgurAPI}
            ApiChoose={this.state}
          />
        </div>
      )
    }
  }
});



var Toggle = React.createClass({
  render: function(){
    return(
      <div>
            <div 
             className="api-one"
             onClick={this.props.handleWeatherAPI}> Weather
             </div>

            <div 
             className="api-two"
             onClick={this.props.handlenytAPI}> NYT 
             </div>

            <div 
             className="api-three"
             onClick={this.props.handleimgurAPI}> IMGUR
             </div>

             <div 
             className="api-choose"
             onClick={this.props.handleChoose}> Choose
             </div>

        </div> 
        )
  }

})





var ApiRender = React.createClass({
  handleWeatherAPIData:function(){
    var Data = this.props.WeatherAPIData;

  },
  handlenytAPIData:function(){

  },
  handlenytAPIData:function(){

  },
  render: function(){ 
  console.log(this.props.WeatherAPIData);
  console.log(this.props.nytAPIData);
  console.log(this.props.imgurAPIData);
  return(
    <h1>Works</h1>
    )

  }
})




ReactDOM.render(<App />, document.getElementById('main-container'));


