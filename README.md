{
  "info": {
    "_postman_id": "1a96c6a6-819f-480d-858a-f6d082043026",
    "name": "System_Opinions",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json",
    "_exporter_id": "52102880",
    "_collection_link": "https://go.postman.co/collection/52102880-1a96c6a6-819f-480d-858a-f6d082043026?source=collection_link"
  },
  "item": [
    {
      "name": "Auth",
      "item": [
        {
          "name": "Register",
          "request": {
            "method": "POST",
            "header": [],
            "body": {
              "mode": "raw",
              "raw": "{\r\n  \"UserName\": \"Kevin\",\r\n  \"UserSurname\": \"Velasquez\",\r\n  \"UserUsername\": \"kevinvel\",\r\n  \"UserEmail\": \"kevin@gmail.com\",\r\n  \"UserPassword\": \"password123\"\r\n}",
              "options": {
                "raw": {
                  "language": "json"
                }
              }
            },
            "url": {
              "raw": "http://localhost:3001/opinionsSystem/v1/auth/register",
              "protocol": "http",
              "host": [
                "localhost"
              ],
              "port": "3001",
              "path": [
                "opinionsSystem",
                "v1",
                "auth",
                "register"
              ]
            }
          },
          "response": []
        },
        {
          "name": "Login",
          "request": {
            "method": "POST",
            "header": [],
            "body": {
              "mode": "raw",
              "raw": "{\r\n    \"userLoggin\": \"kevin@gmail.com\",\r\n    \"password\": \"password123\"\r\n}\r\n",
              "options": {
                "raw": {
                  "language": "json"
                }
              }
            },
            "url": {
              "raw": "http://localhost:3001/opinionsSystem/v1/auth/login",
              "protocol": "http",
              "host": [
                "localhost"
              ],
              "port": "3001",
              "path": [
                "opinionsSystem",
                "v1",
                "auth",
                "login"
              ]
            }
          },
          "response": []
        }
      ]
    },
    {
      "name": "Publications",
      "item": [
        {
          "name": "CreatePublication",
          "request": {
            "method": "POST",
            "header": [],
            "body": {
              "mode": "raw",
              "raw": "{\r\n  \"PublicationTitle\": \"Mi primera opinion\",\r\n  \"PublicationCategory\": \"NOTICIAS\",\r\n  \"PublicationContent\": \"Este es el contenido de mi post.\",\r\n  \"PublicationAuthor\": \"69935462cf59477ad358ae88\"\r\n}",
              "options": {
                "raw": {
                  "language": "json"
                }
              }
            },
            "url": {
              "raw": "http://localhost:3001/opinionsSystem/v1/publications",
              "protocol": "http",
              "host": [
                "localhost"
              ],
              "port": "3001",
              "path": [
                "opinionsSystem",
                "v1",
                "publications"
              ]
            }
          },
          "response": []
        },
        {
          "name": "UpdatePublications",
          "request": {
            "method": "GET",
            "header": []
          },
          "response": []
        },
        {
          "name": "DeletePublication",
          "request": {
            "method": "DELETE",
            "header": [],
            "body": {
              "mode": "raw",
              "raw": "{ \"authorId\": \"69935462cf59477ad358ae88\" }",
              "options": {
                "raw": {
                  "language": "json"
                }
              }
            },
            "url": {
              "raw": "http://localhost:3001/opinionsSystem/v1/publications/69935533cf59477ad358ae8c",
              "protocol": "http",
              "host": [
                "localhost"
              ],
              "port": "3001",
              "path": [
                "opinionsSystem",
                "v1",
                "publications",
                "69935533cf59477ad358ae8c"
              ]
            }
          },
          "response": []
        }
      ]
    },
    {
      "name": "Users",
      "item": [
        {
          "name": "UpdateUsers",
          "request": {
            "method": "PUT",
            "header": [],
            "body": {
              "mode": "raw",
              "raw": "{\r\n  \"UserUsername\": \"kevin_nuevo\",\r\n  \"oldPassword\": \"password123\",\r\n  \"UserPassword\": \"nueva_password_456\"\r\n}",
              "options": {
                "raw": {
                  "language": "json"
                }
              }
            },
            "url": {
              "raw": "http://localhost:3001/opinionsSystem/v1/users/69935462cf59477ad358ae88",
              "protocol": "http",
              "host": [
                "localhost"
              ],
              "port": "3001",
              "path": [
                "opinionsSystem",
                "v1",
                "users",
                "69935462cf59477ad358ae88"
              ]
            }
          },
          "response": []
        },
        {
          "name": "GetAllUsers",
          "request": {
            "method": "GET",
            "header": [],
            "url": {
              "raw": "http://localhost:3001/opinionsSystem/v1/users?page=1&limit=10",
              "protocol": "http",
              "host": [
                "localhost"
              ],
              "port": "3001",
              "path": [
                "opinionsSystem",
                "v1",
                "users"
              ],
              "query": [
                {
                  "key": "page",
                  "value": "1"
                },
                {
                  "key": "limit",
                  "value": "10"
                }
              ]
            }
          },
          "response": []
        }
      ]
    },
    {
      "name": "Comments",
      "item": [
        {
          "name": "CreateComments",
          "request": {
            "method": "POST",
            "header": [],
            "body": {
              "mode": "raw",
              "raw": "{\r\n  \"CommentContent\": \"Estoy de acuerdo con tu post.\",\r\n  \"CommentAuthor\": \"69935729cf59477ad358ae96\",\r\n  \"CommentPublication\": \"6993576ccf59477ad358ae9a\"\r\n}",
              "options": {
                "raw": {
                  "language": "json"
                }
              }
            },
            "url": {
              "raw": "http://localhost:3001/opinionsSystem/v1/comments",
              "protocol": "http",
              "host": [
                "localhost"
              ],
              "port": "3001",
              "path": [
                "opinionsSystem",
                "v1",
                "comments"
              ]
            }
          },
          "response": []
        },
        {
          "name": "EditComments",
          "request": {
            "method": "GET",
            "header": []
          },
          "response": []
        },
        {
          "name": "DeleteComments",
          "request": {
            "method": "DELETE",
            "header": [],
            "body": {
              "mode": "raw",
              "raw": "{ \"authorId\": \"69935729cf59477ad358ae96\" }",
              "options": {
                "raw": {
                  "language": "json"
                }
              }
            },
            "url": {
              "raw": "http://localhost:3001/opinionsSystem/v1/comments/699357b0cf59477ad358ae9d",
              "protocol": "http",
              "host": [
                "localhost"
              ],
              "port": "3001",
              "path": [
                "opinionsSystem",
                "v1",
                "comments",
                "699357b0cf59477ad358ae9d"
              ]
            }
          },
          "response": []
        }
      ]
    }
  ]
}