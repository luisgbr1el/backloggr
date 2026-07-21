# BackloggR

A web tool to generate clean, share-ready image cards from your latest Backloggd game reviews.

[Live demo](https://mybackloggr.vercel.app)

## Overview

BackloggR lets gamers quickly export their recent game reviews, star ratings, and account status from Backloggd into customized image cards optimized for social media stories (Instagram, Twitter/X, Discord).

Enter your Backloggd username, customize which elements to display, and download or share the generated image directly.

## Features

- **Automated fetching:** Pulls profile data and the most recent review using the Backloggd API wrapper.
- **Card customization:** Toggle the Mastered badge, review date, and review quote on or off.
- **Native web share:** Integrated with the browser's Web Share API for mobile devices with automatic fallback to PNG download.
- **High-resolution export:** Renders $3\times$ pixel ratio PNG cards built with `html-to-image`.
- **CORS-safe serverless architecture:** Converts avatars and game covers via backend serverless functions to prevent cross-origin canvas errors.

## Tech stack

- **Frontend:** React, React Router, React Icons
- **Image generation:** html-to-image
- **Build tool:** Vite
- **Deployment:** Vercel

## Local development

> **Important:** This project uses Vercel Serverless Functions for API endpoints (`/api`). To run the full stack locally with backend support, you must use **Vercel CLI** instead of the standard Vite dev server alone.

### Prerequisites

- Node.js (v18 or higher)
- npm
- Vercel CLI (`npm i -g vercel`)

### Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/luisgbr1el/backloggr.git
   cd backloggr
    ``` 

2. Install dependencies:

    ```bash
    npm install
    ```

3. Install Vercel CLI globally (if not already installed):
    ```bash
    npm install -g vercel
    ``` 

4. Start the local development server with serverless functions support:
    ```bash
    vercel dev
    ```
    
4. Open `http://localhost:3000` in your browser.

## License
MIT