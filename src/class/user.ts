class GreetUser {
  private name: string;
  private age?: number;
  private email?: string;

  constructor(name: string, age?: number, email?: string) {
    this.name = name;

    if (age !== undefined) {
      this.age = age;
    }

    if (email !== undefined) {
      this.email = email;
    }
  }

  public getGreeting(): string {
    return `Hello, ${this.name}!`;
  }

  public getUserInfo(): string {
    return `Name: ${this.name}, Age: ${this.age}, Email: ${this.email}`;
  }
}

export default GreetUser;
