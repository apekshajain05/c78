import React, { Component } from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity,TextInput, Alert, Modal,KeyboardAvoidingView,ScrollView } from 'react-native';
//import SantaAnimation from '../components/SantaClaus.js';
import db from '../config';
import firebase from 'firebase';

export default class WelcomeScreen extends Component {
  constructor(){
    super()
    this.state={
      emailId : '',
      password: '',
      firstName:"",
      lastName:'',
      address:'',
      mobile:'',
      username:'',
      confirmPassword:'',
      isModalVisible:"false",
    }
  }
  showModal=()=>{
    return(
      <Modal
        animationType='fade'
        transparent={true}
        visible={this.state.isModalVisible}>
          <View style={styles.container}>
              <ScrollView style={{width:"100%"}}>
                <KeyboardAvoidingView style={styles.keyboard}>

                  <Text style={styles.title}>Registration</Text>
                  <TextInput style={styles.loginBox}
                  placeholder="First Name"
                  maxLength={10}
                  onChangeText={(text)=>{
                      this.setState({
                        firstName:text
                      })
                  }} >
                  

                  </TextInput>
                  <TextInput style={styles.loginBox}
                  placeholder="Last Name"
                  maxLength={10}
                  onChangeText={(text)=>{
                      this.setState({
                        lastName:text
                      })
                  }} >
              
                  </TextInput>
                  <TextInput style={styles.loginBox}
                  placeholder="Mobile No"
                  maxLength={10}
                  keyboardType={"numeric"}
                  onChangeText={(text)=>{
                      this.setState({
                        mobile:text
                      })
                  }} >
                  
                  </TextInput>
                  <TextInput style={styles.loginBox}
                  placeholder="Address"
                  multiLine={true}
                  onChangeText={(text)=>{
                      this.setState({
                        address:text
                      })
                  }} >
                  
                  </TextInput>
                  <TextInput style={styles.loginBox}
                  placeholder="Email Id"
                 keyboardType={"email-address"}
                onChangeText={(text)=>{
                      this.setState({
                        emailId:text
                      })
                  }} >
                    </TextInput>
                   <TextInput style={styles.loginBox}
                  placeholder="Password"
                  secureTextEntry={true}
                  onChangeText={(text)=>{
                      this.setState({
                        password:text
                      })
                  }} >
                  
               
                  </TextInput>
                  <TextInput style={styles.loginBox}
                  placeholder="Confirm Password"
                  secureTextEntry={true}
                  onChangeText={(text)=>{
                      this.setState({
                        confirmPassword:text
                      })
                  }} >
                  
               
                  </TextInput>

                  <View>
                    <TouchableOpacity style={styles.button} 
                    onPress={()=>{
                      this.userSignUp(this.state.emailId,this.state.password,this.state.confirmPassword)
                      }}>
                      <Text>Register</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} 
                    onPress={()=>{
                     this.setState({
                       "isModalVisible":false
                     })
                      }}>
                      <Text>Cancel</Text>
                    </TouchableOpacity>
                  </View>
                  
                </KeyboardAvoidingView>
              </ScrollView>
          </View>
      </Modal>
    )
  }
  userLogin = (emailId, password)=>{
    firebase.auth().signInWithEmailAndPassword(emailId, password)
    .then(()=>{
      return Alert.alert("Successfully Login")
    })
    .catch((error)=> {
      var errorCode = error.code;
      var errorMessage = error.message;
      return Alert.alert(errorMessage)
    })
  }

  userSignUp = (emailId, password,confirmPassword) =>{
    if(password!==confirmPassword){
      return(
        alert("Check Password")
      )
    }
    else{
    
    firebase.auth().createUserWithEmailAndPassword(emailId, password)
    .then((response)=>{
      return alert("User Added Successfully")
    })
    .catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      return alert(errorMessage)
    });
    db.collection("user").add({
      First_Name:this.state.firstName,
      Last_Name:this.state.lastName,
      Mobile_No:this.state.mobile,
      EmailId:this.state.emailId,
      Address:this.state.address,
    })
  }}


  render(){
    return(
      <View style={styles.container}>
        <View style={{justifyContent:"center",alignItems:'center'}}>
            {this.showModal}
        </View>
        <View style={styles.profileContainer}>
         
          <Text style={styles.title}>Book Santa</Text>
        </View>
        <View style={styles.buttonContainer}>
          <TextInput
          style={styles.loginBox}
          placeholder="example@booksanta.com"
          placeholderTextColor = "#ffff"
          keyboardType ='email-address'
          onChangeText={(text)=>{
            this.setState({
              emailId: text
            })
          }}
        />

        <TextInput
          style={styles.loginBox}
          secureTextEntry = {true}
          placeholder="password"
          placeholderTextColor = "#ffff"
          onChangeText={(text)=>{
            this.setState({
              password: text
            })
          }}
        />
          <TouchableOpacity
            style={[styles.button,{marginBottom:20, marginTop:20}]}
            onPress = {()=>{this.userLogin(this.state.emailId, this.state.password)}}
            >
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={()=>{this.userSignUp(this.state.emailId, this.state.password)}}
            >
            <Text style={styles.buttonText}>SignUp</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}


const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#F8BE85'
  },
  profileContainer:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
  },
  title :{
    fontSize:65,
    fontWeight:'300',
    paddingBottom:30,
    color : '#ff3d00'
  },
  loginBox:{
    width: 300,
    height: 40,
    borderBottomWidth: 1.5,
    borderColor : '#ff8a65',
    fontSize: 20,
    margin:10,
    paddingLeft:10
  },
  button:{
    width:300,
    height:50,
    justifyContent:'center',
    alignItems:'center',
    borderRadius:25,
    backgroundColor:"#ff9800",
    shadowColor: "#000",
    shadowOffset: {
       width: 0,
       height: 8,
    },
    shadowOpacity: 0.30,
    shadowRadius: 10.32,
    elevation: 16,
  },
  buttonText:{
    color:'#ffff',
    fontWeight:'200',
    fontSize:20
  },
  buttonContainer:{
    flex:1,
    alignItems:'center'
  }
})
