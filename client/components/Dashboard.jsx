import React from 'react';
import SidePanel from './SidePanel.jsx';
import BigCalBasic from './BigCalBasic.jsx';
import AddEvent from './AddEvent.jsx';
import * as UserModel from '../models/user.js';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedGroup: [],
      contact: {},
      selectedContacts: [],
      // selectedContactsFromGroups: [],
      allGroups: [
      { owner_id: 1, group_name: 'test', isContactList: false, contacts: [{firstName: 'Hi', lastName: 'There', googleId: '2sfiewasdfors', emailAddress: 'hithere@gmail.com', isSignedUp: true}] },
      { owner_id: 1, group_name: 'test2', isContactList: false, contacts: [{firstName: 'Hii', lastName: 'Theree', googleId: '59sfiewodfsrs', emailAddress: 'hithere2@gmail.com', isSignedUp: true}] },
      { owner_id: 1, group_name: 'test3', isContactList: false, contacts: [{firstName: 'Hiii', lastName: 'Thereeee', googleId: '59sfiewodfsrsdsf', emailAddress: 'hithere3@gmail.com', isSignedUp: true}] }
      ],
      allContacts: [
      { owner_id: 1, group_name: 'test1111', isContactList: true, contacts: [
        {firstName: 'Hi', lastName: 'There', googleId: '2sfiewasdfors', emailAddress: 'hithere@gmail.com', isSignedUp: true},
        {firstName: 'Hii', lastName: 'Thereeee', googleId: '59sfiewodfsrs', emailAddress: 'hithere3@gmail.com', isSignedUp: true},
        {firstName: 'Hiii', lastName: 'Thereeee', googleId: '59sfiewodfsrsdsf', emailAddress: 'hithere3@gmail.com', isSignedUp: true}
      ] }
      ]
    }
    this.handleSelectedGroup = this.handleSelectedGroup.bind(this);
    this.handleSelectedContacts = this.handleSelectedContacts.bind(this);
    this.handleAddGroup = this.handleAddGroup.bind(this);
    this.handleAddContact = this.handleAddContact.bind(this);
    this.handleUpdateGroup = this.handleUpdateGroup.bind(this);
    this.removeContactFromGroup = this.removeContactFromGroup.bind(this);
    // this.clearSelectedContacts = this.clearSelectedContacts.bind(this);
  }



  componentDidMount() {
    this.resetGroup();
    this.resetContact();
    //make ajax calls to server to retrieve all these data from database
    //make use of props.
    //console.log(this.state.allContacts[0].contacts)
  }

  resetContact() {
    UserModel.getContact(this.props.user.user._id, (contact) => {
      console.log(contact, 'should be a contact list from mongoose');
      this.setState({
        allContacts: contact.contacts,
        contact: contact

      })
    })
  }

  resetGroup() {
    UserModel.getGroup(this.props.user.user._id, (group)=>{
      this.setState({
        allGroups: group
      })
    })
  }

  handleSelectedGroup(group) {
    //console.log(group, 'here')
    //console.log(this.state.selectedGroup, 'WHATS THIS');

    if (!this.checkExist(this.state.selectedGroup, group)) {
      var addGroup = this.state.selectedGroup.slice();
      addGroup.push(group);
      this.setState({
        selectedGroup: addGroup
      })
    } else {
      var removeGroup = this.state.selectedGroup.slice();
      removeGroup.splice(removeGroup.indexOf(group), 1);

      this.setState({
        selectedGroup: removeGroup
      })
    }
      setTimeout(()=> {console.log(this.state.selectedGroup, 'new one IN GROUP');})
  }

  // future implementation
  // clearSelectedContacts() {
  //   this.setState({
  //     selectedContacts: []
  //   })
  // }

  checkExist(contacts, target) {
    let check = false;
    for (let contact of contacts) {
      if (contact._id === target._id) {
        check = true;
      }
    }
    return check;
  }

  handleSelectedContacts(contact, isContactList) {
    console.log(this.state.selectedContacts, 'the array before ');
    // console.log(this.state.selectedContactsFromGroups, 'the array before GORUPOUFOPDSF');

    if (!this.checkExist(this.state.selectedContacts, contact) && isContactList) {
      var addContact = this.state.selectedContacts.slice();
      addContact.push(contact);
      this.setState({
        selectedContacts: addContact
      })
    } else if (this.checkExist(this.state.selectedContacts, contact) && isContactList) {
      var removeContact = this.state.selectedContacts.slice();
      removeContact.splice(removeContact.indexOf(contact), 1);

      this.setState({
        selectedContacts: removeContact
      })
    }
    //this is for selecting single contacts from other groups implementation - not accomplished yet

    // else if (!this.checkExist(this.state.selectedContactsFromGroups, contact) && !isContactList) {
    //   var addContactGroup = this.state.selectedContactsFromGroups.slice();
    //   addContactGroup.push(contact);
    //   this.setState({
    //     selectedContactsFromGroups: addContactGroup
    //   })
    // } else {
    //   var removeContactGroup = this.state.selectedContactsFromGroups.slice();
    //   removeContactGroup.splice(removeContactGroup.indexOf(contact), 1);

    //   this.setState({
    //     selectedContactsFromGroups: removeContactGroup
    //   })
    // }


    setTimeout(()=> {console.log(this.state.selectedContacts, 'new one');})
    // setTimeout(()=> {console.log(this.state.selectedContactsFromGroups, 'new oneGORUPRUPRUPR');})

  }

  handleAddGroup(groupname) {
    UserModel.addGroup(groupname, this.props.user.user, (sucess)=> {
      this.resetGroup();
    })
  }

  handleAddContact(gmail) {
    // console.log('check if add contact proc', gmail);
    let checkdup = false;
    this.state.allContacts.forEach((contact) => {
      if (gmail === contact.emailAddress) {
        checkdup = true;
      }
    })

    let checkgmail = false;
    // console.log('WHATS THIS', gmail.slice(-10).toUpperCase())
    if (gmail.slice(-10).toUpperCase() !== '@GMAIL.COM') {
      checkgmail = true;
    }

    if (!checkdup && !checkgmail) {     
      UserModel.addContact(gmail, (contact) => {
        // console.log(contact, 'this is the stuff from addorfindXXXX', this.state.contact);
          UserModel.addContactToGroup(this.state.contact, contact, ()=>{
            // console.log('reached here, should added to the contact list XXX');
            this.resetContact();
          })
      })
    } else if (checkdup) {
      alert('Error: Contact already exist.')
    } else if (checkgmail) {
      alert('Error: Please enter a google email.')
    }
  }

  handleUpdateGroup(group) {
    this.state.selectedContacts.forEach((contact)=>{
      if (!this.checkExist(group.contacts, contact)) {
        UserModel.addContactToGroup(group, contact, ()=>{
          this.resetGroup();
        })
      } else {
        return;
      }
    })
  }

  removeContactFromGroup(group) {
    this.state.selectedContacts.forEach((contact) => {
      if (this.checkExist(group.contacts, contact)) {
        UserModel.removeContactFromGroup(group, contact, ()=>{
          // console.log('did it remove?==========================');
          this.resetGroup();
        })
      } else {
         return;
      }
    })
  }

  render() {
    return (
      <div className="dashboard">
        <h1 className="title">Concreet</h1>
        <SidePanel contacts={this.state.allContacts} groups={this.state.allGroups} selectContact={this.handleSelectedContacts} selectGroup={this.handleSelectedGroup} addGroup={this.handleAddGroup} addContact={this.handleAddContact} updateGroup={this.handleUpdateGroup} removeContactFromGroup={this.removeContactFromGroup} selectedContacts={this.state.selectedContacts} resetSide={this.resetGroup.bind(this)}/>
        <BigCalBasic user={this.props.user} selectedGroups={this.state.selectedGroup} selectedContacts={this.state.selectedContacts}/>

      </div>

    );
  }
}

export default Dashboard;
