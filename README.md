#  Funcación Patas Arriba WebApp - Client

## Introduction

A web app to efficiently manage and coordinate volunteer participation in the foundation's events.
This repository contains the client-side PWA. There is a [separate project for the server-side API](https://github.com/jorgeberrizbeitia/patas-arriba-server).

https://www.fundacionpatasarriba.com/

## Environment Variables

This project follows a standard way of working with `.env` files for different environments:

- `.env.local`: Used for local development.
- `.env.production`: Used for production environment.

For more details on this convention, you can refer to the [dotenv documentation](https://github.com/motdotla/dotenv#readme).

### Setting Up Environment Variables for development

1. **Copy the `.env.local.example` file to `.env.local`**.

2. **Add the following environment variables to your `.env.local` file**:

    ```dotenv
    VITE_SERVER_URL= # server URL, ej: http://localhost:5005
    VITE_VAPID_PUSH_PUBLIC_KEY= # The VAPID public key. Obtain this key from the server-side project.
    ```

# Notes:

This project was created using a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
