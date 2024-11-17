import React, {useState} from 'react';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    Button,
    useColorScheme,
    View,
  } from 'react-native';

  const dateRegex = new RegExp('^\\d\\d\\d\\d-\\d\\d-\\d\\d');

  function jsonDateReviver(key, value) {
    if (dateRegex.test(value)) return new Date(value);
    return value;
  }

  async function graphQLFetch(query, variables = {}) {
    try {
        /****** Q4: Start Coding here. State the correct IP/port******/
        const response = await fetch('http://10.0.2.2:3000/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({ query, variables })
        /****** Q4: Code Ends here******/
      });
      const body = await response.text();
      const result = JSON.parse(body, jsonDateReviver);
  
      if (result.errors) {
        const error = result.errors[0];
        if (error.extensions.code == 'BAD_USER_INPUT') {
          const details = error.extensions.exception.errors.join('\n ');
          alert(`${error.message}:\n ${details}`);
        } else {
          alert(`${error.extensions.code}: ${error.message}`);
        }
      }
      return result.data;
    } catch (e) {
      alert(`Error in sending data to server: ${e.message}`);
    }
  }

class IssueFilter extends React.Component {
    render() {
      return (
        <>
        {/****** Q1: Start Coding here. ******/}
        <View>
        <Text>This is a placeholder for the Issue Filter.</Text>
        </View>        
        {/****** Q1: Code ends here ******/}
        </>
      );
    }
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
  header: { height: 50, backgroundColor: '#537791' },
  text: { textAlign: 'center' ,    color: '#000',
  },
  dataWrapper: { marginTop: -1 },
  row: { height: 40, backgroundColor: '#E7E6E1' }
  });

const width= [40,80,80,80,80,80,200];

function IssueRow(props) {
  const issue = props.issue;
  const row = [
    issue.id.toString(),
    issue.title,
    issue.status,
    issue.owner,
    issue.created.toDateString(),
    issue.effort ? issue.effort.toString() : '',
    issue.due ? issue.due.toDateString() : '',
  ];

  return (
    <Row data={row} style={styles.row} textStyle={styles.text} />
  );
}

function IssueTable(props) {
  const tableHead = ['ID', 'Title', 'Status', 'Owner', 'Created', 'Effort', 'Due'];
  const issueRows = props.issues.map((issue) => <IssueRow key={issue.id} issue={issue} />);

  return (
    <View style={styles.container}>
      <Table borderStyle={{ borderWidth: 1 }}>
        <Row data={tableHead} style={styles.header} textStyle={styles.text} />
        {issueRows}
      </Table>
    </View>
  );
}
  
  
  function IssueTable(props) {
    const issueRows = props.issues.map(issue =>
      <IssueRow key={issue.id} issue={issue} />
    );

    {/****** Q2: Start Coding here. Add Logic to initalize table header  ******/}
    const tableHead = ['ID', 'Title', 'Status', 'Owner', 'Created', 'Effort', 'Due'];
    {/****** Q2: Coding Ends here. ******/}
    
    
    return (
    <View style={styles.container}>
    {/****** Q2: Start Coding here to render the table header/rows.**********/}
    <Table borderStyle={{borderWidth: 1}}>
      <Row data={tableHead} style={styles.header} textStyle={styles.text}/>
      <ScrollView>
        {issueRows}
      </ScrollView>
    </Table>
    {/****** Q2: Coding Ends here. ******/}
    </View>
    );
  }

  
  class IssueAdd extends React.Component {
    constructor() {
      super();
      this.handleSubmit = this.handleSubmit.bind(this);
      /****** Q3: Start Coding here. Create State to hold inputs******/
      this.state = {
        owner: '',
        title: '',
        effort: '',
      };
    }
      /****** Q3: Code Ends here. ******/
  
    /****** Q3: Start Coding here. Add functions to hold/set state input based on changes in TextInput******/
    handleChange(field, value) {
      this.setState({ [field]: value });
    }
    /****** Q3: Code Ends here. ******/
    
    handleSubmit() {
      /****** Q3: Start Coding here. Create an issue from state variables and call createIssue. Also, clear input field in front-end******/
      const { owner, title ,effort} = this.state;
      const issue = {
        owner,
        title,
        effort: effort ? parseInt(effort, 10) : undefined,
        status: 'New',
      };
      this.props.createIssue(issue);
      this.setState({ owner: '', title: '' });
      /****** Q3: Code Ends here. ******/
    }
  
  render() {
    return (
      <View>
        {/****** Q3: Start Coding here. Create TextInput field, populate state variables. Create a submit button, and on submit, trigger handleSubmit.*******/}
        <TextInput
          placeholder="Owner"
          value={this.state.owner}
          onChangeText={(value) => this.handleChange('owner', value)}
        />
        <TextInput
          placeholder="Title"
          value={this.state.title}
          onChangeText={(value) => this.handleChange('title', value)}
        />
        <Button
          title="Add Issue"
          onPress={this.handleSubmit}
        />
        {/****** Q3: Code Ends here. ******/}
      </View>
    );
  }
}

class BlackList extends React.Component {
    constructor()
    {   super();
        this.handleSubmit = this.handleSubmit.bind(this);
        /****** Q4: Start Coding here. Create State to hold inputs******/
        /****** Q4: Code Ends here. ******/
    }
    /****** Q4: Start Coding here. Add functions to hold/set state input based on changes in TextInput******/
    /****** Q4: Code Ends here. ******/

    async handleSubmit() {
    /****** Q4: Start Coding here. Create an issue from state variables and issue a query. Also, clear input field in front-end******/
    /****** Q4: Code Ends here. ******/
    }

    render() {
    return (
        <View>
        {/****** Q4: Start Coding here. Create TextInput field, populate state variables. Create a submit button, and on submit, trigger handleSubmit.*******/}
        {/****** Q4: Code Ends here. ******/}
        </View>
    );
    }
}

export default class IssueList extends React.Component {
    constructor() {
        super();
        this.state = { issues: [] };
        this.createIssue = this.createIssue.bind(this);
    }
    
    componentDidMount() {
    this.loadData();
    }

    async loadData() {
      const query = `query {
        issueList {
          id title status owner
          created effort due
        }
      }`;
    
      const data = await graphQLFetch(query);
      if (data) {
        console.log('Data fetched:', data.issueList); // 调试信息
        this.setState({ issues: data.issueList });
      } else {
        console.log('No data fetched');
      }
    }

    async createIssue(issue) {
    const query = `mutation issueAdd($issue: IssueInputs!) {
        issueAdd(issue: $issue) {
        id
        }
    }`;

    const data = await graphQLFetch(query, { issue });
    if (data) {
        this.loadData();
    }
    }
    
    
    render() {
    return (
    <>
    {/****** Q1: Start Coding here. ******/}
    <IssueFilter />
    {/****** Q1: Code ends here ******/}


    {/****** Q2: Start Coding here. ******/}
    <IssueTable issues={this.state.issues} />
    {/****** Q2: Code ends here ******/}

    
    {/****** Q3: Start Coding here. ******/}
    <IssueAdd createIssue={this.createIssue} />
    {/****** Q3: Code Ends here. ******/}

    {/****** Q4: Start Coding here. ******/}
    {/****** Q4: Code Ends here. ******/}
    </>
      
    );
  }
}
