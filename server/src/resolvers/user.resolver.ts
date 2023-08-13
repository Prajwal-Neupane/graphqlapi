// Import necessary decorators, types, and services
import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { CreateUserInput, User } from "../schema/user.schema";
import UserService from "../service/user.service";

// Define the resolver class
@Resolver(User) // Specify the GraphQL type that this resolver handles
export default class UserResolver {
  private userService: UserService;

  // Constructor for dependency injection
  constructor() {
    this.userService = new UserService();
  }

  /**
   * Mutation to create a new user.
   * @param input - Input data for creating a user.
   * @returns The created user.
   */
  @Mutation(() => User)
  async createUser(@Arg("input") input: CreateUserInput): Promise<User> {
    const createdUser = await this.userService.createUser(input);
    return createdUser;
  }

  /**
   * Query to fetch the currently logged-in user.
   * @returns The logged-in user's information.
   */
  @Query(() => User)
  async me(): Promise<User> {
    // In a real application, this could fetch the user based on authentication
    // For now, returning a sample user for demonstration purposes.
    return {
      _id: "123",
      name: "test",
      email: "test@gmail.com",
      password: "test",
    };
  }
}
