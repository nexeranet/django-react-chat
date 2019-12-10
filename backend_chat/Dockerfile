FROM python:3.7 as build

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

ENV DEBIAN_FRONTEND=noninteractive

ENV PYROOT /pyroot
ENV PYTHONUSERBASE $PYROOT
# install our dependencies
# we use --system flag because we don't need an extra virtualenv
#
RUN mkdir /install
WORKDIR /install

COPY Pipfile Pipfile.lock /install/
RUN pip install --upgrade pip
RUN pip install pipenv && pipenv install  --deploy


FROM build AS app

ARG DJANGO_WORKDIR=/app

RUN mkdir -p /app

WORKDIR /app

ADD . /app

#RUN python manage.py collectstatic --noinput
# expose the port 8000
EXPOSE 8000

# define the default command to run when starting the container
#CMD ["gunicorn", "--chdir", "chat_react", "--bind", ":8000","--reload", "chat_react.wsgi:application"]
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
#CMD ["pip", "freeze"]

