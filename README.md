# IoTec

Internet of things application being developed for the I-Week in collaboration
with Microsoft. The application consists of an IoT device that will detect if
a strainer is covered with thrash. This is going to be calculated with a
fluid sensor (calculate the L/Hour) and an ultrasonic sensor (calculates the height).

The IoT device has been created with Arduino, once the data is read with a real-time
stream it will deploy the data to the IoT Azure platform.

## Installing the application
    # Setup the project
    Clone the repository with the following command:
    git clone https://github.com/Rodolfoarv/IoTec.git

    # Run application
    The applcation is divided in different folders, as an initial setup node must be installed
    in our system. Run the command to see if it is, if it is not you can find
    the node.js software in the following link: https://nodejs.org/en/download/

    node -v

    Once node is installed run the following command:
    npm install

The application is divided in two folders

/waterflow: Describes the Arduino application, ti will read the sensor in the COM3 port.
Diagrams can be found in the following link:
https://docs.google.com/document/d/1zTaJCv_LHLP8VI63-R8scHCcKU2gDYiGnjLaeHEtoPM/edit









Once the app has been loaded, you can access the functions within the program.


## Authors

- Rodolfo Andrés Ramírez Valenzuela

## Blogger

This is a blog I am currently writting on articles related to the Clojure, Lisp and programming languages.
http://rodolfoarvpl.blogspot.mx/

## License

See [LICENSE] (https://github.com/Rodolfoarv/Evil-Hangman/blob/master/LICENSE)
