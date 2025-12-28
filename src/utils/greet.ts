import GreetUser from "../class/user.js";
import type { User } from "../types/userType.js";

export const makeGreetings = (users: User[]): void => {
  users.forEach((user) => {
    const greeter = new GreetUser(user.name, user.age, user.email);
    console.log(
      `${greeter.getGreeting()}, Your actual info: ${greeter.getUserInfo()}`
    );
  });
};

export default makeGreetings;
