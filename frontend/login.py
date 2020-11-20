from flask import Flask, escape, url_for, request, render_template, redirect, request, jsonify
import requests
import json
import mysql.connector
from datetime import datetime
import re


app = Flask(__name__,static_folder='static',template_folder='static')

@app.route('/',methods=['POST','GET'])
def index():
	return render_template('chat_intro.html')

@app.route('/loginnow', methods=['POST','GET'])
def loginnow():
	return render_template('login.html')

@app.route('/login/?<string:userid>', methods=['POST','GET'])
def login(userid):
	if request.method =='POST':
		mydb = mysql.connector.connect(
    	host="db",
  		port=3306,
    	user="root",
    	password="lusun",
    	database="7cups"
		)
		mycursor = mydb.cursor()
		sql = "SELECT * from message where chatroom_id="+str(userid)+" limit 0,1;"
		print(sql)
		mycursor.execute(sql)
		one=mycursor.fetchone()
		mycursor.close()
		mydb.close()
		print(one==None)
		if one == None:
			print('none')
			return jsonify({"msg": "login successfully!"}),200
		else:
			return jsonify({"msg":"user ID already exists! Please try another one!"}),400


@app.route('/experience/?<string:userid>')
def experience(userid):
    return render_template('experience.html')

@app.route('/userMessage/', methods=['POST','GET'])
def userMessage():
	if request.method =='GET':
		print("get")
	if request.method =='POST':
		mydb = mysql.connector.connect(
    	host="db",
  		port=3306,
    	user="root",
    	password="lusun",
    	database="7cups"
		)
		mycursor = mydb.cursor()
		message_id=request.json['message_id']
		chatroom_id=int(request.json['chatroom_id'])
		message=request.json['message']
		message_type=int(request.json['message_type'])
		timestamp = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
		sender_id=int(request.json['sender_id'])
		sql = "INSERT INTO message (message_id, chatroom_id, message, message_type, timestamp, send_id) VALUES (%s, %s, %s, %s, %s, %s)"
		val=(message_id, chatroom_id, message, message_type, timestamp, sender_id)
		mycursor.execute(sql,val)
		mydb.commit()
		mycursor.close()
		mydb.close()
	return render_template('experience.html')

@app.route('/botResponse/', methods=['POST','GET'])
def botResponse():
	if request.method =='GET':
		print("get")
	if request.method =='POST':
		mydb = mysql.connector.connect(
    	host="db",
  		port=3306,
    	user="root",
    	password="lusun",
    	database="7cups"
		)
		mycursor = mydb.cursor()
		message_id=request.json['message_id']
		chatroom_id=int(request.json['chatroom_id'])
		message_type=int(request.json['message_type'])
		message=request.json['message']
		if message_type==0:
			msg=message['text']
		else :
			msg=""
			for m in message:
				msg+=str(m)
		timestamp = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
		sender_id=int(request.json['sender_id'])
		sql = "INSERT INTO message (message_id, chatroom_id, message, message_type, timestamp, send_id) VALUES (%s, %s, %s, %s, %s,%s)"
		val=(message_id, chatroom_id, msg, message_type, timestamp, sender_id)
		mycursor.execute(sql,val)
		mydb.commit()
		mycursor.close()
		mydb.close()
	return render_template('experience.html')
@app.route('/submitCodesign/', methods=['POST','GET'])
def submitCodesign():
	if request.method =='GET':
		print("get")
	if request.method =='POST':
		mydb = mysql.connector.connect(
    	host="db",
  		port=3306,
    	user="root",
    	password="lusun",
    	database="7cups"
		)
		mycursor = mydb.cursor()
		form_json = json.loads(request.data)
		userid=form_json['userid']
		print(userid)
		form_json.pop('userid')
		items = form_json.items()
		msgid=[]
		for key, value in items:
			print(str(key) + '   ' + str(value))
			value=value.replace('%20',' ')
			value=value.replace('%2C',',')
			value=value.replace("\'","_")
			if value=='':
				value=''
			mid=re.findall(r"\d",key)
			num=""
			for n in range(0,len(mid)):
				num+=mid[n]
			print(num)
			field=key.replace(num,'')
			print(field)
			if field=='intentselect':
				if value!='Add_More':
					value=value.split(":")[0]
					print(value)
			if userid+num not in msgid:
				msgid.append(userid+num)
				sql = "INSERT INTO codesign (message_id, chatroom_id ,"+field+") VALUES (%s,%s,%s)"
				val=(userid+num,userid,value)
				mycursor.execute(sql,val)
			else:
				sql = "UPDATE codesign set "+field+"='"+value+"' where message_id="+(userid+num)
				mycursor.execute(sql)
		mydb.commit()
		mycursor.close()
		mydb.close()
	return render_template('experience.html')








