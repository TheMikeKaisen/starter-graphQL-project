# GraphQL Starter Project

This is a simple GraphQL server built using Apollo Server. It provides basic CRUD operations for managing games, reviews, and authors.

## Features

- Uses Apollo Server for GraphQL API.
- Implements queries and mutations for Games, Reviews, and Authors.
- Uses in-memory storage (db.js) for demonstration purposes.
- Provides filtering and relational data fetching.

## Installation

1. Clone the repository:
    
    ```
    git clone <repo-url>
    
    ```
    
2. Navigate to the project directory:
    
    ```
    cd starter-graphQL-project
    
    ```
    
3. Install dependencies:
    
    ```
    npm install
    
    ```
    

## Usage

### Start the Server

```
npm start

```

The server will be running at `http://localhost:4001`.

### GraphQL Schema

The API supports the following types and operations:

### Types

- `Game` (id, title, platform, review)
- `Review` (id, rating, content, author_id, game_id, game, author)
- `Author` (id, name, verified, review)

### Queries

- Fetch all games, authors, or reviews.
- Fetch a single game, author, or review by ID.

### Mutations

- Add, update, and delete games, authors, and reviews.

### Example Query

Fetch all games:

```graphql
query {
  games {
    id
    title
    platform
  }
}

```

### Example Mutation

Adding a new game:

```graphql
mutation {
  addGame(newGame: { title: "Zelda", platform: ["Switch"] }) {
    id
    title
    platform
  }
}

```

## File Structure

- `index.js` - Main server setup.
- `schema.js` - GraphQL type definitions.
- `db.js` - Mock database.

## Dependencies

- `@apollo/server`
- `@apollo/server/standalone`
