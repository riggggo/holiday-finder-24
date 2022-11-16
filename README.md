# project

<strong>Try it out: </strong>[Webapp](https://project.ricofinkbeiner.de/)


## About this project

This project is part of the [CHECK24 GenDev Holiday Challenge](https://github.com/check24-scholarships/holiday-challenge). You can search for trips to Mallorca from around 72 million real offers provided by CHECK24.

I created a responsive web application using the React framework (/client) and an Express.js backend that serves as a RESTful API (/api), the data is stored in a MySQL database.

Dockerization and github actions enables continues deployment, triggered by a push to the main branch.


## Using this repository (Linux)

First,clone this project and move into the project folder.

### 1. Set up the MySQL Database
This Project requires a MySQL database. 
1. To test this project locally on your computer, you need to download and configure a MySQL server ([Tutorial](https://www.digitalocean.com/community/tutorials/how-to-install-mysql-on-ubuntu-20-04)).
2. To get a first overview about how the application works, you can use the sample data from the [CHECK24 GenDev Holiday Challenge](https://github.com/check24-scholarships/holiday-challenge) README.md file and add more data later. This sample data is also stored in two .csv files in this repository, <em>api/hotels_sample_data.csv</em> and <em>api/offers_sample_data.csv</em>. To change the date format, run <pre>python3 api/changeDateFormat.py api/offers_sample_data.csv api/offers_sample_data_out.csv</pre>
3. Now rename them to offers.csv and hotels.csv and move the files to <em>/var/lib/mysql-files/</em> (requiered by for the next step, alternatively adapt the <em>api/database_setup.sql</em> file).<pre>
mv api/offers_sample_data_out.csv /var/lib/mysql-files/offers.csv
mv api/hotels_sample_data.csv /var/lib/mysql-files/hotels.csv</pre>
4. To create the database and load the data, run 
    <pre>mysql -h <em>hostname</em> -u <em>user</em> -p< ./api/database_setup.sql</pre>

### 2. Build and run the application
1. Update the <em>api/database.js</em> file with your MySQL username.
2. Set the required environment variables: <pre>export DB_PASSWORD=<em>YOUR_DB_PASSWORD</em> 
   touch client/.env
   echo "REACT_APP_API_URL = 'http://localhost:8000'" > client/.env
   touch api/.env
   echo "MODE='DEVELOPMENT'" > api/.env</pre>
3. To build and run the docker images:
    <pre>
    docker-compose build
    docker-compose up -d</pre>
    You can use the application on localhost:3000 :)

Info: If you cannot connect to the database, make sure that the IP address of the api container has access to the mysql server, e.g. by opening the configuration file
<pre>sudo nano /etc/mysql/mysql.conf.d/mysqld.cnf</pre>
and change the bind-address to the IP address of the container or to 0.0.0.0, then any machine can connect to the MySQL server.
    
## Contact

If you have questions, the installation does not work for you or you encounter an error, feel free to [contact me](https://www.ricofinkbeiner.de/contact).
    









