

///Main component

var App = React.createClass({
  getInitialState: function() {
    return {
        weatherAPI: null,
        nytAPI: null,
        apithree: null,
        choose: false
         };
  },
  handleChoose: function() {
    this.setState({
      choose: true
    })
  },
  handleWeatherAPI: function(data) {
    this.getWeatherAPI();
    this.setState({
      weatherAPI: data
    })
  },
  handlenytAPI: function() {
    this.setState({
      nytAPI: this.getnytAPI
    })
  },
  handleAPIthree: function() {
    this.setState({
      apithree: this.getAPIthree
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
  getnytAPI:function() {
    return{ 
      nytAPI:"data"
    }
  },
  getAPIthree:function() {
    return{ 
      apithree:"data"
    }

  },

  // Render 
  render: function() {
    console.log('---------------------');
    if(this.state.choose === false) {
      return (
        <Toggle 
        handleWeatherAPI={this.handleWeatherAPI}
        handlenytAPI={this.handlenytAPI}
        handleAPIthree={this.handleAPIthree}
        handleChoose={this.handleChoose} />
        )
    } else {
      return (
        <div>
          <ApiRender
            WeatherAPIChoose={this.state.WeatherAPI}
            nytAPIChoose={this.state.nytAPI}
            apiThreeChoose={this.state.apithree}
            WeatherAPIData={this.getWeatherAPI}
            nytAPIData={this.getnytAPI}
            ApiThreeData={this.getAPIthree}
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
             onClick={this.props.handleWeatherAPI}> API One
             </div>

            <div 
             className="api-two"
             onClick={this.props.handlenytAPI}> API Two
             </div>

            <div 
             className="api-three"
             onClick={this.props.handleAPIthree}> API Three 
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
  console.log(this.props.ApiThreeData);
  return(
    <h1>Works</h1>
    )

  }
})




ReactDOM.render(<App />, document.getElementById('main-container'));


