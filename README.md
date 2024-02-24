# Cash Register Transaction Handler

This program handles transactions as a cash register would. Given a purchase price, a cash deposit, and the current state of the register, I can handle transactions and report the next state of the register. This program does make assumptions on the input, and in larger scale software, input handling may occur before a function like this would be called.   

## My Implementation

First I establish a register object that will ultimately keep track of the register state and be returned at function close. Other important pieces of information are stored such as the amount of change to return, and the current total value of the register. 

One of the easier things to get out of the way and check for, is if the present transaction will be the final one. We can do this by simply equating the total register value with the amount of change due. A situation like this would close down the register. There are two other possible outcomes which require doing more work and iterating through the current amount of cash in the drawer: Having **insufficient funds** and being unable to make *exact* change, and being **successful* and open for the next transaction. 

Before either of the situations, I sort the cash in the drawer according to value. I talk about why I do this in my other snippet ***[Roman numeral Translator]()***, explaining **Place Value**! 

In order to tackle both of these problems, we first have to attempt to *make* change. I start a loop going through the bills in the drawer, and store the *value* of each bill and its *amount* in the register. I determine whether the current bill is suitable to make change by calculating the quotient of how much change is left versus the value of the current bill.If this bill is suitable to cover all or part of the change (but not more!) then I determine how much is needed and push that out to the resulting array. 

If there is no more change left to cover, then we are successful and still open (because we checked first thing if we would be empty after this transaction!)

If there is change remaining to cover (did we run out of pennies?) then we cannot make exact change, and we return with a value of **insufficient funds**.

## Want to try it out?
Here are three ways to run my program, in order of complexity:

1) Use my website! [Click here](https://www.DeveloperSean.com) to see what it's all about!

2) Use an online JavaScript compiler.
    - Copy and paste my code into [Programiz](https://www.programiz.com/javascript/online-compiler/) and give it the beans!

3) Download the project yourself and build upon it! 

---

### Option 3: Advanced Users Only
Want to take a deeper dive into the Matrix? Here's how you can get set up with customizing 
this program and see what sort of mistakes you can make (it's all apart of the process!)  

**You'll Need:**

* [**Visual Studio Code**](https://code.visualstudio.com/) (*An environment to write your own programs! It's free!*)

* [**Node.JS**](https://nodejs.org/en) (*So you can execute JavaScript code on your machine, rather than through a web browser! Also free!*)

After installing the above programs, make a new folder in any directory for this project.  

Download *main.js* into the new project folder, and open the file in VS Code.  

In VS, open the integrated terminal with Ctrl+`, or open through the 'View' tab. **Alternatively, you can open your local command line (CMD on Windows).**  
- *In EITHER terminal, be sure you are working in the directory of 'main.js'*  

Entering the following command will run the program. Huzzah!

```
node main.js
```

Thanks for reading, and good luck out there!
---
> See any issues? [Let me know!](https://www.DeveloperSean.com)