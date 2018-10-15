import React from 'react';
import LazyLoadingImage from './LazyLoadingImage';
import PopupItem from './PopupItem';
import Scroll from './Scroll';
import style from '../css/app.css';

export default class Popup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isViewPopup: false
    };
    this.togglePopup = this.togglePopup.bind(this);
  }

  togglePopup() {
    let { isViewPopup } = this.state;
    this.setState({
      isViewPopup: !isViewPopup
    });
  }

  render() {
    return (
      <div>
        <button onClick={this.togglePopup}>Seach Agent</button>
        {this.state.isViewPopup && (
          <Scroll className={style.popup}>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13].map(id => {
              return <PopupItem agent={this.props.agent} key={id} />;
            })}
            <Scroll className={style.popup1}>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13].map(id => {
                return <PopupItem agent={this.props.agent} key={id} />;
              })}
            </Scroll>
          </Scroll>
        )}
      </div>
    );
  }
}

Popup.defaultProps = {
  agent: {
    name: 'Raina',
    pic:
      'https://thesportsrush.com/wp-content/uploads/2018/02/sureshraina-1517120265-770x514.jpg'
  }
};
