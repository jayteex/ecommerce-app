# ecommerce-app

## Description

This is a PERN application, with a Postgres database, Node/Express backend, and React frontend. 

Work in progress. See commits/code for details. 

After a short hiatus, the application is back under active development. Should be done by the end of April at the latest.

## How to use

You can find the link to the hosted site on the right, under the "About" section.

When you create an account, please use mock data only when it comes to sensitive data (email, address, payment data, etc.). 

ATTENTION: THIS WILL NEVER BE A "REAL" STORE. For fun and portfolio purposes only. No real products are on display, and payment process will be entirely mocked. 

## Technologies 

- PostgreSQL
  - Supabase
- Node.js
- Express.js
  - Passport
  - Session
  - CORS
  - Redis
- React
  - React Router
  - Axios
  - Redux Toolkit
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
  - Session storage in Redis
- Logout process
- Account page
  - Refactored save/alter data functionality
- Offcanvas cart
  - OC cart icon/event when product is added
  - Add OC cart products to database
- Product Detail Pages (PDP)
  - Add to cart button on PDP (not only on PLP)
- Search
- Checkout page

## TODO

- Session/cookie debugging on the hosted site (works fine locally)
- Mock payment integration
- Order History
- Advanced styling
- Increase speed & performance, if possible
  - (free tiers of Render & Supabase are quite slow, especially on initial load)
- Bonus
  - OAuth login via GitHub, Google etc.



