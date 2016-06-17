
// HIGHEST LEVEL COMPONENT
var LogInPage = React.createClass({
	getInitialState: function() {
		// I do a cookie check here just as a hacky bonus so if you refresh it still works
		// This works for proof of concept but as you build out...it could be abused on prod but that's super bonus
		var cookieCheck;
		if(document.cookie) {
			cookieCheck = true;
		} else {
			cookieCheck = '';
		}
		// so basically a first time user will have authenticatedUser set to ''
		return {
			// books = [],
			authenticatedUser: cookieCheck,
		};
	},

	// This is a function that the parent can call that will change the state when someone properly logs in and creates a cookie containing the jwt_token
	changeLogin: function() {
		this.setState({
			authenticatedUser: true
		})
	},

	// Render 
	render: function() {
		console.log('authenticatedUser: ', this.state.authenticatedUser);
		console.log('---------------------');
		console.log('cookie:', document.cookie);

		// If logged in state verified, show a different component
		if(this.state.authenticatedUser === true) {
			return (
				<App />
			)
		} else {
			// If state.authenticatedUser is not true, render the login component
			// 1. Pass the state of the parent as a prop called initialLoginCheck to the child
			// 2. Pass the callback function as a prop called onChange, remember, this function will tell the parent to update the state
			return (
				<LoginForm initialLoginCheck={this.state.authenticatedUser} onChange={this.changeLogin}/>
			)
		}
	}
});


// LoginFormComponent
var LoginForm = React.createClass({
	getInitialState: function() {
		return {
			username: this.props.initialLoginCheck,
			password: this.props.initialLoginCheck,
			loginStatus: this.props.initialLoginCheck
		};
	},
	handleLoginFormChange: function(stateName, e) {
		var change = {};
		change[stateName] = e.target.value;
		this.setState(change);
	},
	handleSubmit: function(e) {
		e.preventDefault();
		var username = this.state.username.trim();
		var password = this.state.password.trim();
		this.loginAJAX(username, password);
	},
	loginAJAX: function(username, password) {
		$.ajax({
			url: '/auth',
			method: "POST",
			data: {
				username: username,
				password: password
			},
			success: function(data) {
				console.log('Cookie');
				Cookies.set('jwt_token', data.token);
				console.log(data);
				this.props.onChange(data.token)
			}.bind(this),
			error: function(xhr, status, err) {
				console.error(status, err.toString());
			}.bind(this)
		});
	},
	render: function() {
		return (
			<div className="login-form" >
				<h3>Please Login</h3>
				<form onSubmit={this.handleSubmit}>
					<label htmlFor="username">Username</label>
					<input className="username-login-form" type="text" value={this.state.username} onChange={this.handleLoginFormChange.bind(this, 'username')}/>
					<br/>
					<label htmlFor="password">Password</label>
					<input className="password-login-form" type="text" value={this.state.password} onChange={this.handleLoginFormChange.bind(this, 'password')}/>
					<br/>
					<input type="submit"/>
				</form>
			</div>
		)
	}
})

var SignUpForm = React.createClass({
	getInitialState: function() {
		return {
			username: '',
			password: '',
			email: '',
		};
	},
	handleSignUpChange: function(stateName, e) {
		var change = {};
		change[stateName] = e.target.value;
		this.setState(change);
	},
	handleSubmit: function(e) {
		e.preventDefault();
		var username = this.state.username.trim();
		var password = this.state.password.trim();
		var email = this.state.email.trim();
		this.signupAJAX(username, password, email);
	},
	signupAJAX: function(username, password, email) {
		$.ajax({
			url: '/users',
			method: "POST",
			data: {
				username: username,
				password: password,
				email: email
			},
			success: function(data) {
				console.log(data.username);
				if(data){
					location.reload();
				}
			},
			error: function(xhr, status, err) {
				console.error(status, err.toString());
			}
		});
	},
	render: function() {
		return (
			<div className="signup-form" >
				<h3>Please Sign Up</h3>
				<form onSubmit={this.handleSubmit}>
					<label htmlFor="username">Username</label>
					<input className="username-signup-form" type="text" value={this.state.username} onChange={this.handleSignUpChange.bind(this, 'username')}/>
					<br/>
					<label htmlFor="password">Password</label>
					<input className="password-signup-form" type="password" value={this.state.password} onChange={this.handleSignUpChange.bind(this, 'password')}/>
					<br/>
					<label htmlFor="email">Email</label>
					<input className="email-signup-form" type="text" value={this.state.email} onChange={this.handleSignUpChange.bind(this, 'email')}/>
					<br/>
					<input type="submit"/>
				</form>
			</div>
		)
	}

})

// Create SignUpComponent
// - Add a link to the loginform component
// 	- you can either kick back logic to the parent or even make signup a child of the login
// 	- it's all the same concept. pitch and catch
// 	- parents send states as props to kids along with a callback to update themself
// 	- kids replicate their own state with the props they got
// 	- kids change a state that triggers the callback
// 	- MEOW!

//AUTH0 COMPONENT
var App = React.createClass({
	componentWillMount: function() {
      	this.lock = new Auth0Lock('ayXZtD76COwoeUKF8xX1IoqXQY8mNZq0', 'mustard.auth0.com');
      	this.setState({idToken: this.getIdToken()});
  	},
  	createLock: function(){
  		this.lock = new Auth0Lock(this.props.clientId, this.props.domain);
  	},
  	getIdToken: function(){
  		var idToken = localStorage.getItem('id_token');
  		var authHash = this.lock.parseHash(window.location.hash);
  		if(!idToken && authHash){
  			if (authHash.id_token){
  				idToken = authHash.id_token;
  				localStorage.setItem('id_token', authHash.id_token);
  			}
  			if(authHash.error){
  				console.log('errror', authHash);
  			}
  		}
  		return idToken;
  	},
  	render: function() {
  		if(this.state.idToken){
  			return(<LoggedIn lock={this.lock} idToken={this.state.idToken} />);
  		} else {
	    return (<Home lock={this.lock} />);
	  	}
	}
});

var Home = React.createClass({
	showLock: function(){
		this.props.lock.show();
	},
	render: function(){
		return(
			<div className='login-box'>
				<a onClick={this.showLock}>Sign In!</a>
			</div>)
	}
})

var LoggedIn = React.createClass({
	getInitialState: function(){
		return{
			profile: null
		}
	},
	componentDidMount: function(){
		//RETRIEVE PROFILE
		this.props.lock.getProfile(this.props.idToken, function(err,profile){
			if(err){
				console.log('error loading profile', err)
				return;
			} 
			this.setState({profile: profile});
		}.bind(this));
	},
	render: function(){
		if (this.state.profile){
			return(
				<h2>Welcome {this.state.profile.nickname}</h2>
				);
		} else {
			return(
			<div className='loading'>Loading</div>
		)
	}
	}
})

ReactDOM.render(<div><LogInPage/><SignUpForm /></div>
, document.getElementById('main-container'));