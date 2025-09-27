# Project & Task Management App

A **React + TypeScript + Node.js (Express) + MongoDB** web application for managing projects and tasks with user authentication, project/task creation, editing, deletion, and status tracking.

---

## Features

### User Authentication
- **Register** new users.
- **Login** existing users.
- **Token-based authentication** using JWT.
- **Access token and refresh token** flow:
  - Access token stored in `localStorage`.
  - Refresh token stored in cookies.
  - When access token expires, `refreshAccessToken` endpoint issues a new access token using the refresh token.
  - If refresh token is invalid or missing, user is redirected to login.

### Projects
- List all projects for the logged-in user.
- **Create Project** from projects page.
- **Edit Project** (title, description, status).
- **Delete Projects** (single or multiple using checkboxes).
- Projects table is sorted by creation date (newest first).

### Project Details
- View project information including tasks.
- **Add Task** to a project.
- Task listing shows:
  - Title
  - Description
  - Status (`todo`, `in-progress`, `done`)
  - Due Date
- Click on task to view and **edit task details** (status, description, due date).

### Tasks
- Create, edit, and delete tasks.
- Task detail page allows updating:
  - Title
  - Description
  - Status
  - Due Date

### Frontend
- Built with **React + TypeScript + React Router v6**.
- Handles route-based authentication.
- Conditional rendering for login, selection, projects, and tasks pages.
- Selection page after login allows user to choose whether to see projects or tasks first.

### API Handling
- Axios instance with token headers.
- Handles token expiration:
  - If access token expires, `refreshAccessToken` endpoint is called.
  - If refresh token is also expired or invalid, user is redirected to login.
- Automatic redirection to login on unauthorized requests.

---

## Project Structure

