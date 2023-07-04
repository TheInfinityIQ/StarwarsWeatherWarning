/* 
Context for things mentioned below:

1) It's called a pseudo-random number because people have created a way to generate random looking numbers but they're not truly random. Generally it's done by doing a bunch of math on the current time I believe

2) Promises -> this is just a way to avoid any confusion from asynchronous work (async await) and non-asynchronous work like normal return values. With the being said, there are some rules put in place so that we only access
the 'fulfilled' state of the promise like using .then(). If you're seeing a Promise<> printed to console when you're playing with it, that just means that you've access the 'pending' state because the work hasn't been done yet. 
source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise
*/

/*
Info on functions

Math.random() -> The Math.random() static method returns a floating-point (decimal), pseudo-random number that's greater than or equal to 0 and less than 1 
source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random 

Math.floor() -> The Math.floor() static method always rounds down and returns the largest integer less than or equal to a given number. Math.ceil() is the opposite and it will round up

fetch() -> The global fetch() method starts the process of fetching a resource from the network, returning a promise which is fulfilled once the response is available. Note: promises can be complicated/confusing when first learning about them
source: https://developer.mozilla.org/en-US/docs/Web/API/fetch

JSON.stringify() -> The JSON.stringify() static method converts a JavaScript value to a JSON string
source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify

then() -> 

*/

/*
Info on code

1)  
    Values multiplied against Math.random() will increase the range of numbers generated. So if we did Math.random() * 3, it would generate decimal values from 0 to 3
    Math.floor will round the result to an integer (any whole number that is even or odd) so we can use it later on. 

2)
    If the baseURL was the address of the library, 'people' would be the row where the people books are and 'personId' is the specific book. 

3)
    Async and await are key words when programming 'asynchronously'. Generally code is run from top to bottom, waiting for each line to code to run to completing before running the next. 
    Async tells the code to run it in the background so it can move onto other stuff and the 'await' keyword basically tells the computer to wait when we need the result form the 'async' code

    fetch is like a dog that will get things for you given a specific address and it is a very smart dog that can do stuff with the thing it fetches (.then) or it can determine if the thing it fetches is bad (.catch)

4)
    Base URL is like the address of the library, person from personEndPoint is like the row where the books are found, and personId is like the specific location of the book

5)
    You can use JSON.stringify to turn the JSON object into a string

6)
    Instead of telling the dog to fetch right away, we're saving the fetch command so we can use it later by returning the fetch

7)
    .then() is used on the fetch command to get the resolved state of the promise that is returned from getName(). 
    If you were to simply print getName() and not use .then(), you would print the pending state of the promise because you didn't wait for the promise to be fulfilled.

*/

const baseUrl = 'https://swapi.dev/api/'; //The 'library' we're getting 'books' from.
const maxNumPeople = 83; // API has 83 people to choose from.

let personId = Math.floor(Math.random() * maxNumPeople); // 1)

const personEndPoint = `people/${personId}`; // 2)

//Call to print a random character to console
async function getNameToConsole() {
	// 3)
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
        .then((response) => {
            return response.json();
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}
// 7
let result = getName().then((result) => console.log(result)); // Waits for the promise to be fulfilled (or rejected if something wrong happens) then does will print the result of our fetch call when was us returning 'response.json()'

console.log(getName()); // Prints Promise { <state>: "pending" } to console

getNameToConsole(); //because we didn't return the fetch command and decided to tell the code dog to fetch right await, it will print the fulfilled promise to console as a string because we used JSON.stringify