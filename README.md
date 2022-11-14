# project

<strong>Try it out: </strong>[Webapp](https://project.ricofinkbeiner.de/)


## About this project

This project is part of the [CHECK24 GenDev Holiday Challenge](https://github.com/check24-scholarships/holiday-challenge). You can search for trips to Mallorca from around 70 million real offers provided by CHECK24.

I created a web application using the React framework (/client) and an Express.js backend that serves as a RESTful API (/api), the data is stored in a MySQL database.

Dockerization and github actions enables continues deployment, triggered by a push to the main branch.


## Using this repository (Linux)

First,clone this project and move into the project folder.

### 1. Set up the MySQL Database
This Project requires a MySQL database. 
1. To test this project locally on your computer, you need to download and configure a MySQL server ([Tutorial](https://www.digitalocean.com/community/tutorials/how-to-install-mysql-on-ubuntu-20-04)).
2. To get a first overview about how the application works, you can use the sample data from the [CHECK24 GenDev Holiday Challenge](https://github.com/check24-scholarships/holiday-challenge) README.md file and add more data later. This sample data is also stored in two .csv files in this repository, <em>hotels_sample_data.csv</em> and <em>offers_sample_data.csv</em>. To change the date format, run <pre>python3 api/changeDateFormat.py offers_samle_data.csv offers_samle_data_out.csv</pre>
3. Now rename them to offers.csv and hotels.csv and move the files to <em>/var/lib/mysql-files/</em> (requiered by for the next step, alternatively adapt the <em>api/database_setup.sql</em> file).<pre>
mv offers_samle_data_out.csv /var/lib/mysql-files/offers.csv
mv hotels_sample_data.csv /var/lib/mysql-files/hotels.csv
</pre>
4. To create the database and load the data, run 
    <pre>mysql -h <em>hostname</em> -u <em>user</em> -p< ./api/database_setup.sql</pre>

### 2. Build and run the application
1. Update the <em>api/database.js</em> file with your MySQL username.
2. Run  <pre>
    export DB_PASSWORD= <em>YOUR_PASSWORD</em>
    </pre>
    to set the required environment variable. 
3.  To build and run the docker images:
    <pre>
    docker build ./api -p 8000:8000 --file ./api/Dockerfile --build-arg db_password=<em>YOUR_PASSWORD</em> --tag api
    docker build ./client -p 3000:3000--file ./client/Dockerfile --tag client
    docker run api
    docker run client
    </pre>
    You can view the application on localhost:3000 :)
    
## Contact

Feel free to [contact me](https://www.ricofinkbeiner.de/contact).
    









