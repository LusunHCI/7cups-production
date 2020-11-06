CREATE DATABASE 7cups;
use 7cups;

CREATE TABLE message (
  message_id varchar(45) NOT NULL,
  chatroom_id varchar(100) DEFAULT NULL,
  send_id int DEFAULT NULL,
  message varchar(1000) DEFAULT NULL,
  message_type int DEFAULT NULL,
  timestamp varchar(45) DEFAULT NULL
);

CREATE TABLE codesign (
  message_id varchar(45) NOT NULL,
  yesno varchar(45) DEFAULT NULL,
  intentselect varchar(100) DEFAULT NULL,
  currentintent varchar(100) DEFAULT NULL,
  actionselect varchar(1000) DEFAULT NULL,
  other varchar(1000) DEFAULT NULL,
  chatroom_id varchar(100) DEFAULT NULL,
  newIntent varchar(100) DEFAULT NULL,
  newExplaination varchar(1000) DEFAULT NULL
);