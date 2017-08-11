import React from 'react';
import autobind from 'autobind-decorator'
import { StyleSheet, Text, View, Image, TextInput, Button, Alert, FlatList, Fetch, TouchableOpacity, Picker } from 'react-native';
import { StackNavigator } from 'react-navigation';

class HomeScreen extends React.Component {

  static navigationOptions = {
    title: 'TF2Logs',

  };

  constructor(props) {
    super(props);
    this.state = {
      player: '',
      matches: [{id: '123', title: 'poopybutthole'}],
    };
  }

  @autobind
  _onPressButton() {
   // if(this.state.player){
      this.fetchStats(this.state.player)
    //}
  }

  /** Fetches the list of matches from logs.tf and stores it in the matches state
  */
  fetchStats(player) {
    fetch('https://logs.tf/json_search?player='  + (player? player.toString():'76561198043059628'))
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          //add logs to the list
          matches: responseJson.logs
        }, function() {
          //something to do w new states
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  @autobind
  navToMatchScreen(matchInfo){
    console.log(matchInfo)
    const { navigate } = this.props.navigation;
    navigate('Match', matchInfo)
  }
  
  render() {
  
  
    return (
      <View style={{flex: 1, backgroundColor: 'powderblue'}}>
        
        <View style={{marginTop: 60,margin: 40, padding: 10, flex: 1}}>
            <TextInput
              style={{height: 40, color: 'black'}}
              textAlign="center"
              placeholder="Enter Steam ID Number"
              placeholderTextColor="black"
              onChangeText={(text) => this.setState({'player':text})}
            />
            
            <Button 
            onPress={this._onPressButton}
            title="SEARCH"
            />
        </View>


        <View style={{flex: 8}}>
         <MatchList
            data= {this.state.matches}
            onPressItem= {this.navToMatchScreen}
          />
        </View>
       </View>
  )
  }
};

class MatchScreen extends React.Component {

  static navigationOptions = {
    title: 'Match',

  };
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      score: {red: '0', blue: '0'},
      kills: {red: '0', blue: '0'},
      dmg: {red: '0', blue: '0'},
    };
    this.fetchStats = this.fetchStats.bind(this);
  }

  componentDidMount(){
    this.fetchStats();
    const { params } = this.props.navigation.state;
    this.setState({
    	id: params.id,
    });
  }

  
  fetchStats() {
  	const { params } = this.props.navigation.state;
  	//self=this;
    fetch('https://logs.tf/json/'  + (params.id? params.id.toString():'1486609'))
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          //add logs to the list
          score: {
              red: responseJson.teams.Red.score,
              blue: responseJson.teams.Blue.score,
            },
          kills: {
          		red: responseJson.teams.Red.kills,
          		blue: responseJson.teams.Blue.kills,
          	},
          dmg: {
          		red: responseJson.teams.Red.dmg,
          		blue: responseJson.teams.Blue.dmg,
          	}
          
        }, function() {
          //something to do w new states
        });
        //console.log(responseJson);
      })
      .catch((error) => {
        console.error(error);
      });
  }


  render(){

    //const { navigate } = this.props.navigation;

    return(
	    <View>
	      <View style={{backgroundColor: 'white', flexDirection: 'row'}}>
	      	<View style={{flex: 2, backgroundColor: 'red'}}>
	        	<Text style={{textAlign: 'center', fontSize: 60}}>{this.state.score.red}</Text>
	        </View>
	        <View style={{flex: 2, backgroundColor: 'blue'}}>
	        	<Text style={{textAlign: 'center', fontSize: 60}}>{this.state.score.blue}</Text>
	        </View>
	      </View>

	      <View style={{backgroundColor: 'white', flex: 1}}>

	      </View>

	      <View style={{flexDirection: 'row'}}>
		      <View style={{flex: 2, backgroundColor: 'red'}}>
		        	<Text style={{textAlign: 'left', fontSize: 20}}>Kills: {this.state.kills.red}</Text>
		        	<Text style={{textAlign: 'left', fontSize: 20}}>Damage: {this.state.dmg.red}</Text>
		        	<Image source={{uri: 'https://wiki.teamfortress.com/w/images/a/ad/Leaderboard_class_scout.png'}}
       					style={{width: 30, height: 30}} />
		        	<Image source={{uri: 'https://wiki.teamfortress.com/w/images/a/ad/Leaderboard_class_scout.png'}}
       					style={{width: 30, height: 30}} />
       				<Image source={{uri: 'https://wiki.teamfortress.com/w/images/9/96/Leaderboard_class_soldier.png'}}
       					style={{width: 30, height: 30}} />
		        	<Image source={{uri: 'https://wiki.teamfortress.com/w/images/9/96/Leaderboard_class_soldier.png'}}
       					style={{width: 30, height: 30}} />
       				<Image source={{uri: 'https://wiki.teamfortress.com/w/images/4/47/Leaderboard_class_demoman.png'}}
       					style={{width: 30, height: 30}} />
		        	<Image source={{uri: 'https://wiki.teamfortress.com/w/images/e/e5/Leaderboard_class_medic.png'}}
       					style={{width: 30, height: 30}} />
		      </View>
		      <View style={{flex: 2, backgroundColor: 'blue'}}>
		        	<Text style={{textAlign: 'right', fontSize: 20}}>Kills: {this.state.kills.blue}</Text>
		        	<Text style={{textAlign: 'right', fontSize: 20}}>Damage: {this.state.dmg.blue}</Text>
		        	<Image source={{uri: 'https://wiki.teamfortress.com/w/images/a/ad/Leaderboard_class_scout.png'}}
       					style={{alignSelf: 'flex-end', width: 30, height: 30}} />
       				<Image source={{uri: 'https://wiki.teamfortress.com/w/images/a/ad/Leaderboard_class_scout.png'}}
       					style={{alignSelf: 'flex-end', width: 30, height: 30}} />
       				<Image source={{uri: 'https://wiki.teamfortress.com/w/images/9/96/Leaderboard_class_soldier.png'}}
       					style={{alignSelf: 'flex-end', width: 30, height: 30}} />
       				<Image source={{uri: 'https://wiki.teamfortress.com/w/images/9/96/Leaderboard_class_soldier.png'}}
       					style={{alignSelf: 'flex-end', width: 30, height: 30}} />
       				<Image source={{uri: 'https://wiki.teamfortress.com/w/images/4/47/Leaderboard_class_demoman.png'}}
       					style={{alignSelf: 'flex-end', width: 30, height: 30}} />
       				<Image source={{uri: 'https://wiki.teamfortress.com/w/images/e/e5/Leaderboard_class_medic.png'}}
       					style={{alignSelf: 'flex-end', width: 30, height: 30}} />
		      </View>
	      </View>
	     </View>
    )

  }

}

class MatchListItem extends React.PureComponent {

  

  _onPress = () => {
    //navigate('Match');
    this.props.onPressItem({id:this.props.id});
    console.log('match selected');
  };
  

  render() {
    //const { navigate } = this.props.navigation;
    return (
      <TouchableOpacity onPress={this._onPress}>
        <View style={styles.logItem}>
          <Text style={styles.logItemText}>
          {this.props.id}
          </Text>
          <Text style={styles.logItemText}>
          {this.props.title}
          </Text>
        </View>
      </TouchableOpacity>
    )
  }
}

class MatchList extends React.PureComponent {
  state = {selected: (new Map(): Map<string, boolean>)};

  _keyExtractor = (item, index) => item.id;

  _onPressItem = (matchItem) => {
    
    this.props.onPressItem(matchItem);
    console.log('match list recieved touch');
  };

  _renderItem = ({item}) => (
    <MatchListItem
      id={item.id}
      onPressItem={this._onPressItem}
      selected={!!this.state.selected.get(item.id)}
      title={item.title}
    />
  );

  render() {
    return (
      <FlatList
        data={this.props.data}
        extraData={this.state}
        keyExtractor={this._keyExtractor}
        renderItem={this._renderItem}
      />
    );
  }
}


const styles = StyleSheet.create({

  logItem: {
    justifyContent: 'center',
    margin: 10,
    borderRadius: 5,
    borderColor: 'black',
    borderWidth: 1,
    backgroundColor: 'white',
  },

  logItemText: {
    textAlign: 'center',
  }

});

const App = StackNavigator({

    Home: { screen: HomeScreen },
    Match: { screen: MatchScreen },

});

export default App;