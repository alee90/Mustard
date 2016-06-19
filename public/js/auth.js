
// HIGHEST LEVEL COMPONENT
var LogInPage = React.createClass({
	getInitialState: function() {
		var cookieCheck;
		var loggedOutUser;
		if(document.cookie) {
			cookieCheck = true;
			loggedOutUser = false;
		} else {
			cookieCheck = '';
			loggedOutUser = true;
		}
		// so basically a first time user will have authenticatedUser set to ''
		return {
			// books = [],
			authenticatedUser: cookieCheck,
			loggedOutUser: loggedOutUser
		};
	},

	// This is a function that the parent can call that will change the state when someone properly logs in and creates a cookie containing the jwt_token
	changeLogin: function() {
		this.setState({
			authenticatedUser: true,
			loggedOutUser: false
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
				<div>
				<App />
				<Logout />
				</div>
			)
		} else {
			return (
				<div>
				<LoginForm initialLoginCheck={this.state.authenticatedUser} onChange={this.changeLogin}/>
				<SignUpForm />
				</div>
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
			method: 'POST',
			data: {
				username: username,
				password: password
			},
			success: function(data) {
				console.log('Cookie');
				Cookies.set('jwt_token', data.token);
        Cookies.set('id', data.id);
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
			<div className='login-form' >
				<h3>Please Login</h3>
				<form onSubmit={this.handleSubmit}>
					<label htmlFor='username'>Username</label>
					<input className='username-login-form' type='text' value={this.state.username} onChange={this.handleLoginFormChange.bind(this, 'username')}/>
					<br/>
					<label htmlFor='password'>Password</label>
					<input className='password-login-form' type='text' value={this.state.password} onChange={this.handleLoginFormChange.bind(this, 'password')}/>
					<br/>
					<input type='submit'/>
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
			method: 'POST',
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
			<div className='signup-form' >
				<h3>Please Sign Up</h3>
				<form onSubmit={this.handleSubmit}>
					<label htmlFor='username'>Username</label>
					<input className='username-signup-form' type='text' value={this.state.username} onChange={this.handleSignUpChange.bind(this, 'username')}/>
					<br/>
					<label htmlFor='password'>Password</label>
					<input className='password-signup-form' type='password' value={this.state.password} onChange={this.handleSignUpChange.bind(this, 'password')}/>
					<br/>
					<label htmlFor='email'>Email</label>
					<input className='email-signup-form' type='text' value={this.state.email} onChange={this.handleSignUpChange.bind(this, 'email')}/>
					<br/>
					<input type='submit'/>
				</form>
			</div>
		)
	}

})

var Logout = React.createClass({
    handleClick: function() {
        console.log('working button');
        Cookies.remove("jwt_token");
        Cookies.remove('id');
        window.location = '/';

    },
    render: function() {
        return(
            <div>
                <button className='logout' onClick={this.handleClick}>LOGOUT</button>
            </div>
        )

    }
})

///Main component
var App = React.createClass({
  getInitialState: function() {
    return {
        weatherAPI: null,
        nytAPI: null,
        imgurAPI: null,
        choose: false,
        mainNotes: []
         };
  },
  homeButton: function(){
    this.setState({
      weatherAPI: null,
        nytAPI: null,
        imgurAPI: null,
        choose: false
    })
  },
  handleNotes: function(x) {
    this.setState({
      choose: true,
      mainNotes: x
    })
  },
  handleWeatherAPI: function(data) {
    // this.getWeatherAPI();
    this.setState({
      weatherAPI: data,
      choose: true
    })
  },
  handlenytAPI: function(data) {
    // this.getnytAPI();
    this.setState({
      nytAPI: data,
      choose: true
    })
  },
  handleimgurAPI: function(x) {
    // this.getimgurAPI();
     this.setState({
      imgurAPI: x,
      choose: true
    })
  },
  // getNotes: function(){
  //   var identity = Cookies('id');
  //   $.ajax({
  //     method: 'GET',
  //     url: '/users/'+identity+'/notes',
  //   }).done(function(x){
  //     this.handleNotes(x);
  //   }).bind(this);
  // },
  getNotes:function(data) {
    var self = this;
    var identity = Cookies('id');
    // var callback = function(x){
    //   self.handleNotes(x)
    // };
    $.ajax({
        url: "/users/"+identity+'/notes',
        method: 'GET',
        success: function(data) {
          console.log(data);
          // data.forEach(function(merp){
          //   console.log(merp.notes);
          //   var x = merp.notes
          //   callback(x);
          // })
          this.handleNotes(data)
      }.bind(this),
        error: function(xhr, status, err) {
            console.error(status, err.toString());
          }
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
    // console.log('---------------------');
    if(this.state.choose == false) {
      return (
        <Toggle 
        handleWeatherAPI={this.getWeatherAPI}
        handlenytAPI={this.getnytAPI}
        handleimgurAPI={this.getimgurAPI}
        handleNotes={this.getNotes} />
        )
    } else {
      return (
        <div>
          <ApiRender
            weatherAPIChoose={this.state.weatherAPI}
            nytAPIChoose={this.state.nytAPI}
            imgurAPIChoose={this.state.imgurAPI}
            notesChoose={this.state.mainNotes}
            WeatherAPIData={this.getWeatherAPI}
            nytAPIData={this.getnytAPI}
            imgurAPIData={this.getimgurAPI}
            mainNotes={this.getNotes}
            ApiChoose={this.state}
            Home={this.homeButton}
          />
        </div>
      )
    }
  }
});



var Toggle = React.createClass({
  render: function(){
    return(
      <div className="toggle-page">
            <div 
             className="api-one"
             onClick={this.props.handleWeatherAPI}> 
             <button className="clicked"> 
             <img src= "https://cdn.downdetector.com/static/uploads/c/300/f5071/weather_channel.png" /> 
             </button>

             </div>

            <div 
             className="api-two"
             onClick={this.props.handlenytAPI}> 
             <button className="clicked">
             <img src= "http://14575-presscdn-0-73.pagely.netdna-cdn.com/wp-content/uploads/2015/11/New-York-Times-logo.jpg" />
             </button>
             </div>

            <div 
             className="api-three"
             onClick={this.props.handleimgurAPI}>
             <button className="clicked">
             <img src= "http://assets.materialup.com/uploads/a7ab3d40-0001-4ca9-b37d-cf9a6eff969c/teaser.png" />
             </button>
             </div>

             <div className="notes-button"
              onClick={this.props.handleNotes}>
               <button className="clicked">
               <img src ="http://www.t-gaap.com/sites/www.t-gaap.com/assets/images/notes.jpg?1349118446" />
               </button>   
             </div>

        </div> 

        )
  }

})

var identity = Cookies('id');
console.log(identity);


var ApiRender = React.createClass({
  render: function(){ 
  // console.log(this.props.WeatherAPIData);
  // console.log(this.props.nytAPIData);
  // console.log(this.props.imgurAPIData);
  return(

   <div>
     <button onClick={this.props.Home}> Home</button> 
  

    <div>
      <Weather weatherdata={this.props.weatherAPIChoose} />
      <NYTimes nytdata={this.props.nytAPIChoose} />
      <Imgur imgurdata={this.props.imgurAPIChoose}/>
      <NotesDisplayer notesdata={this.props.notesChoose}/>
    </div>  
    </div>
    )

  }
})

var NotesForm = React.createClass(
  {
    getInitialState: function(){
        return {
              notes:[]
          };
    },
    handleNoteChange: function(e){
          console.log(e.target.value);
          this.setState({notes: e.target.value});
    },
    handleSubmit: function(e){
        console.log('!!==== NOTES SUBMISSION ====!!');
        e.preventDefault();
        console.log(this.state);
        this.props.onSubmit({notes: this.state.notes.trim()});
        this.setState({notes: ''});
        this.appendAJAX(this.state);

    },
    appendAJAX: function(x){
        console.log('!!==== ADD NOTES AJAX ====!!');
        $.ajax({
            method: 'POST',
            url: '/users/'+identity+'/notes',
            data: x
        }).done(function(y){
            console.log('yay');
            this.setState({notes: y})
        })
    },
    render: function(){
        return(
            <form 
                className="notesForm" 
                onSubmit={this.handleSubmit} 
                >
            <input 
                type="text"
                placeholder="To do?"
                value={this.state.notes}
                onChange={this.handleNoteChange}
                />
            <input
                type="submit" 
                value="Add!"
                />
            </form>);
        }
    }
);

//APPEND NOTES
var NotesDisplayer = React.createClass({
    getInitialState: function(){
        return {totalNotes: []};
    },
    addNote(note){
        var createNotes = this.state.totalNotes.concat();
        createNotes.push(note);
        this.setState({totalNotes: createNotes});
    },
    render: function(){

      console.log(this.props.notesdata)
      var displayer = this.props.notesdata.map(function(x){
        return(
          <div>
          <h3>{x.notes}</h3>
          </div>
        );
      });

      var displayNote = this.state.totalNotes.map(function(note){
        return(
            <div className="notez">
                <h3>{note.notes}</h3>
            </div>
          );
    });
    return(
        <div>
          {displayer}

            <NotesForm onSubmit={this.addNote}/>
            <p>{displayNote}</p>
        </div>
        );
    }
});



var Weather = React.createClass({
  render:function(){
    var data = this.props.weatherdata;
    if(this.props.weatherdata === null){
    return(
      null
      )
  }else {
    return(
      <h1> Weather API CHosen </h1>
      )
  }
  }

})

var Display = React.createClass({
  render: function(){ 
    console.log(this.props)
    return( 
      <div zip={this.props.zip}>
        <h1>{this.props.name}</h1>
        <h2>{this.props.temp}</h2>
        <h2>{this.props.desc}</h2>
        <h3>Min</h3>
        <h4>{this.props.min}</h4>
        <h3>Max</h3>
        <h4>{this.props.max}</h4>
      </div>
    );
  }
});




var NYTimes = React.createClass({
  getInitialState:function(){
    return{
      storyone: null,
      urlone: " ",
      storytwo: null,
      urltwo: " ",
      storythree: null,
      urlthree: " ",
      storyfour: null,
      urlfour: " ",
      storyfive: null,
      urlfive: " "

    }
  },
  handleStoryone: function() {
    var abstractone = this.props.nytdata.results[0].abstract;
    var URlone = this.props.nytdata.results[0].short_url;
    this.setState({
      storyone: abstractone,
      urlone: URlone
    })
  },
   handleStorytwo: function() {
    var abstracttwo = this.props.nytdata.results[1].abstract;
    var URltwo = this.props.nytdata.results[1].short_url;
    this.setState({
      storytwo: abstracttwo,
      urltwo: URltwo
    })
  },
  handleStorythree: function() {
    var abstractthree = this.props.nytdata.results[2].abstract;
    var URlthree = this.props.nytdata.results[2].short_url;
    this.setState({
      storythree: abstractthree,
      urlthree: URlthree
    })
  },
  handleStoryfour: function() {
    var abstractfour = this.props.nytdata.results[3].abstract;
    var URlfour = this.props.nytdata.results[3].short_url;
    this.setState({
      storyfour: abstractfour,
      urlfour: URlfour
    })
  },
  handleStoryfive: function() {
    var abstractfive = this.props.nytdata.results[4].abstract;
    var URlfive = this.props.nytdata.results[4].short_url;
    this.setState({
      storyfive: abstractfive,
      urlfive: URlfive
    })
  },
  render:function(){
      if(this.props.nytdata === null){
    return(
      null
      )
  }else {
    return(
      <div>
        <h1>NYT API Chosen</h1>
        <div onClick={this.handleStoryone}>
        <h2 className="nyt-times-headline">{this.props.nytdata.results[0].title}</h2>
        <h4>{this.state.storyone}</h4>
        <a href ={this.state.urlone}>{this.state.urlone}</a>
        </div>

         <div onClick={this.handleStorytwo}>
        <h2 className="nyt-times-headline">{this.props.nytdata.results[1].title}</h2>
        <h4>{this.state.storytwo}</h4>
        <a href ={this.state.urltwo}>{this.state.urltwo}</a>
        </div>

         <div onClick={this.handleStorythree}>
        <h2 className="nyt-times-headline">{this.props.nytdata.results[2].title}</h2>
          <h4>{this.state.storythree}</h4>
          <a href ={this.state.urlthree}>{this.state.urlthree}</a>
        </div>

         <div onClick={this.handleStoryfour}>
        <h2 className="nyt-times-headline">{this.props.nytdata.results[3].title}</h2>
          <h4>{this.state.storyfour}</h4>
          <a href ={this.state.urlfour}>{this.state.urlfour}</a>
        </div>

         <div onClick={this.handleStoryfive}>
        <h2 className="nyt-times-headline">{this.props.nytdata.results[4].title}</h2>
          <h4>{this.state.storyfive}</h4>
          <a href ={this.state.urlfive}>{this.state.urlfive}</a>
        </div>
        
      </div>  
      )
  }
  }

})

var Imgur = React.createClass({

  render:function(){
      if(this.props.imgurdata === null){
        // var x = {this.props.imgurdata[0].link}
    return(
      null
      )
  }else {
    return(
      <div>
        <img src={this.props.imgurdata[1].link}/>
        <img src={this.props.imgurdata[2].link}/>
        <img src={this.props.imgurdata[3].link}/>
        <img src={this.props.imgurdata[4].link}/>
        <img src={this.props.imgurdata[5].link}/>
        <img src={this.props.imgurdata[6].link}/>
      </div>
      )
  }
  }

})

ReactDOM.render(<div><LogInPage/></div>
, document.getElementById('main-container'));