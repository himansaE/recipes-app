# My Recipe Web Application

This project is a full-stack web application developed for the Intern Software Engineer Entry Test for a company. The application helps users keep track of recipes they have cooked.

## Features Implemented

- **Navigation Bar:** A separate functional component imported to the main file for easy navigation.
- **Display Recipes:** Recipes entered by the user are shown on the home page either as a table or cards, with options to delete and edit each recipe.
- **Add Recipe:** Users can add a new recipe using a modal or a separate page, providing inputs such as recipe name, ingredients, and description.
- **View Recipe Details:** Clicking on a recipe redirects the user to a separate page displaying all details of that recipe.
- **Delete Recipe:** When a user clicks the delete button, an alert prompts for confirmation. If confirmed, the recipe is deleted from the database, and the webpage is refreshed automatically.
- **Edit Recipe:** Clicking the edit button redirects the website to a new page with the recipe values displayed in a form for the user to edit.
- **Manual Refresh:** A button inside the navigation bar allows manual refreshing of the webpage.
- **MongoDB Atlas:** MongoDB Atlas is used for cloud data storage.

## Tech Stack

- **Frontend:** React.js, Material UI, Tailwind CSS
- **Backend:** Node.js, Express
- **Database:** MongoDB (MongoDB Atlas)
- **Other:** Axios for API requests, Redux for state management, Vite for build tooling.

## Setup Guide

1. Clone the repository to your local machine:

    ```bash
    git clone https://github.com/himansaE/recipes-app
    cd recipes-app
    ```

1. Setup Project separate as backend and frontend

    - [Setup Backend](Backend/)
    - [Setup Frontend](Frontend/)
