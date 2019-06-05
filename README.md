# Bamazon
  
### A simple CLI for "purchasing" products from my (future dream) bike shop!

First, we are greeted by some lovely ASCII art and a list of present inventory, stored on a locally running MySQL server:  
![screenshot](/screenshots/bamazon1.JPG)  
(Items can be manually populated by editing the file `inventory.sql`)  
  
Confirming order quantity:  
![screenshot](/screenshots/bamazon2.JPG)
  
If item has inadequate stock for order, user will return to main screen:  
![screenshot](/screenshots/bamazon3.JPG)
  
Otherwise, order is confirmed:  
![screenshot](/screenshots/bamazon4.JPG)  
![screenshot](/screenshots/bamazon5.JPG)

### Installation:

##### MySQL database initialization  
In order to run this application, you should have MySQL installed on your machine with a server running. If you don't, visit the MySQL installation page to install the version you need for your operating system. 

Run the seed commands in `inventory.sql` with your favorite SQL client to populate the database, then Bamazon will be ready for use.

##### Running the app

Type the following into your terminal:  
`git clone git@github.com:dmcneary/bamazon-cli.git \n
cd bamazon-cli \n
npm install \n
node bamazon`  

This app was built as an introduction to backend concepts using node and MySQL.
