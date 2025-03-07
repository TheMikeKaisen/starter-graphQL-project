export const typeDefs = `#graphql
    type Game{
        id: ID! # ! -> required
        title: String!
        platform: [String!]! # array of string
        review: [Review!]
    }
    type Review{
        id:ID!
        rating:Int!
        content: String!
        author_id: String!
        game_id: String!
        game: Game!
        author: Author!
    }
    type Author{ 
        id: ID!
        name: String!
        verified: Boolean!
        review: [Review!]
    }
    type Query{
        reviews: [Review]
        games:[Game]
        authors: [Author]

        # to fetch a single review using id
        review(id: ID!): Review

        # to fetch a single game
        game(id: ID!): Game

        # to fetch a single author
        author(id:ID!): Author
    }
    type Mutation{
        # delete game
        deleteGame(id: ID!): [Game]
        deleteAuthor(id: ID!): [Author]
        deleteReview(id: ID!) : [Review]

        # add game, author and review
        addGame(newGame: addGameInput) : Game
        addAuthor(newAuthor: addAuthorInput): Author
        addReview(newReview: addReviewInput): Review

        #update game, author and review
        updateGame(id: ID!, updatedGame: updateGameInput!): Game
        updateAuthor(id:ID!, updatedAuthor: updateAuthorInput!): Author
        updateReview(id: ID!, updatedReview: updateReviewInput!): Review
    }
    input addGameInput{
        title: String!, 
        platform: [String!]!
    }
    input addAuthorInput{
        name: String!,
        verified: Boolean!
    }
    input addReviewInput{
        rating:Int!
        content: String!
        author_id: String!
        game_id: String!
    }

    input updateGameInput{
        title: String
        platform: [String!]
    }
    input updateAuthorInput{
        name: String
        verified: Boolean
    }
    input updateReviewInput{
        rating: Int
        content: String
        author_id: String
        game_id: String
    }
`




/*
platform: [String!]  # This means:
platform: ["PC", "Xbox"]  ✅ (Valid)
platform: ["PC", null]    ❌ (Invalid, because elements must be non-null)
platform: null            ✅ (Valid, because the array itself is nullable)
*/

// that is why we use [String!]!

// types in graphql -> int, float, string, boolean, ID