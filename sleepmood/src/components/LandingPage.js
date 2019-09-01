import React from 'react';
import { Link } from 'react-router-dom';
import { Icon } from 'semantic-ui-react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSmile } from '@fortawesome/free-solid-svg-icons';

import styled from 'styled-components';


const HomeContainer = styled.div`
    margin: 20px 40px;
    
    .landing-star {
        color: #D0C9B4;
        position: relative;
        left: 2.5rem;
    }
`;

const Title = styled.h1`
    color: #edebe3;
    font-family: 'Bitter', serif;
    font-size: 46px;
    
    margin: 20px 0;
    line-height: 1.5;
    position: relative;
    z-index: 2;
    
`;

const IconContainer = styled.div`
    color: #979ECD;
    display: flex;
    align-items: flex-end;
    flex-direction: column;
    height: 50px;
    .landing-cloud1 {
        color:#B5B7c5;
        font-size: 8rem;
        position: relative;
        top: -7rem;
    }
    .landing-cloud2 {
        color:#B5B7c5;
        font-size: 6rem;
        position: relative;
        top: -2.5rem;
        right: 8rem;
    }
    .landing-star2 {
        color: #D0C9B4;
        position: relative;
        right: 28.5rem;
        top: -1rem;
    }
    .landing-star3 {
        color: #D0C9B4;
        font-size: .5rem;
        right: 18.5rem;
        position: relative;
    }
    .landing-star4 {
        color: #D0C9B4;
        position: relative;
        right:3.5rem;
    }
`;

const Intro = styled.p`
    color: #cfd2e8;
    font-size: 30px;
    font-weight: bold;
    padding-top: 30px;
    text-align: center;
`;

const LinkContainer = styled.div`
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    flex: wrap;
    justify-content: center;
    align-items: center;
    .create-account {
        padding: 8px 5px;
        text-align: center;
        button {
            background: #b07568;
            border-radius: 5px;
            border: none;
            color: white;
            font-weight: bold;
            padding: 15px 15px;
            text-align: center;
        }
    }
    .landing-star5 {
        color: #D0C9B4;
        position: relative;
        right: 14rem;
        top: -1rem;
    }
    .login {
        padding: 8px 5px;
        text-align: center;
        button {
            background: #cfd2e8;
            border-radius: 5px;
            border: none;
            color: #12172A;
            font-weight: bold;
            padding: 15px 52px;
            text-align: center;
        }
    }
`;

const CardContainer = styled.div`
    background: #232433;
    margin: 20px 10px;
    padding-bottom: .5rem;
    .landing-star6 {
        color: #D0C9B4;
        position: relative;
        z-index: 0;
        left: 2.25rem;
        top: 7rem;
        transform: rotate(-40deg);
    }
    .landing-star7 {
        color: #D0C9B4;
        position: relative;
        left:25.25rem;
        top:3rem;
        z-index: 0;
    }
    .landing-star8 {
        color: #D0C9B4;
        position: relative;
        z-index: 0;
        top: 18rem;
        left: -4.2rem;
    }
    .landing-star9 {
        color: #D0C9B4;
        position: relative;
        z-index: 0;
        top: 31rem;
        left: 22rem;
    }
    .landing-star10 {
        color: #D0C9B4;
        position: relative;
        z-index: 0;
        top: 47rem;
        transform: rotate(-40deg);
    }
`;

const Card = styled.div`
    background: white ;
    border-radius: 5px;
    color: #232433;
    margin: 5px 40px 40px;
    padding: 15px 20px;
    position: relative;
    z-index:2;
    h5 {
        font-size: 20px;
        font-weight: 900;
    }
    p {
        font-size: 18px;
    }
`;

const Heading = styled.h3`
    color: #efe3e1;
    font-family: 'Bitter', serif;
    font-size: 28px;
    padding: 20px 30px 5px;
    
`;

const LandingPage = () => {

    return (
        <HomeContainer>
            <Icon name="star" className='landing-star' />
            <Title>How much sleep do you need<br></br> to optimize<br></br> your life? </Title>
            <IconContainer >
                <Icon name="star" className='landing-star2' />
                <Icon name="star" className='landing-star3' />
                <Icon name="star" className='landing-star4' />
                <Icon name="cloud" className='landing-cloud1' />
                <Icon name="cloud" className='landing-cloud2' />
            </IconContainer>
            <Intro>Let us figure out how many hours of sleep you need to live your best life.</Intro>
            <LinkContainer>
                <Link to="/signup" className="create-account" ><button>Create Account</button></Link>
                <Icon name="star" className='landing-star5' />
                <Link to="/login" className="login" ><button>Sign in</button></Link>
            </LinkContainer>
            <CardContainer>
                <Heading>sleepmood basics</Heading>
                <Icon name="star" className='landing-star6' />
                <Icon name="star" className='landing-star7' />
                <Icon name="star" className='landing-star8' />
                <Icon name="star" className='landing-star9' />
                <Icon name="star" className='landing-star10' />
                <Card>
                    <h5><Icon name="line graph" /> Graphs</h5>
                    <p>Your sleep data will be calculated and then graphed allowing you to see variations in you sleep time by night</p>
                </Card>
                <Card>
                    <h5><FontAwesomeIcon style={{color:'#191d37', width: '23.59px', height: '23.59px' }} icon={faSmile} className='lp-margin' /> Mood</h5>
                    <p>Add your mood by using the emoji score system and based on hours slept, we will determine how many hours of sleep you need to feel your very best.</p>
                </Card>
                <Card>
                    <h5><Icon name="linkify" /> Connect</h5>
                    <p>Connect our sleep tracker to your wearable technology and let it do the sleep tracking for you.</p>
                </Card>
            </CardContainer>

        </HomeContainer>
    )
}

export default LandingPage;