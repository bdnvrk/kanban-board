import React, {Component} from 'react';
import { connect } from 'react-redux';
import Board from '../Board';
import IntroView from '../IntroView';
import { startAuthorization, authorizeUser, toggleLoader } from '../../actions';
import * as firebase from 'firebase';
import Loader from '../Loader';

class MainView extends Component {

  checkIfLoggedIn() {
    const { toggleLoader } = this.props;
    firebase.auth().onAuthStateChanged((user) => {
      if(user) {
        this.props.authorizeUser(user);
      }
      toggleLoader(); 
    });
  }

  componentDidMount() {
    this.checkIfLoggedIn();
  }

  renderMainView() {    
    const { authorization } = this.props;
    
    if (authorization.user.loggedIn) {
      return <Board />
    } else {
      return <IntroView authFunction={this.props.startAuthorization}/>
    }
  }
  
  render() {
    const { loader } = this.props;
    return ( 
      <React.Fragment>
        {loader ? <Loader/> : this.renderMainView()}
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state) => ({
  authorization: state.authorization,
  loader: state.loader
});

const mapDispatchToProps = {
  startAuthorization,
  authorizeUser,
  toggleLoader
};

export default connect(mapStateToProps, mapDispatchToProps)(MainView);