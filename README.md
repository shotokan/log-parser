
### >Instructions: 

#### Using node

It's necessary to have node installed (v12.9.0).

>> Passsing Arguments

Passing arguments:
- input -> indicates our log file name
- output -> indicates how our csv will be named

*We need to store our files into logs directory which is in the project.
*The CSV will be generated into csv directory which is in the project.

```bash
# We need to be in the root directory of the project.

> node index --input gobankingrates.com.access.log --output logs.csv
```

>> Environment Variables

We can create our environment variables or use .env file.

Add these variables into .env:

- LOG_FILE -> here we pass log file name
- CSV_FILE -> here we pass the name that our file will have
 

Example:

- LOG_FILE=gobankingrates.com.access.log

- CSV_FILE=logs.csv

Then run this command:

```bash
# We need to be in the root directory of the project.

> node .

# also
> node index
```

#### UNIT TESTS

To run our tests:
```bash
# We need to be in the root directory of the project.

> npm run test

```

#### Using Docker

It is necessary to have docker installed.


>> Building image

Before running the program it's necessary to build the image from our Dockerfile


```bash
# We need to be in the root directory of the project.

> docker build -t log-parser .
```

>>Running container

Before running our container we need to create two directories, in our machine, which will be linked to the containers through volumes:

- logs directory (/logs) where we will be able to put our logs
- csv directory (/csv) where our program will store the csv generated

After We have created them we need to know the full path of each one. This is important
because we need to pass the two paths to link our directories with the container.

for example:

/Users/isabido/Documents/csv

/Users/isabido/Documents/logs


>>>>Running our container

We are going to run our container in an interactive mode.
We need to pass two environment variables to the run docker command:
- LOG_FILE -> here we pass log file name
- CSV_FILE -> here we pass csv name to be generated

Also we need to create 2 volumes, to do this we need to pass -v and our *host paths
for logs and csv and also container paths:

*container paths* always will be:
- /usr/src/app/csv
- /usr/src/app/logs

so we will have something like this in our run command:

-v /Users/isabido/Documents/csv:/usr/src/app/csv

*In linux or Mac we can use pwd to get the full path of a directory.

Example:

```bash
> docker run -i --rm -v /Users/isabido/Documents/csv:/usr/src/app/csv -v /Users/isabido/Documents/logs:/usr/src/app/logs -e LOG_FILE=gobankingrates.com.access.log -e CSV_FILE=test-docker.csv log-parser
```

After running the last docker command a new csv will be generated into /usr/src/app/csv (test.csv in this cse) and thus it will be in our host csv directory.



*IMPORTANT!!!*

Arguments are not validated and only some unit tests were added.