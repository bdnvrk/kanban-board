import React, {Component} from 'react';
import { connect } from 'react-redux';
import Board from '../Board';
import IntroView from '../IntroView';
import { startAuthorization, authorizeUser } from '../../actions';
import * as firebase from 'firebase';

class MainView extends Component {

  checkIfLoggedIn() {
    firebase.auth().onAuthStateChanged((user) => {
      console.log(user);
      if(user) {
        console.log('test')
        this.props.authorizeUser(user);
      }
    })
  }

  componentWillMount() {
    this.checkIfLoggedIn();
  }

  renderMainView() {    
    const { authorization } = this.props;


    if(authorization.user.loggedIn) {
      return <Board />
    } else {
      return <IntroView authFunction={this.props.startAuthorization}/>
    }
  }

  render() {
    return ( 
      <React.Fragment>
        {this.renderMainView()}
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state) => ({
  authorization: state.authorization
});

const mapDispatchToProps = {
  startAuthorization,
  authorizeUser
};

export default connect(mapStateToProps, mapDispatchToProps)(MainView);