import React, {Component} from 'react';
import { connect } from 'react-redux';
import Board from '../Board';
import IntroView from '../IntroView';
import { startAuthorization } from '../../actions';

class MainView extends Component {

  // constructor() {
  //   super();
  //   this.authFunction = this.authFunction.bind(this);
  // }

  // authFunction(e) {
  //   e.preventDefault();
  //   this.props.startAuthorization();
  // }

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
  startAuthorization
};

export default connect(mapStateToProps, mapDispatchToProps)(MainView);