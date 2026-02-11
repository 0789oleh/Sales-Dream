# SalesDream — Auth Service Contracts

## AuthService

### register
Input:
- email: string
- password: string

Errors:
- USER_ALREADY_EXISTS

Returns:
- id
- email
- isActive

---

### login
Input:
- email
- password

Errors:
- INVALID_CREDENTIALS
- USER_INACTIVE

Returns:
- accessToken
- tokenType
- expiresIn

---

### me
Auth: Bearer JWT

Errors:
- USER_NOT_FOUND
- USER_INACTIVE

Returns:
- id
- email
- isActive
