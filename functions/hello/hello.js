const { ApolloServer, gql } = require("apollo-server-lambda");
const faunadb = require("faunadb");
const q = faunadb.query;
require('dotenv').config()


var client = new faunadb.Client({
  secret: process.env.FAUNADB_ADMIN_SECRET,
});

const typeDefs = gql`
  type Query {
    read: [Crud!]
  }
  type Crud {
    id: ID!
    todo: String!
  }
  type Mutation {
    addCrud(todo: String!): Crud
    removeCrud(id: ID!): Crud
    updateCrud(id: ID!, todo: String!): Crud
  }
`;
  
const resolvers = {
  Query: {
    read: async (root, args, context) => {
      try {
        var result = await client.query(
          q.Map(
            q.Paginate(q.Documents(q.Collection("crud"))),
            q.Lambda((x) => q.Get(x))
          )
        );
        return result.data.map((d) => {
          return {
            id: d.ref.id,
            todo: d.data.todo,
          };
        });
      } catch (error) {
        
      }
    },
  },

  Mutation: {
    addCrud: async (_, args) => {
      try {
        const result = await client.query(
          q.Create(q.Collection("crud"), {
            data: args,
          })
        );
        return result.data;
      } catch (error) {
        
      }
    },
    removeCrud: async (_, args) => {
      try {
        var result = await client.query(
          q.Delete(q.Ref(q.Collection("crud"), args.id))
        );
        console.log("Document Deleted : ", result.ref.id);
        return result.ref.data;
      } catch (error) {
      }
    },
    updateCrud: async (_, args) => {
      try {
        var result = await client.query(
          q.Update(q.Ref(q.Collection("crud"), args.id), {
            data: {
              todo: args.todo,
            },
          })
        );
        
        return result.ref.data;
      } catch (error) {
        
      }
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

exports.handler = server.createHandler();
