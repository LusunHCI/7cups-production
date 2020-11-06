FROM rasa/rasa:latest-full 

WORKDIR /app
COPY . /app
COPY ./data /app/data

# RUN pip3 install rasa[spacy]
# RUN python3 -m spacy download en_core_web_md
# RUN python3 -m spacy link en_core_web_md en.
RUN  rasa train

VOLUME /app
VOLUME /app/data
VOLUME /app/models

CMD [ "run","-m","/app/models","--enable-api","--cors","*","--debug" ]