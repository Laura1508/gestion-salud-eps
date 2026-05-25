import './Menu.css';

import { useLocation } from 'react-router-dom';
import { useState } from 'react';

import axios from 'axios';

function Menu() {

  const location = useLocation();

  const usuario = location.state?.usuario;

  const [citas, setCitas] = useState([]);


  const [mostrarForm, setMostrarForm] = useState(false);
  const [vistaActiva, setVistaActiva] = useState('');

  const [fecha, setFecha] = useState('');
  const [hora, setHora] = useState('');
  const [especialidad, setEspecialidad] = useState('');


  const [medicamentos, setMedicamentos] = useState([]);

  const [mostrarReserva, setMostrarReserva] = useState(false);

  const [medicamentoSeleccionado, setMedicamentoSeleccionado] = useState(null);

  const [cantidadReserva, setCantidadReserva] = useState(1);

  const [autorizacion, setAutorizacion] = useState(null);


  const [nombreUsuario, setNombreUsuario] = useState(usuario?.nombre || '');

  const [correoUsuario, setCorreoUsuario] = useState(usuario?.correo || '');

  const [cedulaUsuario, setCedulaUsuario] = useState(usuario?.cedula || '');

  // =========================
  // OBTENER CITAS
  // =========================

  const obtenerCitas = async () => {

    try {

      const res = await axios.get(
        'http://localhost:5000/citas'
      );

      setCitas(res.data);

      setVistaActiva('citas');

    } catch (error) {

      console.log(error);

    }

  };



  // =========================
  // CREAR CITA
  // =========================

  const crearCita = async () => {

    try {

      await axios.post(
        'http://localhost:5000/citas',
        {
          paciente_id: usuario.id,
          fecha,
          hora,
          especialidad
        }
      );

      // CERRAR MODAL
      setMostrarForm(false);

      // LIMPIAR
      setFecha('');
      setHora('');
      setEspecialidad('');

      // RECARGAR CITAS
      obtenerCitas();



      // POPUP
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
          ">

            <div style="
              font-size: 60px;
              margin-bottom: 15px;
            ">
  
            </div>

            <h2 style="color:#16a34a;">
              Cita Asignada
            </h2>

            <p>
              La cita fue creada exitosamente
            </p>

            <button id="cerrarPopup" style="
              background:#16a34a;
              color:white;
              border:none;
              padding:12px 25px;
              border-radius:10px;
              cursor:pointer;
              margin-top:20px;
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

      });

    } catch (error) {

      console.log(error);

    }

  };



  // =========================
  // ELIMINAR CITA
  // =========================

  const cancelarCita = async (id) => {

    try {

      await axios.delete(
        `http://localhost:5000/citas/${id}`
      );

      // ACTUALIZAR LISTA
      setCitas(
        citas.filter(cita => cita.id !== id)
      );



      // POPUP
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
          ">

            <div style="
              font-size: 60px;
              margin-bottom: 15px;
            ">
              ❌
            </div>

            <h2 style="color:#dc2626;">
              Cita Cancelada
            </h2>

            <p>
              La cita fue eliminada exitosamente
            </p>

            <button id="cerrarPopup" style="
              background:#dc2626;
              color:white;
              border:none;
              padding:12px 25px;
              border-radius:10px;
              cursor:pointer;
              margin-top:20px;
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

      });

    } catch (error) {

      console.log(error);

    }

  };

  
  // =========================
  // Obtener medicamentos
  // ========================= 

  const obtenerMedicamentos = async () => {

    try {

      const res = await axios.get(
        'http://localhost:5000/medicamentos'
      );

      setMedicamentos(res.data);

      setVistaActiva('medicamentos');

    } catch (error) {

      console.log(error);

    }

  };

  const abrirReserva = (medicamento) => {

  setMedicamentoSeleccionado(medicamento);

  setMostrarReserva(true);

};

    // =========================
  // Reservar medicamentos
  // =========================

  const reservarMedicamento = async () => {

  try {

    await axios.put(
      `http://localhost:5000/medicamentos/reservar/${medicamentoSeleccionado.id}`,
      {
        cantidad: cantidadReserva
      }
    );

    // RECARGAR
    obtenerMedicamentos();

    // CERRAR MODAL
    setMostrarReserva(false);

    // LIMPIAR
    setCantidadReserva(1);

    setAutorizacion(null);



    // POPUP
    const popup = document.createElement("div");

    popup.innerHTML = `
      <div style="
        position: fixed;
        top:0;
        left:0;
        width:100%;
        height:100%;
        background:rgba(0,0,0,0.5);
        display:flex;
        justify-content:center;
        align-items:center;
        z-index:9999;
      ">

        <div style="
          background:white;
          padding:35px;
          border-radius:20px;
          width:350px;
          text-align:center;
          font-family:Arial;
        ">

          <div style="font-size:60px;">
            💊
          </div>

          <h2 style="color:#16a34a;">
            Reserva Confirmada
          </h2>

          <p style="
            margin-top:15px;
            color:#555;
            line-height:1.6;
          ">
            Tu medicamento quedó reservado exitosamente.
            <br><br>

            Puedes recogerlo en la siguiente sucursal:
            
            <br><br>

            <strong>
              📍 EPS Salud Central
            </strong>

            <br>

            Calle 72 #15-48,
            Bogotá, Colombia
          </p>

          <button id="cerrarPopup" style="
            background:#16a34a;
            color:white;
            border:none;
            padding:12px 25px;
            border-radius:10px;
            cursor:pointer;
            margin-top:20px;
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

    });

  } catch (error) {

    console.log(error);

    alert("No hay suficientes unidades");

  }

};

  // =========================
// ACTUALIZAR USUARIO
// =========================

  const actualizarUsuario = async () => {

    try {

      await axios.put(
        `http://localhost:5000/usuarios/${usuario.id}`,
        {
          nombre: nombreUsuario,
          correo: correoUsuario,
          cedula: cedulaUsuario
        }
      );



      // CERRAR MODAL
      setVistaActiva('');



      // POPUP
      const popup = document.createElement("div");

      popup.innerHTML = `
        <div style="
          position: fixed;
          top:0;
          left:0;
          width:100%;
          height:100%;
          background:rgba(0,0,0,0.5);
          display:flex;
          justify-content:center;
          align-items:center;
          z-index:9999;
        ">

          <div style="
            background:white;
            padding:35px;
            border-radius:20px;
            width:350px;
            text-align:center;
            font-family:Arial;
          ">

            <div style="font-size:60px;">
              👤
            </div>

            <h2 style="color:#2563eb;">
              Información Actualizada
            </h2>

            <p>
              Tus datos fueron actualizados correctamente
            </p>

            <button id="cerrarPopup" style="
              background:#2563eb;
              color:white;
              border:none;
              padding:12px 25px;
              border-radius:10px;
              cursor:pointer;
              margin-top:20px;
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

      });

    } catch (error) {

      console.log(error);

    }

  };

  // =========================
  // CERRAR SESIÓN
  // =========================

  const cerrarSesion = () => {

    window.location.href = "/";

  };



  return (

    <div className="dashboard">

      <button
        className="logout-btn"
        onClick={cerrarSesion}
      >
        Cerrar Sesión
      </button>



      <div className="welcome">

        <h1>
          Bienvenido,
          <span> {usuario?.nombre}</span>
        </h1>

        <p>
          Sistema Inteligente de Gestión Médica
        </p>

      </div>



      {/* TARJETAS */}

      <div className="cards-container">

        <div
          className="card"
          onClick={obtenerCitas}
        >

          <div className="icon">
            📅
          </div>

          <h2>Citas Médicas</h2>

          <p>
            Consulta tus citas médicas.
          </p>

        </div>



        <div
            className="card"
            onClick={obtenerMedicamentos}
          >

          <div className="icon">
            💊
          </div>

          <h2>Medicamentos</h2>

          <p>
            Gestiona tus medicamentos.
          </p>

        </div>



        <div
          className="card"
          onClick={() => setVistaActiva('perfil')}
        >

          <div className="icon">
            👤
          </div>

          <h2>Actualizar Información</h2>

          <p>
            Consulta y actualiza tus datos personales.
          </p>

        </div>

      </div>



      {/* TABLA CITAS */}

      {
        vistaActiva === 'citas' && (

          <div className="tabla-container">

            <div className="tabla-header">

              <h2>Listado de Citas</h2>

              <button
                className="asignar-btn"
                onClick={() => setMostrarForm(true)}
              >
                Asignar Cita
              </button>

            </div>



            <table>

              <thead>

                <tr>

                  <th>ID</th>
                  <th>Fecha</th>
                  <th>Hora</th>
                  <th>Especialidad</th>
                  <th>Estado</th>
                  <th>Acción</th>

                </tr>

              </thead>

              <tbody>

                {
                  citas.map((cita) => (

                    <tr key={cita.id}>

                      <td>{cita.id}</td>
                      <td>{cita.fecha}</td>
                      <td>{cita.hora}</td>
                      <td>{cita.especialidad}</td>
                      <td>{cita.estado}</td>

                      <td>

                        <button
                          className="cancel-btn"
                          onClick={() => cancelarCita(cita.id)}
                        >
                          Cancelar
                        </button>

                      </td>

                    </tr>

                  ))
                }

              </tbody>

            </table>

          </div>

        )
      }
      {
        vistaActiva === 'medicamentos' && (

          <div className="tabla-container">

            <div className="tabla-header">

              <h2>Listado de Medicamentos</h2>

            </div>

            <table>

              <thead>

                <tr>

                  <th>ID</th>
                  <th>Medicamento</th>
                  <th>Cantidad</th>
                  <th>Fecha Vencimiento</th>
                  <th>Estado</th>
                  <th>Acción</th>

                </tr>

              </thead>

              <tbody>

                {
                  medicamentos.map((med) => (

                    <tr key={med.id}>

                      <td>{med.id}</td>

                      <td>{med.nombre}</td>

                      <td>{med.cantidad}</td>

                      <td>{med.fecha_vencimiento}</td>

                      <td>

                        {
                          med.cantidad > 0
                          ? '✅ Disponible'
                          : '❌ Sin unidades'
                        }

                      </td>

                      <td>

                        {
                          med.cantidad > 0 && (

                            <button
                              className="reservar-btn"
                              onClick={() => abrirReserva(med)}
                            >
                              Reservar
                            </button>

                          )
                        }

                      </td>

                    </tr>

                  ))
                }

              </tbody>

            </table>

          </div>

        )
      }
      {
        mostrarReserva && (

          <div className="modal">

            <div className="reserva-modal">

              <span
                className="close"
                onClick={() => setMostrarReserva(false)}
              >
                ×
              </span>



              <div className="reserva-header">

                <div className="reserva-icon">
                  💊
                </div>

                <h2>Reservar Medicamento</h2>

                <p>
                  {medicamentoSeleccionado?.nombre}
                </p>

              </div>



              <div className="input-group">

                <label>
                  Cantidad requerida
                </label>

                <input
                  type="number"
                  min="1"
                  value={cantidadReserva}
                  onChange={(e) =>
                    setCantidadReserva(e.target.value)
                  }
                />

              </div>



              <div className="input-group">

                <label>
                  Adjuntar autorización médica
                </label>

                <input
                  type="file"
                  onChange={(e) =>
                    setAutorizacion(e.target.files[0])
                  }
                />

              </div>



              <button
                className="guardar-cita-btn"
                onClick={reservarMedicamento}
              >
                Confirmar Reserva
              </button>

            </div>

          </div>

        )
      }


      {/* MODAL CREAR CITA */}

      {
        mostrarForm && (

            <div className="modal">

            <div className="cita-modal">

                <span
                className="close"
                onClick={() => setMostrarForm(false)}
                >
                ×
                </span>

                <div className="cita-header">

                <div className="cita-icon">
                    📅
                </div>

                <h2>Asignar Nueva Cita</h2>

                <p>
                    Completa la información de la cita médica
                </p>

                </div>



                <div className="input-group">

                <label>Fecha de la cita</label>

                <input
                    type="date"
                    value={fecha}
                    onChange={(e) => setFecha(e.target.value)}
                />

                </div>



                <div className="input-group">

                <label>Hora de la cita</label>

                <input
                    type="time"
                    value={hora}
                    onChange={(e) => setHora(e.target.value)}
                />

                </div>



                <div className="input-group">

                <label>Especialidad médica</label>

                <select
                    value={especialidad}
                    onChange={(e) => setEspecialidad(e.target.value)}
                >

                    <option value="">
                    Seleccione especialidad
                    </option>

                    <option value="Medicina General">
                    Medicina General
                    </option>

                    <option value="Odontología">
                    Odontología
                    </option>

                    <option value="Pediatría">
                    Pediatría
                    </option>

                    <option value="Cardiología">
                    Cardiología
                    </option>

                    <option value="Dermatología">
                    Dermatología
                    </option>

                </select>

                </div>



                <button
                className="guardar-cita-btn"
                onClick={crearCita}
                >
                Guardar Cita
                </button>

            </div>

            </div>

        )
        }
        {
          vistaActiva === 'perfil' && (

            <div className="modal">

              <div className="perfil-modal">

                <span
                  className="close"
                  onClick={() => setVistaActiva('')}
                >
                  ×
                </span>



                <div className="perfil-header">

                  <div className="perfil-icon">
                    👤
                  </div>

                  <h2>Actualizar Información</h2>

                  <p>
                    Modifica tus datos personales
                  </p>

                </div>



                <div className="input-group">

                  <label>Nombre Completo</label>

                  <input
                    type="text"
                    value={nombreUsuario}
                    onChange={(e) =>
                      setNombreUsuario(e.target.value)
                    }
                  />

                </div>



                <div className="input-group">

                  <label>Correo Electrónico</label>

                  <input
                    type="email"
                    value={correoUsuario}
                    onChange={(e) =>
                      setCorreoUsuario(e.target.value)
                    }
                  />

                </div>



                <div className="input-group">

                  <label>Cédula</label>

                  <input
                    type="text"
                    value={cedulaUsuario}
                    onChange={(e) =>
                      setCedulaUsuario(e.target.value)
                    }
                  />

                </div>



                <button
                  className="guardar-cita-btn"
                  onClick={actualizarUsuario}
                >
                  💾 Guardar Cambios
                </button>

              </div>

            </div>

          )
        }

    </div>

  );

}

export default Menu;