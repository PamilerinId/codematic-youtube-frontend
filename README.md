# YouTube Video Details App

This project is a full-stack application that fetches and displays details and comments for YouTube videos using the YouTube Data API.

## Features

- Fetch video details (title, description, view count, like count) for a given YouTube video ID
- Load and display top-level comments for the video
- Handle API rate limits and errors gracefully
- Responsive user interface built with React and TypeScript

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js (v14 or later)
- npm (v6 or later)
- A YouTube Data API key

## Setup

1. Clone the repository:
   ```
   git clone https://github.com/your-username/youtube-video-details-app.git
   cd youtube-video-details-app
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the root directory and add your YouTube API key:
   ```
   REACT_APP_YOUTUBE_API_KEY=your_api_key_here
   ```

4. Update the `API_BASE_URL` in `src/VideoDetails.tsx` if your backend is running on a different URL:
   ```typescript
   const API_BASE_URL = 'http://localhost:8000'; // Adjust this to match your backend URL
   ```

## Running the Application

1. Start the development server:
   ```
   npm start
   ```

2. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Building for Production

To build the app for production, run:
