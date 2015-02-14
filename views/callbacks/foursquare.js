// 1. ->
// https://foursquare.com/oauth2/authenticate
// ?client_id=YOUR_CLIENT_ID
// &response_type=code
// &redirect_uri=YOUR_REGISTERED_REDIRECT_URI
//
// 2. <-
// https://YOUR_REGISTERED_REDIRECT_URI/?code=CODE
//
// 3. ->
// https://foursquare.com/oauth2/access_token
// ?client_id=YOUR_CLIENT_ID
// &client_secret=YOUR_CLIENT_SECRET
// &grant_type=authorization_code
// &redirect_uri=YOUR_REGISTERED_REDIRECT_URI
// &code=CODE
//
// 4. <-
// { access_token: ACCESS_TOKEN }
