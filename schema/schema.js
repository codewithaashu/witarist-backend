import {
  GraphQLID,
  GraphQLList,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} from "graphql";
import User from "../models/User.js";

//define the graphql schema or type
const userType = new GraphQLObjectType({
  name: "User",
  fields: {
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
    role: { type: GraphQLString },
  },
});

//define the query
const query = new GraphQLObjectType({
  name: "RootQuery",
  fields: {
    //find the all user
    users: {
      type: new GraphQLList(userType),
      resolve() {
        return User.find();
      },
    },

    //find the user with id
    user: {
      type: userType,
      //it recieve an argument
      args: { id: { type: GraphQLID } },
      resolve() {
        //returns a single user by id
        return User.findById(args.id);
      },
    },
  },
});

//define the mutation
const mutation = new GraphQLObjectType({
  name: "RootMutation",
  fields: {
    addNewUser: {
      type: userType,
      args: {
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString },
        role: { type: GraphQLString },
      },
      resolve() {
        const user = new User({
          name: args.name,
          email: args.email,
          password: args.password,
          role: args.role,
        });
        return user.save();
      },
    },
    deleteUser: {
      type: userType,
      args: { id: { type: GraphQLID } },
      resolve() {
        return User.findByIdAndUpdate(this.args.id);
      },
    },
  },
});

const schema = new GraphQLSchema({ query, mutation });
export default schema;
