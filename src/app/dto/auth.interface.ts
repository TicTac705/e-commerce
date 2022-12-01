export interface Authorize {
  email: string,
  password: string
}

export interface AuthorizeResponse {
  accessToken: string,
  expiresIn: number,
  tokenType: string
}

export interface Register {
  name: string,
  email: string,
  password: string,
  password_confirmation: string
}

export interface RegisterFormFields {
  name: string,
  email: string,
  password: string,
  passwordConfirm: string
}

export function mapToAuthorizeResponse(response: any): AuthorizeResponse {
  return {
    accessToken: response.access_token,
    expiresIn: response.expires_in,
    tokenType: response.token_type
  }
}
