# Wellness Retreat Application

This is a wellness retreat application built with React.js and Tailwind CSS. It allows users to search and filter retreats by date, type, and title.

## Table of Contents
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)

## Installation

**Clone the repository**:
    ```bash
    git clone https://github.com/JeevanAchar/wellness-retreat.git
    cd wellness-retreat
    ```

**Install frontend dependencies**:
    ```bash
    cd client
    npm install
    ```

## Running the Application

**Start the frontend development server**:
    ```bash
    cd ../client
    npm start
    ```

 Open your browser and navigate to `http://localhost:3000` to see the application running.

## API Endpoints

- `GET /api/v1/retreats`: Fetch all retreats with optional query parameters for pagination, filtering, and searching.
- `GET /api/v1/retreats/:id`: Fetch a single retreat by ID.

## Features

- **Search by Title**: Search retreats by title.
- **Filter by Date**: Filter retreats by a specific date.
- **Filter by Type**: Filter retreats by type (Yoga, Meditation, Detox).
- **Pagination**: Navigate through different pages of retreats.
- **Responsive Design**: Works on both desktop and mobile devices.

## Technologies Used

- **Frontend**:
  - React.js
  - Tailwind CSS
  - Axios

## Contributing

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes and commit them (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Open a pull request.

## Axios

- **Update the base URL with original URL**


    
