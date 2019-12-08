FROM python:3.7

ARG NODE_VERSION=node
ENV NODE_VERSION ${NODE_VERSION}

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

ENV DEBIAN_FRONTEND=noninteractive

ARG DJANGO_WORKDIR=/app

RUN mkdir -p /app

WORKDIR /app

ADD . /app
# install our dependencies
# we use --system flag because we don't need an extra virtualenv

RUN pip install pipenv && pipenv install --system

#RUN python manage.py collectstatic --noinput
# expose the port 8000
EXPOSE 8000

# define the default command to run when starting the container
#CMD ["gunicorn", "--chdir", "chat_react", "--bind", ":8000","--reload", "chat_react.wsgi:application"]
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]

