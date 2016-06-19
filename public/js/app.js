
///Main component
//AUTH0 COMPONENT
// var App = React.createClass({
// 	componentWillMount: function() {
//       	this.lock = new Auth0Lock('ayXZtD76COwoeUKF8xX1IoqXQY8mNZq0', 'mustard.auth0.com');
//       	this.setState({idToken: this.getIdToken()});
//   	},
//   	createLock: function(){
//   		this.lock = new Auth0Lock(this.props.clientId, this.props.domain);
//   	},
//   	getIdToken: function(){
//   		var idToken = localStorage.getItem('id_token');
//   		var authHash = this.lock.parseHash(window.location.hash);
//   		if(!idToken && authHash){
//   			if (authHash.id_token){
//   				idToken = authHash.id_token;
//   				localStorage.setItem('id_token', authHash.id_token);
//   			}
//   			if(authHash.error){
//   				console.log('errror', authHash);
//   			}
//   		}
//   		return idToken;
//   	},
//   	render: function() {
//   		if(this.state.idToken){
//   			return(<LoggedIn lock={this.lock} idToken={this.state.idToken} />);
//   		} else {
// 	    return (<Home lock={this.lock} />);
// 	  	}
// 	}
// });

// var Home = React.createClass({
// 	showLock: function(){
// 		this.props.lock.show();
// 	},
// 	render: function(){
// 		return(
// 			<div className='login-box'>
// 				<a onClick={this.showLock}>Sign In!</a>
// 			</div>)
// 	}
// })

// var LoggedIn = React.createClass({
// 	getInitialState: function(){
// 		return{
// 			profile: null
// 		}
// 	},
// 	componentDidMount: function(){
// 		//RETRIEVE PROFILE
// 		this.props.lock.getProfile(this.props.idToken, function(err,profile){
// 			if(err){
// 				console.log('error loading profile', err)
// 				return;
// 			} 
// 			this.setState({profile: profile});
// 		}.bind(this));
// 	},

// 	render: function(){
// 		if (this.state.profile){
// 			console.log(this.state.profile);
// 		console.log(this.state.profile.identities[0].access_token);
// 			return(<div>
// 				<h2>Welcome {this.state.profile.nickname}</h2>
// 				</div>

// 								);
// 		} else {
// 			return(
// 			<div className='loading'>Loading</div>
// 		)
// 	}
// 	}
// })

// var APICalls = React.createClass({
// 	getInitialState: function(){
// 		return {poems: '', fork:''}
// 	},
// 	getPoemState: function(poem){
// 		this.setState({poems: poem})
// 	}
// 	getPoems : function(){
// 		$.ajax({
// 			method: 'GET',
// 			url: 'http://shakeitspeare.com/api/poem',
// 		}).done(function(x){
// 			console.log(x);
// 			getPoemState(x);
// 			})
// 	},	
// 	getForks: function(){
// 		$.ajax({
// 			method: 'GET',
// 			url: '/users/forks'
// 		}).done(function(x){
// 			console.log(x);
// 		})
// 	},
// })




// ReactDOM.render(<App />, document.getElementById('main-container'));


// /AUTH0 COMPONENT
// var App = React.createClass({
//  componentWillMount: function() {
//        this.lock = new Auth0Lock('ayXZtD76COwoeUKF8xX1IoqXQY8mNZq0', 'mustard.auth0.com');
//        this.setState({idToken: this.getIdToken()});
//    },
//    createLock: function(){
//      this.lock = new Auth0Lock(this.props.clientId, this.props.domain);
//    },
//    getIdToken: function(){
//      var idToken = localStorage.getItem('id_token');
//      var authHash = this.lock.parseHash(window.location.hash);
//      if(!idToken && authHash){
//        if (authHash.id_token){
//          idToken = authHash.id_token;
//          localStorage.setItem('id_token', authHash.id_token);
//        }
//        if(authHash.error){
//          console.log('errror', authHash);
//        }
//      }
//      return idToken;
//    },
//    render: function() {
//      if(this.state.idToken){
//        return(<LoggedIn lock={this.lock} idToken={this.state.idToken} />);
//      } else {
//      return (<Home lock={this.lock} />);
//      }
//  }
// });

// var Home = React.createClass({
//  showLock: function(){
//    this.props.lock.show();
//  },
//  render: function(){
//    return(
//      <div className='login-box'>
//        <a onClick={this.showLock}>Sign In!</a>
//      </div>)
//  }
// })

// var LoggedIn = React.createClass({
//  getInitialState: function(){
//    return{
//      profile: null
//    }
//  },
//  componentDidMount: function(){
//    //RETRIEVE PROFILE
//    this.props.lock.getProfile(this.props.idToken, function(err,profile){
//      if(err){
//        console.log('error loading profile', err)
//        return;
//      } 
//      this.setState({profile: profile});
//    }.bind(this));
//  },

//  render: function(){
//    if (this.state.profile){
//      console.log(this.state.profile);
//    console.log(this.state.profile.identities[0].access_token);
//      return(<div>
//        <h2>Welcome {this.state.profile.nickname}</h2>
//        </div>

//                );
//    } else {
//      return(
//      <div className='loading'>Loading</div>
//    )
//  }
//  }
// })


//AUTH0 COMPONENT
// var App = React.createClass({
// 	componentWillMount: function() {
//       	this.lock = new Auth0Lock('ayXZtD76COwoeUKF8xX1IoqXQY8mNZq0', 'mustard.auth0.com');
//       	this.setState({idToken: this.getIdToken()});
//   	},
//   	createLock: function(){
//   		this.lock = new Auth0Lock(this.props.clientId, this.props.domain);
//   	},
//   	getIdToken: function(){
//   		var idToken = localStorage.getItem('id_token');
//   		var authHash = this.lock.parseHash(window.location.hash);
//   		if(!idToken && authHash){
//   			if (authHash.id_token){
//   				idToken = authHash.id_token;
//   				localStorage.setItem('id_token', authHash.id_token);
//   			}
//   			if(authHash.error){
//   				console.log('errror', authHash);
//   			}
//   		}
//   		return idToken;
//   	},
//   	render: function() {
//   		if(this.state.idToken){
//   			return(<LoggedIn lock={this.lock} idToken={this.state.idToken} />);
//   		} else {
// 	    return (<Home lock={this.lock} />);
// 	  	}
// 	}
// });

// var Home = React.createClass({
// 	showLock: function(){
// 		this.props.lock.show();
// 	},
// 	render: function(){
// 		return(
// 			<div className='login-box'>
// 				<a onClick={this.showLock}>Sign In!</a>
// 			</div>)
// 	}
// })

// var LoggedIn = React.createClass({
// 	getInitialState: function(){
// 		return{
// 			profile: null
// 		}
// 	},
// 	componentDidMount: function(){
// 		//RETRIEVE PROFILE
// 		this.props.lock.getProfile(this.props.idToken, function(err,profile){
// 			if(err){
// 				console.log('error loading profile', err)
// 				return;
// 			} 
// 			this.setState({profile: profile});
// 		}.bind(this));
// 	},

// 	render: function(){
// 		if (this.state.profile){
// 			console.log(this.state.profile);
// 		console.log(this.state.profile.identities[0].access_token);
// 			return(<div>
// 				<h2>Welcome {this.state.profile.nickname}</h2>
// 				</div>

// 								);
// 		} else {
// 			return(
// 			<div className='loading'>Loading</div>
// 		)
// 	}
// 	}
// })
