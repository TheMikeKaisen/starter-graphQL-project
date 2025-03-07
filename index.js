import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

// types
import { typeDefs } from "./schema.js";

// data
import db from "./db.js"

const resolvers = {
    Query: {
        games() {
            return db.games
        },
        reviews() {
            return db.reviews
        },
        authors() {
            return db.authors
        }, 
        // every function can take three arguments -> parent, args and context
        review(_, args){
            return db.reviews.find((review)=> review.id === args.id)
        },

        game(_, args){
            return db.games.find((game)=> game.id === args.id)
        },

        author(_, args){
            return db.authors.find((author)=> author.id === args.id)
        }
    }, 
    Game: {
        review(parent){
            return db.reviews.filter((review) => parent.id === review.game_id)
        }
    },
    Author: {
        review(parent){
            return db.reviews.filter((review) => parent.id === review.author_id)
        }
    },
    Review: {
        game(parent){
            return db.games.find((game)=> parent.game_id === game.id)
        },
        author(parent){
            return db.authors.find((author)=> parent.author_id === author.id)
        }
    },
    Mutation: {

        // delete resolvers
        deleteGame(_, args){
            db.games = db.games.filter((game) => game.id !== args.id)
            return db.games
        },
        deleteAuthor(_, args){
            db.authors = db.authors.filter((author) => author.id !== args.id)
            return db.authors
        },
        deleteReview(_, args){
            db.reviews = db.reviews.filter((review) => review.id !== args.id)
            return db.reviews
        },



        // add resolvers
        addGame(_, args){
            const game = {
                ...args.newGame,
                id: Math.floor(Math.random()*10000).toString()
            }
            db.games.push(game)
            return game
        },

        addAuthor(_, args){
            const newAuthor={
                ...args.newAuthor, 
                id: Math.floor(Math.random()*10000).toString()
            }
            db.authors.push(newAuthor)
            return newAuthor
        },

        addReview(_, args){
            const newReview = {
                ...args.newReview, 
                id: Math.floor(Math.random()*10000).toString()
            }
            db.reviews.push(newReview)
            return newReview
        },


        // update resolvers
        updateGame(_, args) {
            db.games = db.games.map((game)=>{
                if(game.id === args.id){
                    return {...game, ...args.updatedGame} 
                }
                return game
            })

            return db.games.find((game)=> game.id === args.id)
        },

        updateAuthor(_, args){
            db.authors = db.authors.map((author) => {
                if(author.id === args.id){
                    return {...author, ...args.updatedAuthor}
                }

                return author
            })

            return db.authors.find((author) => author.id === args.id)
        },

        updateReview(_, args) {
            db.reviews = db.reviews.map((review) => {
                if(review.id === args.id) {
                    return {...review, ...args.updatedReview}
                }
                return review
            })

            return db.reviews.find((review) => review.id === args.id)
        }
    }
}

const server = new ApolloServer({
    
    typeDefs, // typeDefs -- definitions of types of data
    resolvers // resolver
})

const {url} = await startStandaloneServer(server, {
    listen: {port: 4001}
})


console.log("Server ready at port: ", 4001)