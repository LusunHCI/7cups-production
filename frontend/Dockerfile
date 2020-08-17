# FROM ubuntu:16.04

FROM python:3.8

RUN pip install --upgrade pip && \
    pip install pipenv 

# RUN apt-get update -y && \ 
#     apt-get install -y python-pip python-dev

# We copy just the requirements.txt first to leverage Docker cache

COPY ./requirements.txt /app/frontend/requirements.txt

WORKDIR /app/frontend

RUN pip install -r requirements.txt
RUN pip install --upgrade pip && \
    pip install pipenv 
RUN pip install requests
RUN pip install Datetime
RUN pip install mysql
RUN pip install mysql-connector-python

COPY . /app/frontend

ENTRYPOINT [ "python" ]

CMD [ "login.py" ]


# FROM python:3.8

# WORKDIR /app/frontend
# COPY . /app/frontend

# RUN pip install --upgrade pip && \
#     pip install pipenv 
# RUN pip install requests
# RUN pip install Datetime
# RUN pip install mysql
# RUN pip install mysql-connector-python
# RUN pip install -r requirements.txt

# VOLUME /app/frontend

# EXPOSE 5000
# ENV FLASK_APP "login.py"

# CMD flask run
# CMD ["flask", "run", "--host=127.0.0.1"]

# COPY login.py /app/frontend/login.py

# CMD ["python","run.py"]
# ENTRYPOINT FLASK_APP=login.py flask run

# FROM ubuntu:18.04

# RUN apt-get update && apt-get -y install curl gnupg && curl -sL https://deb.nodesource.com/setup_13.x  | bash - && apt-get -y install nodejs

# WORKDIR /app/frontend
# COPY . /app/frontend

# RUN npm install 

# VOLUME /app/frontend

# CMD npm start
