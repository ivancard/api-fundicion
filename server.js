const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use(cors({
  origin: 'http://localhost:5173', // Reemplaza con el puerto correcto de tu aplicación React
}));

// Configurar el transporte de correo para Hostinger
const transporter = nodemailer.createTransport({
  host: 'smtp.hostinger.com', // Cambia esto al servidor SMTP de Hostinger
  port: 465, // El puerto SMTP de Hostinger (puede variar, consulta la documentación de Hostinger)
  secure: true, // Si el puerto es seguro (TLS/SSL)
  auth: {
    user: 'info@fundiciongarcia.com', // Cambia esto a tu dirección de correo en Hostinger
    pass: 'Garcia@@2023', // Cambia esto a tu contraseña de correo en Hostinger
  },
});

app.post('/enviar-correo', (req, res) => {
  console.clear()
  const { nombre, email, mensaje } = req.body;

  console.log(email);
  const mailOptions = {
    from: 'info@fundiciongarcia.com', // Establece el remitente como 'info@fundiciongarcia.com'
    to: 'info@fundiciongarcia.com',
    subject: 'Nuevo mensaje de contacto desde tu sitio web',
    text: `Nombre: ${nombre}\nCorreo electrónico: ${email}\nMensaje: ${mensaje}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error al enviar el correo:', error);
      res.status(500).json({ error: 'Error al enviar el correo' });
    } else {
      console.log('Correo enviado:', info.response);
      res.status(200).json({ message: 'Correo enviado con éxito' });
    }
  });
});

app.listen(port, () => {
  console.log(`Servidor Express en funcionamiento en el puerto ${port}`);
});
