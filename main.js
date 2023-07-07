/* 
Context for things mentioned below:

1) It's called a pseudo-random number because people have created a way to generate random looking numbers but they're not truly random. Generally it's done by doing a bunch of math on the current time I believe

2) Promises -> this is just a way to avoid any confusion from asynchronous work (async await) and non-asynchronous work like normal return values. With the being said, there are some rules put in place so that we only access
the 'fulfilled' state of the promise like using .then(). If you're seeing a Promise<> printed to console when you're playing with it, that just means that you've access the 'pending' state because the work hasn't been done yet. 
source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise

3) Asynchronous programming is a technique that enables your program to start a potentially long-running task and still be able to be responsive to other events while that task runs, rather than having to wait until that task has finished.
source: https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Introducing

4) shorthand functions aka arrow functions aka anonymous functions (because they don't have a name)
function() {} can be represented as either of the two options below

    (arguments) => {} ... This function will NOT implicitly (automatically assume you are returning the following code). Useful if you're wanting to do stuff with arguments (response) from the promise that is passed to the .then() function.
    ex) -> .then((data) => {
		    	console.log(JSON.stringify(data)); // 5)
		    }
    ***We're not wanting to return the console.log(); so we add the curly braces

    (arguments) => value ... This function will implicitly return a value. Useful if you're wanting to return a simple one line value with less code
    ex) -> .then((response) => response.json())
    *** implicitly returns response.json() without the 'return' keyword
*/

/*
Info on functions

Math.random() -> The Math.random() static method returns a floating-point (decimal), pseudo-random number that's greater than or equal to 0 and less than 1 
source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random 

Math.floor() -> The Math.floor() static method always rounds down and returns the largest integer less than or equal to a given number. Math.ceil() is the opposite and it will round up

fetch() -> The global fetch() method starts the process of fetching a resource from the network, returning a promise which is fulfilled once the response is available. 
Note: promises can be complicated/confusing when first learning about them but the await prefixing the fetch is stopping the execution of following code until the fetch that the promise returns is resolved.
It is resolved once there is a response from the contacted network. It's holding the promise until it is resolved in a way
source: https://developer.mozilla.org/en-US/docs/Web/API/fetch

JSON.stringify() -> The JSON.stringify() static method converts a JavaScript value to a JSON string
source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify

then(onFulfilled, onRejected) -> this will be the handler of the information from the fulfilled/rejected state. (response) => response.json(). Functions can be arguments too! Which is why it look really funky below. with .then(...function code)
source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/then

*/

/*
Info on code

1)  
    Values multiplied against Math.random() will increase the range of numbers generated. So if we did Math.random() * 3, it would generate decimal values from 0 to 3
    Math.floor will round the result to an integer (any whole number that is even or odd) so we can use it later on. 

2)
    If the baseURL was the address of the library, 'people' would be the row where the people books are and 'personId' is the specific book. 

3)
    async function is used to enable asynchronous behaviour. It's like a light switch when entering a room (room being the function)

3.5)
    await will pause the execution of the asnyc function it is inside until the promise's state changes from pending to resolved or rejected (check source to see promise states above).

4)
    Base URL is like the address of the library, person from personEndPoint is like the row where the books are found, and personId is like the specific location of the book. 
    The row name and id of the book combined is the endpoint we're access for more information.

5)
    You can use JSON.stringify to turn the JSON object into a string

6)
    Instead of telling the dog to fetch right away, we're saving the fetch command so we can use it later by returning the fetch

7)
    Because we're returning the promise
*/

const baseUrl = 'https://swapi.dev/api/'; //The 'library' we're getting 'books' from.
const maxNumPeople = 83; // API has 83 people to choose from.

let personId = Math.floor(Math.random() * maxNumPeople); // 1)

const personEndPoint = `people/${personId}`; // 2)

const badResult = fetch(baseUrl + personEndPoint /* 4) */, {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
    },
})
    .then((response) => response.json())
    .then((data) => {
        console.log(JSON.stringify(data)); // 5)
    })
    .catch((error) => {
        console.error('Error:', error);
    });
	
// Call to print a random character to console
async function getNameToConsole() {
	// 3)
	// 3.5)
	await fetch(baseUrl + personEndPoint /* 4) */, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
		},
	})
		.then((response) => response.json())
		.then((data) => {
			console.log(JSON.stringify(data)); // 5)
		})
		.catch((error) => {
			console.error('Error:', error);
		});
}

//Call to get data to use
async function getName() {
	// 6)
	return await fetch(baseUrl + personEndPoint, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
		},
	})
		.then((response) => response.json()) // implicitly return response.json(). It can also be written as (response) => {return response.json()}
		.catch((error) => {
			console.error('Error:', error);
		});
}
// 7
let result = getName().then((result) => console.log(result)); // Works with promises to crack open the coconut and get access to the fulfilled value

console.log(getName()); // Prints Promise { <state>: "pending" } to console but still has the the value inside of the promise showing that the response was received. 
console.log(badResult); // Prints Promise { <state>: "pending" } to console but doesn't have a value inside of it meaning no response was received by the time the value was assigned and printed

getNameToConsole(); //because we didn't return the fetch command and decided to tell the code dog to fetch right await, it will print the fulfilled promise to console as a string because we used JSON.stringify

document.getElementById("template-one-peoplex-one").innerHTML = "";
