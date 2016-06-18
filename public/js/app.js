///Main component

var App = React.createClass({
	getInitialState: function() {
		return {
	    	apione: false,
	    	apitwo: false,
        apithree: false,
	    	choose: false
	       };
	},
  handleChoose: function() {
    this.setState({
      choose: true
    })
  },
  handleAPIone: function() {
    this.setState({
      apione: true
    })
  },
  handleAPItwo: function() {
    this.setState({
      apitwo: true
    })
  },
  handleAPIthree: function() {
    this.setState({
      apithree: true
    })
  },
  getWeatherData: function(){
    $.ajax({
          url: "/test/weather/",
        method: 'GET',
        success: function(data) {
              console.log(data);
        },
        error: function(xhr, status, err) {
            console.error(status, err.toString());
          }
    })
},
	getAPItwo:function() {

	},

	// Render 
	render: function() {
		console.log('---------------------');
		if(this.state.choose === false) {
			return (
        <div>
            <div 
             className="api-one"
             onClick={this.handleAPIone, this.getWeatherData}> API One
             </div>

            <div 
             className="api-two"
             onClick={this.handleAPItwo}> API Two
             </div>

            <div 
             className="api-three"
             onClick={this.handleAPIthree}> API Three 
             </div>

    				 <div 
             className="api-choose"
             onClick={this.handleChoose}> Choose
             </div>

        </div> 
				)
		} else {
			return (
				<div>
					<ApiRender />
				</div>
			)
		}
	}
});









var ApiRender = React.createClass({


  render: function(){ 
  return(
    <div>
    API's HAVE BEEN CHOOSEN
    </div>
    )

}
})




ReactDOM.render(<App />, document.getElementById('main-container'));


