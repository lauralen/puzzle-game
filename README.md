# Puzzle

## About

Drag and drop puzzle game with Unsplash API implementation.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine.

### Installing

Clone the repository

```
git clone https://github.com/lauralen/puzzle-game.git
```

Install dependencies

```
npm install
```

Get Unsplash API access key

- Register at https://unsplash.com/developers to get API access key
- Create a unsplashId.js file in utils folder.
- Copy the following code and replace YOUR_ACCESS_KEY with your API access key.

```
const unsplashId = 'YOUR_ACCESS_KEY';

export default unsplashId;
```

Start development server

```
npm start
```

## Demo

The project is live at [puzzle-game-unsplash.herokuapp.com](https://puzzle-game-unsplash.herokuapp.com/)
