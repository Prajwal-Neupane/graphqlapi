import { getModelForClass, pre, prop } from "@typegoose/typegoose";
import { IsEmail, MaxLength, MinLength } from "class-validator";
import { Field, InputType, ObjectType } from "type-graphql";
import bcrypt from "bcrypt";

// Mongoose pre-hook to hash the password before saving
@pre<User>("save", async function () {
  if (this.isModified("password")) {
    return;
  }
  const salt = await bcrypt.genSalt(10);
  const hash = bcrypt.hashSync(this.password, salt);
  this.password = hash;
})
@ObjectType()
export class User {
  @Field(() => String)
  _id: string;

  @Field(() => String)
  @prop({ required: true })
  name: string;

  @Field(() => String)
  @prop({ required: true })
  email: string;

  @prop({ required: true })
  password: string;
}

// Create a Mongoose model for the User class
export const UserModel = getModelForClass(User);

@InputType()
export class CreateUserInput {
  @Field(() => String)
  name: string;

  @IsEmail()
  @Field(() => String)
  email: string;

  @MinLength(8, {
    message: "Password must be at least 8 characters",
  })
  @MaxLength(20, {
    message: "Password must be at most 20 characters",
  })
  @Field(() => String)
  password: string;
}
