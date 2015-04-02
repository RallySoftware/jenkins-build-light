var React = require('react');
var BuildsStore = require('../stores/BuildsStore.js');
var ViewActionCreators = require('../actions/ViewActionCreators.js');
var { POLL_FREQUENCY } = require('../Constants.js');

var BuildLight = React.createClass({
  interval: undefined,

  getInitialState () {
    return {
      hovered: false
    };
  },
  
  componentDidMount () {
    var loadThisBuild = ViewActionCreators.loadBuild.bind(this, this.props.url);
    loadThisBuild();
    interval = window.setInterval(loadThisBuild, POLL_FREQUENCY);
  },

  componentWillUnmount () {
    window.clearInterval(interval);
  },

  mouseIn () {
    this.setState({
      hovered: true
    });
  },

  mouseOut () {
    this.setState({
      hovered: false
    });
  },

  render() {
    var props = this.props;
    var color = (props.job && props.job.color) || 'grey';
    var url = props.url;
    var cls = 'light ' + color;

    return (
        <div className={ `${this.props.className} ${cls}` } onMouseOver={ this.mouseIn } onMouseOut={ this.mouseOut }>
        <CloseButton show={ this.state.hovered } { ...props } />
        <BuildText { ...props } />
        <BuildNumber { ...props } />
        <BuildDuration { ...props } />
        </div>
    );
  }
});

var CloseButton = React.createClass({
  render() {
    var removeThisLight = ViewActionCreators.removeBuild.bind(ViewActionCreators, this.props.url);
    var cls = `close-btn close-btn--${this.props.show ? 'shown' : 'hidden'}`;
    return <div className={ cls } onClick={ removeThisLight }>x</div>;
  }
});

var BuildText = React.createClass({
  render() {
    var props = this.props;
    return (
        <div className='build-text'>
        <BuildName { ...props } />
        <BuildCulprits { ...props } />
        </div>
    );
  }
});

var BuildName = React.createClass({
  render() {
    var props = this.props;
    var job = props.job;
    var displayName = (job && job.displayName) || props.url || '';
    var url = (job && job.url) || props.url;
    var name = displayName.replace(/#\d*/, '');
    return (
        <a className='build-name' href={ url }>{ name }</a>
    );
  }
});

var BuildCulprits = React.createClass({
  render() {
    var props = this.props;
    var culprits = (props.lastBuild && props.lastBuild.culprits) || [];
    var color = (props.job && props.job.color) || 'grey';
    var list = culprits.reduce((prev, curr, i) => {
      var seperator = i > 0 ? ', ' : '';
      return prev + seperator + curr.fullName;
    }, 'Potential Culprits: ');
    var failed = color === 'red' || color === 'red_anime' ;
    var culpritsStr = failed ? list : '';
    var cls = 'build-culprits' + (!failed ? ' hidden' : '');
    return <div className={ cls }>{ culpritsStr }</div>;
  }
});

var BuildNumber = React.createClass({
  render() {
    var props = this.props;
    var lastBuild = props.lastBuild;
    var number = (lastBuild && lastBuild.number) || '';
    var url = (lastBuild && lastBuild.url);
    var str = number ? `#${number}` : '';
    return <a className='light-stat build-number' href={ url }>{ str }</a>;
  }
});

var BuildDuration = React.createClass({
  format(ms) {
    var x = ms / 1000;
    var seconds = Math.floor(x % 60);
    x /= 60;
    var minutes = Math.floor(x % 60);
    x /= 60;
    var hours = Math.floor(x % 24);
    var str = hours > 0 ? `${hours}h` : '';
    str += minutes > 0 ? ` ${minutes}m` : '';
    str += seconds > 0 ? ` ${seconds}s` : '';
    return str;
  },

  render() {
    var { building, estimatedDuration, duration, timestamp } = this.props.lastBuild || {};
    var timeStr = this.format(duration);

    if(building) {
      var fElapsed = this.format(Date.now() - timestamp);
      var fEstimate = this.format(estimatedDuration);
      timeStr = `${fElapsed} | ${fEstimate}`;
    }

    return <div className='light-stat build-duration'>{ timeStr }</div>;
  }
});

module.exports = BuildLight;
