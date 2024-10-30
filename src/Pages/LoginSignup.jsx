import React from 'react';
import * as Components from './Components';

const LoginSignup = () => {
  const [signIn, toggle] = React.useState(true);

  return (
    <Components.div>
      <Components.Container>
        
        {/* SignIn Container */}
        <Components.SignInContainer signinIn={signIn}>
          <Components.Form>
            <Components.Title>Iniciar Sesión</Components.Title>
            <Components.Input type='email' placeholder='Email' />
            <Components.Input type='password' placeholder='Contraseña' />
            <Components.Anchor href='#'>¿Olvidaste tu contraseña?</Components.Anchor>
            <Components.Button>Iniciar Sesión</Components.Button>
          </Components.Form>
        </Components.SignInContainer>
        
        {/* SignUp Container */}
        <Components.SignUpContainer signinIn={signIn}>
          <Components.Form>
            <Components.Title>Crea una cuenta</Components.Title>
            <Components.Input type='text' placeholder='Usuario' />
            <Components.Input type='email' placeholder='Email' />
            <Components.Input type='password' placeholder='Contraseña' />
            <Components.Button>Registrarse</Components.Button>
          </Components.Form>
        </Components.SignUpContainer>

        {/* Overlay Container */}
        <Components.OverlayContainer signinIn={signIn}>
          <Components.Overlay signinIn={signIn}>

            {/* Left Overlay Panel */}
            <Components.LeftOverlayPanel signinIn={signIn}>
              <Components.Title>¡Bienvenido de nuevo!</Components.Title>
              <Components.Paragraph>
                Para mantenerse conectado con nosotros, inicie sesión con su información personal
              </Components.Paragraph>
              <Components.GhostButton onClick={() => toggle(true)}>
                Iniciar Sesión
              </Components.GhostButton>
            </Components.LeftOverlayPanel>

            {/* Right Overlay Panel */}
            <Components.RightOverlayPanel signinIn={signIn}>
              <Components.Title>¡Nos alegra conocerte!</Components.Title>
              <Components.Paragraph>
                Ingrese sus datos personales y comience su viaje con nosotros.
              </Components.Paragraph>
              <Components.GhostButton onClick={() => toggle(false)}>
                Registrarse
              </Components.GhostButton>
            </Components.RightOverlayPanel>

          </Components.Overlay>
        </Components.OverlayContainer>

      </Components.Container>
    </Components.div>
  );
}

export default LoginSignup;
