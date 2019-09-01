import React from 'react'
import { Dropdown, Menu, Icon } from 'semantic-ui-react'
import { NavLink, Link } from "react-router-dom";
import styled from 'styled-components'

const NavBar = () => {

  const HeaderWrapper = styled.section`
    display: flex;
    text-align: center;
    border-bottom: 1px solid #D0C9B4;
    margin: 0 5%;
    justify-content: space-between;

    .iconDiv {
      display: flex;
      margin: 1rem 0rem 2rem 0;

      .cloud {
        font-size: 4rem;
        color: #4A549C;
        position: relative;
        top: 2.5rem;
        left: 1rem;
        z-index: 2;
        text-shadow: 2px 2px 8px #817C74;
    
      }
      .moon {
        color: #979ECD;
        font-size: 3rem;
        position: relative;
        left: -1.6rem;
        top: 1rem;
        transform: rotate(-10deg);
      }
      h1 {
        position: relative;
        top: 1rem;
        left: -3rem;
        z-index: 3;
        color: white;
        font-family: 'Bitter', serif;

      }
    }

    .menuDiv {
      display: flex;
      align-self: center;
      
      .menuBox {
        width: 5rem;
        height: 5rem;
        border-radius: 50%;
        justify-content: center;
        background-color: #ACB2D8;
        
        .menuIcon {
          font-size: 2rem;
          color: #B98479;
          top: 1.65rem;
          left: .125rem;
          .menuLinks {
            background: #efe3e1;
              font-size: 1rem;
              right: -4rem;
              left: auto;
          }
        }
      }
    }

  .menuDiv{
    width: 8rem;
    justify-content: center;
  }
  `;

  const toMarketing = e => {
    e.preventDefault()
    window.open('https://sleepmood.netlify.com', '_blank')
  }

  const toSignOut = e => {
    console.log('signout')
    localStorage.removeItem('token')
    localStorage.removeItem('tokenType')
  }

  return (
    <HeaderWrapper>
      <div className='iconDiv'>
        <Icon name='cloud' className='cloud' />
        <Icon name='moon' className='moon' />
        <h1>sleepmood</h1>
      </div>
      <div className='menuDiv'>
        <Menu className='menuBox' compact>
          <Dropdown icon='user' className='menuIcon'>
            <Dropdown.Menu className='menuLinks'>
              <Dropdown.Item as={NavLink} to='/home'>Home</Dropdown.Item>
              <Dropdown.Item as={NavLink} to='/SleepHistory'>Sleep History</Dropdown.Item>
              <Dropdown.Item as={NavLink} to='/CreateSleepEntry'>Create Sleep Entry</Dropdown.Item>
              <Dropdown.Item as={NavLink} to='/Help'>Help</Dropdown.Item>
              <Dropdown.Item onClick={toMarketing}>Sleepmood</Dropdown.Item>
              <Dropdown.Item as={NavLink} to='/' onClick={toSignOut}>Sign out</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Menu>
      </div>
    </HeaderWrapper>
  )

}

export default NavBar