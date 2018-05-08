# RES - Labo 04 UDP

## Task 1

### Question 1.1

```
How can we represent the system in an architecture diagram, which gives information both about the Docker containers, the communication protocols and the commands?
```

?

### Question 1.2

```
Who is going to send UDP datagrams and when?
```

*Musicien*. Every time they play their instrument, they should send a UDP datagrams to all the *auditors*.

### Question 1.3

```
Who is going to listen for UDP datagrams and what should happen when a datagram is received?
```

*Auditors*, they will need to keep updated their list of musiciens currently playing.

### Question 1.4

``` 
What payload should we put in the UDP datagrams?
```

- *uuid* - id of the musicien
- *instrument* - the instrument played by the musicien

### Question 1.5

```
What data structures do we need in the UDP sender and receiver? When will we update these data structures? When will we query these data structures?
```

?

## Task 2

### Question 2.1 

```
In a JavaScript program, if we have an object, how can we serialize it in JSON?
```

```javascript
var myJSON = JSON.stringify(obj);
```

### Question 2.2

```
What is npm?
```

*Node Package Manager* is a manager of packager for node and js librairies. You can find loads of differents librairies maid by pros or fans. 
*Exemple:* react js (facebook) or widget for an Angular app

> ”npm is the package manager for the Node JavaScript platform. It puts modules in place so that
> node can find them, and manages dependency conflicts intelligently.
>
> It is extremely configurable to support a wide variety of use cases. Most commonly, it is used to publish, discover, install, and develop node programs.”

### Question 2.3

```
What is the npm install command and what is the purpose of the --save flag?
```

*npm install* will install the package specified behind on your computer. The *--save* flag will save it into your package.json of your current directory. Very usefull when your want to add a new librairy into your current project and you dont want to add it yourself into the package.json.

### Question 2.4

``` 
How can we use the https://www.npmjs.com/ web site?
```

You can use it to find libraries and the correct name you will need to put after your npm install.

### Question 2.5

```
In JavaScript, how can we generate a UUID compliant with RFC4122?
```

The easiest way is to install the package *uuid* from npm. 
https://www.npmjs.com/package/uuid

with:

```bash
npm install uuid
```

### Question 2.6

```
In Node.js, how can we execute a function on a periodic basis?
```

With *setInterval()*

#### Exemple

```javascript
var intervalID = setInterval(function(){alert("Interval reached");}, 5000);
```

### Question 2.7

```
In Node.js, how can we emit UDP datagrams?
```

```javascript
// We use a standard Node.js module to work with UDP
var dgram = require('dgram');
// Let's create a datagram socket. We will use it to send our UDP datagrams
var s = dgram.createSocket(‘udp4');
var payload = JSON.stringify(obj);
message = new Buffer(payload);
s.send(message, 0, message.length, protocol.PROTOCOL_PORT,  protocol.PROTOCOL_MULTICAST_ADDRESS,function(err, bytes) {console.log("Sending payload: "  + payload + " via port " + s.address().port);});
```

### Question 2.8

```
In Node.js, how can we access the command line arguments?
```

```js
var args = process.argv.slice(2); // if 2 arguments
```

## Task 3

### Question 3.1

```
How do we define and build our own Docker image?
```

We need to create a Dockerfile. This file shoudl containe all the configuration of our image.

### Question 3.2

``` 
How can we use the ENTRYPOINT statement in our Dockerfile?
```

To lunch the application we want to put in our container.

#### Exemple

```dockerfile
ENTRYPOINT['node','musicien.js']
```

We can pass an arguement to the container when we run it to add an argument to the entrypoint.

```bash
docker run -d res/musician piano
```

That will done in background:

```
ENTRYPOINT['node',musicien.js','piano']
```

### Question 3.3

```
After building our Docker image, how do we use it to run containers?
```

```bash
docker run -d res/musician piano
```

### Question 3.4

```
How do we get the list of all running containers?
```

```bash
docker ps
```

### Question 3.5

 ```
How do we stop/kill one running container?
 ```

```
docker killl <id>
```

The id can be get from the docker ps cmd

### Question 3.6

```
How can we check that our running containers are effectively sending UDP datagrams?
```

We can sniff the network with wireshark

## Task 4

### Question 4.1

```
With Node.js, how can we listen for UDP datagrams in a multicast group?
```

