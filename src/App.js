import './App.css';
import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';


axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;

const client = axios.create({
  baseURL: "http://localhost:8000"
});



function App() {

  const [currentUser, setCurrentUser] = useState(null);
  const [registrationToggle, setRegistrationToggle] = useState(false);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [second_name, setSecondName] = useState('');
  const [title, setTitle] = useState('');
  const [birthday, setBirthday] = useState(Date.now());
  //const [phone, setPhone] = useState(0);
  //const [is_active, setIsActive] = useState(false);
  const [is_superuser, setIsSuperUser] = useState(false);
  //const [is_staff, setIsStaff] = useState(false);
  //const [sector, setSector] = useState(null);
  
  useEffect(() => {
    client.get("/user/")
    .then(function(res) {
      setCurrentUser(true);
    })
    .catch(function(error) {
      setCurrentUser(false);
    });
  }, []);

  

  function update_form_btn() {
    if (registrationToggle) {
      document.getElementById("form_btn").innerHTML = "Регистрация";
      setRegistrationToggle(false);
    } else {
      document.getElementById("form_btn").innerHTML = "Войти";
      setRegistrationToggle(true);
    }
  }

  function submitRegistration(e) {
    e.preventDefault();
    client.post(
      "/register/",
      {
        email: email,
        username: username,
        password: password,
        first_name: first_name,
        last_name: last_name,
        second_name: second_name,
        title: title
      }
    ).then(function(res) {
      client.post(
        "/login/",
        {
          email: email,
          password: password
        }
      ).then(function(res) {
        setCurrentUser(true);
      });
    });
  }

  function submitLogin(e) {
    e.preventDefault();
    client.post(
      "/login/",
      {
        email: email,
        password: password
      }
    ).then(function(res) {
      setCurrentUser(true);
    });
  }

  function submitLogout(e) {
    e.preventDefault();
    client.post(
      "/logout/",
      {withCredentials: true}
    ).then(function(res) {
      setCurrentUser(false);
    });
  }
  
  
  if (currentUser) {
    return (
      <div>
        <Navbar bg="dark" variant='dark'>
          <Container>
            <Navbar.Brand>Authentication</Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse className='justify-content-end'>
              <Navbar.Text>
                <form onSubmit={e => submitLogout(e)}>
                  <Button type="submit" variant='light'>Exit</Button>
                </form>
              </Navbar.Text>
            </Navbar.Collapse>
          </Container>
        </Navbar>
          <div className='center'>
            <h2>Success</h2>
          </div>
      </div>
    );
  }
  return (
    <div>
    <Navbar bg="dark" variant='dark'>
      <Container>
        <Navbar.Brand>Autenthication</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className='justify-content-end'>
          <Navbar.Text>
            <Button id="form_btn" onClick={update_form_btn} variant ="light">Registration</Button>
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    {
      registrationToggle ? (
        <div className="center">
          <Form onSubmit={e => submitRegistration(e)}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Адрес электронной почты:</Form.Label>
              <Form.Control type="email" placeholder="Введите адрес электронной почты" value={email} onChange={e => setEmail(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicUsername">
              <Form.Label>Логин</Form.Label>
              <Form.Control type="text" placeholder="Введите логин" value={username} onChange={e => setUsername(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Пароль</Form.Label>
              <Form.Control type="password" placeholder="Введите пароль" value={password} onChange={e => setPassword(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicLastName">
              <Form.Label>Фамилия</Form.Label>
              <Form.Control type="text" placeholder="Введите фамилию" value={last_name} onChange={e => setLastName(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicFirstName">
              <Form.Label>Имя</Form.Label>
              <Form.Control type="text" placeholder="Введите имя" value={first_name} onChange={e => setFirstName(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicSecondName">
              <Form.Label>Отчество</Form.Label>
              <Form.Control type="text" placeholder="Введите отчество" value={second_name} onChange={e => setSecondName(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicTitle">
              <Form.Label>Должность</Form.Label>
              <Form.Control type="text" placeholder="Введите название должности" value={title} onChange={e => setTitle(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicBirthday">
              <Form.Label>День рождения</Form.Label>
              <Form.Control type="date" placeholder="День рождения" value={birthday} onChange={e => setBirthday(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicIsSuperUser">
              <InputGroup.Checkbox aria-label="Radio button for following text input" />
              <Form.Control aria-label="Да" type="checkbox" value={is_superuser} onChange={e => setIsSuperUser(e.target.value)} />
            </Form.Group>
            <Button variant="primary" type="submit">
              Подтвердить
            </Button>
          </Form>
        </div>
      ) : (
        <div className="center">
          <Form onSubmit={e => submitLogin(e)}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Адрес электронной почты</Form.Label>
              <Form.Control type="email" placeholder="Введите адрес электронной почты" value={email} onChange={e => setEmail(e.target.value)} />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Пароль</Form.Label>
              <Form.Control type="password" placeholder="Введите пароль" value={password} onChange={e => setPassword(e.target.value)} />
            </Form.Group>
            <Button variant="primary" type="submit">
              Подтвердить
            </Button>
          </Form>
        </div>
      )
    }
    </div>
  );
}

export default App;
