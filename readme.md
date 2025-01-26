Endpoints

Users=>

1. GET: `http://localhost:3333/users` - Returns all users

2. POST `http://localhost:3333/users/register` - Creates a user

   Expects `fullName,email,password, type (admin/user)` in the JSON body

3. POST `http://localhost:3333/users/login` - Logins in user and returns bearer token

   Expects `email,password` in the JSON body

KYC =>

1. GET `http://localhost:3333/kyc/dashboard` - Returns count of all users and count grouped by kyc status

2. POST `http://localhost:3333/kyc/:kycId` - Updates the status of the KYC specified

   Expects `status` in the JSON body

3. POST `http://localhost:3333/kyc` - Creates a new KYC

   Expects a form submission with `fullName, email and kyc_file(multipart file)`

4. GET `http://localhost:3333/kyc` - Lists all KYC information (paginated and searchable)

   Supported query params = `pageNumber, pageSize, search, order`

There is no validation implemented for missing params in the body.
