import React, { useState,useEffect } from "react";

// react-bootstrap components
import {
  Badge,
  Button,
  Card,
  Form,
  Navbar,
  Nav,
  Container,
  Row,
  Col,
} from "react-bootstrap";

import getProfile from "hooks/getProfile";
import updateProfileHook from "hooks/updateProfile";
import ModalPOP from "./popup";

const User = () => {
  const [update, setUpdate] = useState(false);
  const [profile,setprofile] = getProfile();
  const [profile_edit, setprofile_edit] = useState();
  const {check} = updateProfileHook(update,profile_edit);
  

  useEffect(() =>
  {
    setprofile_edit(profile);

  },[profile])




 const updateProfile = (e) =>
  {
    e.preventDefault();
    setUpdate(!update);
    setprofile(profile_edit)
    
  }

  return (
    <>
      <Container fluid>
        <Row>
          <Col md="8">
            <Card>
              <Card.Header>
                <Card.Title as="h4">Edit Profile</Card.Title>
              </Card.Header>
              <Card.Body>
                <Form>
                  <Row>
                  <Col className="pr-1" md="5">
                      <Form.Group>
                        <label>Company</label>
                        <Form.Control
                          defaultValue={profile_edit&&profile_edit.company}
                          placeholder="Company"
                          type="text"
                          onChange = {(e) => {setprofile_edit({...profile_edit, company: e.target.value})}}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                
                    <Col className="pl-1" md="6">
                      <Form.Group>
                        <label htmlFor="exampleInputEmail1">
                          Email address
                        </label>
                        <Form.Control
                          defaultValue={profile_edit&&profile_edit.email}
                          placeholder="Email"
                          type="email"
                          onChange = {(e) => {setprofile_edit({...profile_edit, email: e.target.value})}}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="6">
                      <Form.Group>
                        <label>First Name</label>
                        <Form.Control
                          defaultValue={profile_edit&&profile_edit.firstname}
                          onChange = {(e) => {setprofile_edit({...profile_edit, firstname: e.target.value})}}
                          placeholder="First Name"
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="pl-1" md="6">
                      <Form.Group>
                        <label>Last Name</label>
                        <Form.Control
                          defaultValue={profile_edit&&profile_edit.lastname}
                          onChange = {(e) => {setprofile_edit({...profile_edit, lastname: e.target.value})}}
                          placeholder="Last Name"
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <Form.Group>
                        <label>Address</label>
                        <Form.Control
                          defaultValue={profile_edit&&profile_edit.address}
                          onChange = {(e) => {setprofile_edit({...profile_edit, address: e.target.value})}}
                          placeholder="Address"
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="4">
                      <Form.Group>
                        <label>City</label>
                        <Form.Control
                          defaultValue={profile_edit&&profile_edit.city}
                          onChange = {(e) => {setprofile_edit({...profile_edit, city: e.target.value})}}
                          placeholder="City"
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="px-1" md="4">
                      <Form.Group>
                        <label>Country</label>
                        <Form.Control
                          defaultValue={profile_edit&&profile_edit.country}
                          onChange = {(e) => {setprofile_edit({...profile_edit, country: e.target.value})}}
                          placeholder="Country"
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="pl-1" md="4">
                      <Form.Group>
                        <label>Postal Code</label>
                        <Form.Control
                        defaultValue={profile_edit&&profile_edit.zip}
                        onChange = {(e) => {setprofile_edit({...profile_edit, zip: e.target.value})}}
                          placeholder="ZIP Code"
                          type="number"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <Form.Group>
                        <label>About Me</label>
                        <Form.Control
                          cols="80"
                          defaultValue={profile_edit&&profile_edit.aboutMe}
                          onChange = {(e) => {setprofile_edit({...profile_edit, aboutMe: e.target.value})}}
                          placeholder="Here can be your description"
                          rows="4"
                          as="textarea"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <ModalPOP updateProfile = {updateProfile}></ModalPOP>
                  <div className="clearfix"></div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
          <Col md="4">
            <Card className="card-user">
              <div className="card-image">
                <img
                  alt="..."
                  src={
                    require("assets/img/photo-1431578500526-4d9613015464.jpeg")
                      .default
                  }
                ></img>
              </div>
              <Card.Body>
                <div className="author">
                    <img
                      alt="..."
                      className="avatar border-gray"
                      src={require("assets/img/faces/face-3.jpg").default}
                    ></img>
                    <h5 className="title" style ={{color:"red"}}><span>{profile&&profile.firstname} {profile&&profile.lastname}</span></h5>
                  
                  <p className="description" style ={{color:"blue"}} >{profile&&profile.company}</p>
                </div>
                <p className="description text-center">
                  {profile&&profile.aboutMe}
                </p>
              </Card.Body>
              <hr></hr>
              
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default User;
