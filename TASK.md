# Practical Interview Task: Building a Blogging Platform

## Task Description

You are tasked with building a blogging platform using MongoDB as the database and Node.js as the backend framework. The platform should allow users to create blog posts, view existing posts, and perform basic CRUD operations on blog posts.

## Requirements

- Implement a MongoDB schema for a blog post with the following fields:
  - Title (string)
  - Content (string)
  - Author (string)
  - CreatedAt (date)
- Create a RESTful API using Node.js and Express.js to perform the following operations:
  - Create a new blog post
  - Retrieve a single blog post by its ID
  - Retrieve all blog posts
  - Update an existing blog post
  - Delete a blog post
- Implement server-side validation for the blog post data, ensuring that the title and content fields are required.
- Add pagination support to the API endpoint that retrieves all blog posts, allowing users to specify the page number and the number of posts per page.
- Implement search functionality that allows users to search for blog posts by title or content. The search should be case-insensitive and return matching blog posts.
- Implement sorting options for the blog posts, allowing users to sort the posts by either the creation date or the title.
- Write unit tests using a testing framework of your choice (e.g., Mocha, Jest) to ensure the correctness of your API endpoints and the validation logic.
- Documentation
  - Document API endpoints using tools like Swagger or Postman.
  - Provide a README file explaining how to set up and run the project.

## Bonus

Implement user authentication and authorization mechanisms using JSON Web Tokens (JWT) or any other authentication method of your choice. Allow only authenticated users to create, update, or delete blog posts.

Secure endpoints using middleware that checks for valid JWTs.

## Evaluation Criteria:

- Code Quality: Clean, readable, and well-organized code.
- Functionality: All requirements should be correctly implemented.
- Error Handling: Proper handling and reporting of errors.
- Security: Implementation of secure authentication and authorization practices.
- Testing: Comprehensive and passing tests.
- Documentation: Clear and detailed API documentation.

Deliverables:

- The source code of your Node.js application using GitHub
- Instructions on how to set up and run your application locally.
- Any additional documentation or notes you think would be helpful to understand your implementation.

Deadline: 2nd February 2024
