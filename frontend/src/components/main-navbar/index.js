import React from 'react';
import {Container, Row, Col} from "reactstrap"
import {NavLink} from "react-router-dom"
import * as Routes from "../../router";
import {BiLogIn, BiUser, BiLogOut} from "react-icons/bi";
import { useContextHook } from '../../hook/useContext';
import { useLogout } from '../../hook/useLogout';
import './navbar.scss'

export default function MainNavbar() {
  const {user} = useContextHook()
  const {logOut} = useLogout()
  return (
    <>
      <Container fluid>
        <div className="contain">
          <Row>
            <Col xl="6" lg="6" md="6">
              <div className="title-logo">
                <span><NavLink to={Routes.HOME}>Goal Letter</NavLink></span>
              </div>
            </Col>
            <Col xl="6" lg="6" md="6">
              <nav>
                <ul>
                  {!user && (
                    <>
                      <li><NavLink to={Routes.LOGIN}><BiLogIn /> Login</NavLink></li>
                      <li><NavLink to={Routes.REGISTER}><BiUser /> Register</NavLink></li>
                    </>
                  )}
                  {user && <div className='btn-log-out' onClick={() => {logOut()}}><BiLogOut /> Logout</div>}
                </ul>
              </nav>
            </Col>
          </Row>
          <div className="underline"></div>
        </div>
      </Container>
    </>
  );
}
