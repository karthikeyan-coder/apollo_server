import { gql } from "apollo-server-express";

export const typeDefs = gql`
type Query {
    getBooks : [Book!]!
}

type Book {
    Title: String,
    Author: String
}

input BookInput {
    Title: String,
    Author: String
}

type Mutation {
    createBook(input: BookInput!): Book
}
`
