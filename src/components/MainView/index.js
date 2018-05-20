import React, {Component} from 'react';
import { connect } from 'react-redux';
import Board from '../Board';
import IntroView from '../IntroView';

class MainView extends Component {

  renderMainView() {
    
    const { authorization } = this.props;

    if(authorization.user.loggedIn) {
      return <Board />
    } else {
      return <IntroView />
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

export default connect(mapStateToProps)(MainView);