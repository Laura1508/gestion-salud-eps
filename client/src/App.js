import './App.css';

import { useState } from 'react';
import axios from 'axios';

import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate
} from 'react-router-dom';

import Menu from './Menu';



// =========================
// LOGIN PAGE
// =========================

function LoginPage() {

  const navigate = useNavigate();

  // LOGIN
  const [correoLogin, setCorreoLogin] = useState('');
  const [passwordLogin, setPasswordLogin] = useState('');

  // REGISTRO
  const [mostrarRegistro, setMostrarRegistro] = useState(false);

  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [cedula, setCedula] = useState('');
  const [password, setPassword] = useState('');



  // =========================
  // LOGIN
  // =========================

  const iniciarSesion = async () => {

    try {

      const res = await axios.post(
        'http://localhost:5000/login',
        {
          correo: correoLogin,
          password: passwordLogin
        }
      );

      navigate('/menu', {
        state: {
          usuario: res.data.usuario
        }
      });

    } catch (error) {

      const popup = document.createElement("div");

      popup.innerHTML = `
        <div style="
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0,0,0,0.5);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 9999;
        ">

          <div style="
            background: white;
            padding: 35px;
            width: 350px;
            border-radius: 20px;
            text-align: center;
            font-family: Arial;
            animation: aparecer 0.3s ease;
          ">

            <div style="
              font-size: 70px;
              margin-bottom: 15px;
            ">
              ❌
            </div>

            <h2 style="color:#dc2626;">
              Error de Inicio de Sesión
            </h2>

            <p style="
              color:#555;
              margin-top:10px;
            ">
              Correo o contraseña incorrectos
            </p>

            <button id="cerrarError" style="
              background:#dc2626;
              color:white;
              border:none;
              padding:12px 25px;
              border-radius:10px;
              cursor:pointer;
              margin-top:20px;
              font-size:15px;
              font-weight:bold;
            ">
              Intentar de nuevo
            </button>

          </div>

        </div>

        <style>
          @keyframes aparecer {
            from {
              opacity:0;
              transform:scale(0.7);
            }
            to {
              opacity:1;
              transform:scale(1);
            }
          }
        </style>
      `;

      document.body.appendChild(popup);

      document
        .getElementById("cerrarError")
        .addEventListener("click", () => {

          popup.remove();

      });

    }

  };



  // =========================
  // REGISTRO
  // =========================

  const registrarUsuario = async () => {

    try {

      await axios.post(
        'http://localhost:5000/registro',
        {
          nombre,
          correo,
          cedula,
          password
        }
      );



      // =========================
      // POPUP ÉXITO
      // =========================

      const popup = document.createElement("div");

      popup.innerHTML = `
        <div style="
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0,0,0,0.5);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 9999;
        ">

          <div style="
            background: white;
            padding: 35px;
            width: 350px;
            border-radius: 20px;
            text-align: center;
            font-family: Arial;
            animation: aparecer 0.3s ease;
          ">

            <div style="
              font-size: 70px;
              margin-bottom: 15px;
            ">
              ✅
            </div>

            <h2 style="color:#2563eb;">
              Registro Exitoso
            </h2>

            <p style="
              color:#555;
              margin-top:10px;
            ">
              Usuario registrado correctamente
            </p>

            <button id="cerrarPopup" style="
              background:#2563eb;
              color:white;
              border:none;
              padding:12px 25px;
              border-radius:10px;
              cursor:pointer;
              margin-top:20px;
              font-size:15px;
              font-weight:bold;
            ">
              Continuar
            </button>

          </div>

        </div>
      `;

      document.body.appendChild(popup);

      document
        .getElementById("cerrarPopup")
        .addEventListener("click", () => {

          popup.remove();

          setMostrarRegistro(false);

      });



      // =========================
      // LIMPIAR CAMPOS
      // =========================

      setNombre('');
      setCorreo('');
      setCedula('');
      setPassword('');

    } catch (error) {

      alert("Error al registrar");

    }

  };



  // =========================
  // RETURN
  // =========================

  return (

    <div className="container">

      {/* NAVBAR */}

      <header className="navbar">

        <div className="logo-section">

          <h1>🏥 Gestión Salud EPS</h1>

        </div>

      </header>



      {/* HERO */}

      <section className="hero">

        <div className="overlay">

          <div className="login-card">

            {/* HEADER */}

            <div className="login-header">

              <div className="login-icon">
              
              </div>

              <h2>Bienvenido</h2>

              <p>
                Inicia sesión para acceder al sistema médico
              </p>

            </div>



            {/* INPUT CORREO */}

            <div className="input-container">

              <label>Correo Electrónico</label>

              <input
                type="email"
                placeholder="Ingrese su correo"
                value={correoLogin}
                onChange={(e) => setCorreoLogin(e.target.value)}
              />

            </div>



            {/* INPUT PASSWORD */}

            <div className="input-container">

              <label>Contraseña</label>

              <input
                type="password"
                placeholder="Ingrese su contraseña"
                value={passwordLogin}
                onChange={(e) => setPasswordLogin(e.target.value)}
              />

            </div>



            {/* BOTÓN LOGIN */}

            <button
              className="login-btn-main"
              onClick={iniciarSesion}
            >
              Ingresar
            </button>



            {/* REGISTRO */}

            <div className="register-section">

              <p>
                ¿No tienes cuenta?
              </p>

              <button
                className="register-btn"
                onClick={() => setMostrarRegistro(true)}
              >
                Crear Cuenta
              </button>

            </div>

          </div>

        </div>

      </section>



      {/* MODAL REGISTRO */}

      {
        mostrarRegistro && (

          <div className="modal">

            <div className="register-modal">

              <span
                className="close"
                onClick={() => setMostrarRegistro(false)}
              >
                ×
              </span>



              {/* HEADER */}

              <div className="register-header">

                <div className="register-icon">
                  
                </div>

                <h2>Crear Cuenta</h2>

                <p>
                  Registra tus datos para acceder al sistema
                </p>

              </div>



              {/* INPUT NOMBRE */}

              <div className="input-container">

                <label>Nombre Completo</label>

                <input
                  type="text"
                  placeholder="Ingrese su nombre"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                />

              </div>



              {/* INPUT CORREO */}

              <div className="input-container">

                <label>Correo Electrónico</label>

                <input
                  type="email"
                  placeholder="Ingrese su correo"
                  value={correo}
                  onChange={(e) => setCorreo(e.target.value)}
                />

              </div>



              {/* INPUT CÉDULA */}

              <div className="input-container">

                <label>Cédula</label>

                <input
                  type="text"
                  placeholder="Ingrese su cédula"
                  value={cedula}
                  onChange={(e) => setCedula(e.target.value)}
                />

              </div>



              {/* INPUT PASSWORD */}

              <div className="input-container">

                <label>Contraseña</label>

                <input
                  type="password"
                  placeholder="Ingrese su contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

              </div>



              {/* BOTÓN REGISTRO */}

              <button
                className="save-btn"
                onClick={registrarUsuario}
              >
                Registrarse
              </button>

            </div>

          </div>

        )
      }

    </div>

  );

}



// =========================
// APP
// =========================

function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<LoginPage />}
        />

        <Route
          path="/menu"
          element={<Menu />}
        />

      </Routes>

    </BrowserRouter>

  );

}

export default App;