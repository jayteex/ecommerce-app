# ecommerce-app

## Description

This is a PERN application, with a Postgres database, Node/Express backend, and React frontend. 

Work in progress. See commits/code for details. 

Application is under active development and usually gets 1 commit per weekday.

## How to use

You can find the link to the hosted site on the right, under the "About" section.

When you create an account, please use mock data only when it comes to sensitive data (email, address, payment data, etc.). 

ATTENTION: THIS WILL NEVER BE A "REAL" STORE. For fun and portfolio purposes only. No real products are on display, and payment process will be entirely mocked. 

## Technologies 

- PostgreSQL
  - Supabase
- Express.js
  - Passport
  - Session
  - CORS
- React & React Router
  - Axios
- Redux Toolkit
- Node.js
- Jest, Supertest, Morgan
- Vite

## Done

- Database design & setup on Supabase
- Setup of dedicated frontend & backend applications
  - Directory structure
  - Basic components & styling
- Configuration & hosting on Render (link is in About section)
- Listing with example products
  - Currency filter
  - Basic cart functionality
- Sign up and login process
  - Persistent user authentication across page reloads
  - Conditional Rendering
- Logout process
- Account page
- Offcanvas cart
- Product Detail Pages (PDP)

## TODO

- Advanced PDP and persistent OC cart 
  - OC cart icon/event when product is added
  - Buy-button on PDP (not only on PLP)
- Advanced Account page
  - Order History
  - Refactored save/alter data functionality (it works locally, but not yet on Render)
- Search
- Checkout process
  - Mock payment integration
- Footer
- Increase speed & performance, if possible
  - (free tiers of Render & Supabase are quite slow, especially on initial load)
- Bonus
  - OAuth login via GitHub, Google etc.



