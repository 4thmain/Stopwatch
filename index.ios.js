var React = require('react-native');
var FormatTime = require('minutes-seconds-milliseconds');
var{
 Text,
 View,
 AppRegistry,
 StyleSheet,
 TouchableHighlight,
} = React;

 var StopWatch = React.createClass({

  getsInitialState: function() {
    return {
      timeElapsed: null,
      running: false,
      startTime: null,
      laps:[]
    }
  },

   render: function() {
    return <View style={styles.container}>
        <View style={[styles.header,this.border('red')]}>
          <View style={[this.border('yellow'),styles.timerWrapper]}>
            <Text style={styles.timer}>{FormatTime(this.state.timeElapsed)}</Text>
          </View>
          <View style={[this.border('blue'),styles.buttonWrapper]}>
            {this.startStopButton()}
            {this.lapButton()}
          </View>
        </View>

      <View style={[styles.footer,this.border('green')]}>
          {this.laps()}
      </View>
    </View>
  },
  laps: function(){
    return this.state.laps.map(function(time, index){
      return <View style={styles.lap}>
        <Text style={styles.lapText}>Lap #{index + 1}</Text>
        <Text style={styles.lapText}>{FormatTime(time)}</Text>
        </View>
    });
  },

  startStopButton: function() {

    var style = this.state.running ? styles.stopButton : styles.startButton;

    return <TouchableHighlight
    underlayColor="#00CC00"
    onPress = {this.handleStartPress}
    style = {[styles.button,style]}
    >
      <Text>
      {this.state.running ? 'Stop':'Start'}
      </Text>
    </TouchableHighlight>
  },

  lapButton: function() {

    var style = this.state.running ? styles.LapButton : styles.resetButton;

    return <TouchableHighlight
    underlayColor="grey"
    onPress = {this.HandleLapPress}
    style={[styles.button,style]}
    >
      <Text>
      {this.state.running ? 'Lap':'Reset'}
      </Text>
    </TouchableHighlight>
  },

  HandleLapPress: function() {
    var lap = this.state.timeElapsed;
      if (this.state.running == true) {
        this.setState({
        startTime: new Date(),
        laps: this.state.laps.concat([lap])
      });
    } else {
      this.setState({
      timeElapsed: null,
      running: false,
      startTime: null,
      laps:[]
      });
    }
  },

  handleStartPress: function() {
    if (this.state.running == true)
    {
      clearInterval(this.interval);
      this.setState({running: false});
      return
    }

    //var startTime = new Date();
    this.setState({startTime: new Date()});

    this.interval = setInterval(() => {
        this.setState({
        timeElapsed: new Date() - this.state.startTime,
        running: true,
      });
    },30);

  },
  border :function(color){
    return {
      borderColor: color,
      borderWidth: 2,
    }
  }

 });

 var styles = StyleSheet.create({
   container: {
     flex: 1,
     alignItems: 'stretch',
   },
   header: {
     flex: 1,
   },
   footer: {
     flex: 1,
   },
   timerWrapper: {
    flex: 5, // takes up 5/8 of the space
    justifyContent: 'center',
    alignItems: 'center',
   },
   buttonWrapper: {
    flex: 3, // takes up 3/8 of the space. This is a very interesting concept.
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
   },
   timer: {
    fontSize: 80,
    fontWeight: '100',
   },
   button: {
    borderWidth: 1,
    borderColor: 'grey',
    height: 100,
    width: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
   },
   startButton: {
    borderColor: '#00CC00',
   },
   stopButton: {
    borderColor: '#cc0000',
   },
   resetButton: {
    borderColor: '#cccccc',
   },
   lap: {
    justifyContent: 'space-around',
    flexDirection: 'row',
   },
   lapText: {
    fontSize: 24,
    lineHeight: 40,
    fontWeight: '200'
   },
 });

 AppRegistry.registerComponent('stopwatch', () => StopWatch);
