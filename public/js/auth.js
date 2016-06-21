
//LOGIN PAGE REACT
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
        return {
            authenticatedUser: cookieCheck,
            loggedOutUser: loggedOutUser
        };
    },

    //Change state of login
    changeLogin: function() {
        this.setState({
            authenticatedUser: true,
            loggedOutUser: false
        })
    },

    //RENDER 
    render: function() {

        console.log('authenticatedUser: ', this.state.authenticatedUser);
        console.log('---------------------');
        console.log('cookie:', document.cookie);

        //if authenticated, start using app.
        if(this.state.authenticatedUser === true) {
            return (
                <div>
                <App />
                <Logout />
                </div>
            )
        } else {
            return (
                <div className="home-page">
                <LoginForm initialLoginCheck={this.state.authenticatedUser} onChange={this.changeLogin}/>
                
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
            loginStatus: this.props.initialLoginCheck,
            create: false
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
    showSignupForm: function(){
      this.setState({ 
        create: true
      })
    },
     backButton:function(){
      this.setState({
        create: false
      })
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
      if(this.state.create === false){
        return (
            <div className='login-form' >
                <h1 className="login-text"> Login </h1>
                <form onSubmit={this.handleSubmit}>
                    <input className='username-login-form' type='text' placeholder='Username' value={this.state.username} onChange={this.handleLoginFormChange.bind(this, 'username')}/>
                    <br/>
                    <input className='password-login-form' type='password' placeholder='Password' value={this.state.password} onChange={this.handleLoginFormChange.bind(this, 'password')}/>
                    <br/>
                    <button 
                    className="login-button"
                    type='submit'>Login</button>
                </form>
                <button
                 className="new-user-button"
                 onClick={this.showSignupForm}>New User</button>
            </div>
        )
       }
      else { 
         return(
          <div>
          <SignUpForm />
          <button 
          className="back-button"
          onClick={this.backButton}> Back </button>
          </div>
          ) 

      } 
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
                <h1 className="login-text">Sign Up</h1>
                <form onSubmit={this.handleSubmit}>
                    <input className='username-sign-form' type='text' placeholder='Username' value={this.state.username} onChange={this.handleSignUpChange.bind(this, 'username')}/>
                    <br/>
                    <input className='password-sign-form' type='password' placeholder='Password' value={this.state.password} onChange={this.handleSignUpChange.bind(this, 'password')}/>
                    <br/>
                    <input className='email-signup-form' type='text' placeholder='Email' value={this.state.email} onChange={this.handleSignUpChange.bind(this, 'email')}/>
                    <br/>
                    <button
                    className="signup-button" 
                    type='submit' >Sign up
                    </button>
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

//MEAT OF THE APP IS HERE
var App = React.createClass({
  getInitialState: function() {
    return {
        weatherAPI: null,
        nytAPI: null,
        imgurAPI: null,
        notesAPI: [],
        choose: false,

         };
  },
  homeButton: function(){
    this.setState({
      weatherAPI: null,
        nytAPI: null,
        imgurAPI: null,
        notesAPI: [],
        choose: false
    })
  },
  handleNotes: function(x) {
    this.setState({
      notesAPI: x,
      choose: true,

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
          console.log(data);
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

  //Render 
  render: function() {
    // console.log('---------------------');
    if(this.state.choose == false) {
      return (
        <div>
        <Toggle 
        handleWeatherAPI={this.getWeatherAPI}
        handlenytAPI={this.getnytAPI}
        handleimgurAPI={this.getimgurAPI}
        handleNotes={this.getNotes} />
        </div>
        )
    } else {
      return (
        <div>
          <ApiRender
            weatherAPIChoose={this.state.weatherAPI}
            nytAPIChoose={this.state.nytAPI}
            imgurAPIChoose={this.state.imgurAPI}
            notesChoose={this.state.notesAPI}
            WeatherAPIData={this.getWeatherAPI}
            nytAPIData={this.getnytAPI}
            imgurAPIData={this.getimgurAPI}
            mainnote={this.getNotes}
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
            <h1 className="toggle-header">Mustard</h1>
            <div 
             className="api-one"
             onClick={this.props.handleWeatherAPI}> 
          
             <img src= "https://cdn.downdetector.com/static/uploads/c/300/f5071/weather_channel.png" /> 
        

             </div>

            <div 
             className="api-two"
             onClick={this.props.handlenytAPI}> 
        
             <img src= "http://14575-presscdn-0-73.pagely.netdna-cdn.com/wp-content/uploads/2015/11/New-York-Times-logo.jpg" />
          
             </div>

            <div 
             className="api-three"
             onClick={this.props.handleimgurAPI}>
            
             <img src= "http://assets.materialup.com/uploads/a7ab3d40-0001-4ca9-b37d-cf9a6eff969c/teaser.png" />
        
             </div>

             <div className="notes-button"
              onClick={this.props.handleNotes}>
        
               <img src ="http://www.t-gaap.com/sites/www.t-gaap.com/assets/images/notes.jpg?1349118446" />
            
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
     <button 
     className="home-button"
     onClick={this.props.Home}> Home</button> 
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
            notes:''
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
        // this.props.notesdata.push(notes);
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
            // this.setState({notes: y})
        })
    },
    render: function(){
      // if(this.props.notechoose != null){
        return(
            <form 
              onSubmit={this.handleSubmit} 
                >
            <input 
            	className='note'
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
    //     }
    //  else{
    //   return(<div></div>)
    // }
  }
});

//APPEND NOTES
var NotesDisplayer = React.createClass({
    getInitialState: function(){
        return {
          totalNotes: [],

        };
    },
    addNote(note){
        var createNotes = this.state.totalNotes.concat();
        createNotes.push(note);
        this.setState({
          totalNotes: createNotes,
        });
    },
    deleteAJAX: function(id) {
      var self = this;
      var identity = Cookies('id');
      console.log(id);
      $.ajax({
          url: '/users/'+identity+'/notes/'+id,
          method: 'DELETE',
          success: function(x) {
            console.log('yay');
            this.setState({
              totalNotes: x,
            });
            location.reload();
          }.bind(this),
          error: function(xhr, status, err) {
              console.error(status, err.toString());
            }
      })
  },
    render: function(){
      // console.log(this.props.notesdata)
      var self = this;
      var displayer = this.props.notesdata.map(function(x){
          console.log(x._id);
      console.log(x.notes);
          var callback = function(e){
            e.preventDefault();
            // console.log(x._id);
            self.deleteAJAX(x._id);
        }
        return(
          <div className='note'>
           <p>{x.notes}</p>
            <img className='delete-button'
           		onClick={callback}
            	src="http://www.homeadvisor.com/r/wp-content/uploads/2016/01/x.png" />
            </div>
        );
      });

      var displayNote = this.state.totalNotes.map(function(note){
        console.log(note);
        return(
            <div>
            	<p className='note'>{note.notes}</p>
            </div>
          );

    });
    return(
        <div>
            {displayer}
            {displayNote}
            <NotesForm 
            onSubmit={this.addNote}/>
        </div>
        );  
    }
});






var Weather = React.createClass({
  render:function(){
    var data = this.props.weatherdata;
    // var y = data.main.temp*(9/5)- 459.67;
    // console.log(y);
    if(this.props.weatherdata === null){
    return(
      null
      )
  }else {

    return(
    <div className="weather-data-container">	
      <div className="weather-data">
        <h1>Place: {data.name}</h1>
        <h2>Temperature: {(data.main.temp*(9/5)-459.67).toFixed(2)} Degrees</h2>
        <h2>Description: {data.weather[0].description}</h2>
        <h3>{data.main.humidity}% Humidity</h3>
        </div>
     </div>   
      )
  }
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
   hideStorythree: function() {
    var abstractthree = this.props.nytdata.results[2].abstract;
    var URlthree = this.props.nytdata.results[2].short_url;
    this.setState({
      storythree: null,
      urlthree: " "
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
      <div className="nyt-content">
        <img className="nyt-logo" src="http://www.newspapers.psu.edu/wp-content/uploads/sites/1856/2013/02/NYTLogo.jpg" />
  
          <div onClick={this.handleStoryone}
              className="nyt-times-headline-one">
          <h2 className="nyt-times-headline-one-text">{this.props.nytdata.results[0].title}</h2>
          <h4 className="info">{this.state.storyone}</h4>
          <a className="link" href ={this.state.urlone}>{this.state.urlone}</a>
          </div>

           <div onClick={this.handleStorytwo}
              className="nyt-times-headline-two">
          <h2 className="nyt-times-headline-two-text">{this.props.nytdata.results[1].title}</h2>
          <h4 className="info">{this.state.storytwo}</h4>
          <a href ={this.state.urltwo}>{this.state.urltwo}</a>
          </div>

           <div onClick={this.handleStorythree}
                className="nyt-times-headline-three">
          <h2 className="nyt-times-headline-three-text">{this.props.nytdata.results[2].title}</h2>
            <h4 onClick={this.hideStorythree}>{this.state.storythree}</h4>
            <a href ={this.state.urlthree}>{this.state.urlthree}</a>
          </div>

           <div onClick={this.handleStoryfour}
                className="nyt-times-headline-four">
          <h2 className="nyt-times-headline-four-text">{this.props.nytdata.results[3].title}</h2>
            <h4 className="info">{this.state.storyfour}</h4>
            <a href ={this.state.urlfour}>{this.state.urlfour}</a>
          </div>

           <div onClick={this.handleStoryfive}
                className="nyt-times-headline-five">
          <h2 className="nyt-times-headline-five-text">{this.props.nytdata.results[4].title}</h2>
            <h4 className="info">{this.state.storyfive}</h4>
            <a href ={this.state.urlfive}>{this.state.urlfive}</a>
  
        </div>
      </div>  
      )
  }
  }

})

var Imgur = React.createClass({
  render:function(){
    console.log(this.props.imgurdata);
      if(this.props.imgurdata === null){
        return(
          null
        );
      }

      var images = this.props.imgurdata.map(function(x){
        if(x.is_album == false){
        // console.log(x.link);
        return(

          <div>
            <img className="imgur-pictures" src={x.link}/>
          </div>
          )
      }
    })
      return(
        <div>
        <div>
              <h1 className="imgur-title">Top Memes for Today</h1>
        </div>
        <div className="imgur-pictures-div">
        {images}
        </div>
        </div>
        )
    
    }
  })

ReactDOM.render(<div><LogInPage/></div>
, document.getElementById('main-container'));
